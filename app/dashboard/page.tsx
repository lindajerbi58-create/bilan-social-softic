"use client";

import { useEffect, useState } from "react";

type Employee = {
  matricule?: string;
  nom?: string;
  prenom?: string;
  genre?: string;
  dateNaissance?: string;
  dateEmbauche?: string;
  department?: string;
  site?: string;
  salaire?: number | string;
  absenceJours?: number | string;
  formation?: string | boolean | number;
  statut?: string;
  accidents?: number | string;
};

export default function DashboardPage() {
  const years = ["Tous", ...Array.from({ length: 21 }, (_, i) => String(2026 - i))];

  const departments = [
    "Tous",
    "Direction Générale",
    "Engineering (Bureau d'Études)",
    "Project Management",
    "Procurement (Achats)",
    "Construction",
    "Commissioning & Start-up",
    "Operations & Maintenance",
    "QHSE",
    "Business Development & Commercial",
    "Finance & Administration",
    "Ressources Humaines",
    "IT / Systèmes d'information",
  ];

  const sites = ["Tous", "Tunis Lac 2", "Dubaï", "Iraq", "Sfax", "Gabès", "Algérie", "Libye"];

  const [year, setYear] = useState("Tous");
  const [department, setDepartment] = useState("Tous");
  const [site, setSite] = useState("Tous");
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("employeesData");
    if (storedData) {
      setEmployees(JSON.parse(storedData));
    }
  }, []);

  const filteredEmployees = employees.filter((e) => {
    const employeeYear = e.dateEmbauche ? new Date(e.dateEmbauche).getFullYear() : null;

    const matchYear = year === "Tous" || employeeYear === Number(year);
    const matchDepartment = department === "Tous" || e.department === department;
    const matchSite = site === "Tous" || e.site === site;

    return matchYear && matchDepartment && matchSite;
  });

  const effectifTotal = filteredEmployees.length;

  const femmes = filteredEmployees.filter((e) => e.genre === "F").length;
  const hommes = filteredEmployees.filter((e) => e.genre === "H").length;

  const tauxFemmes =
    effectifTotal > 0 ? Math.round((femmes / effectifTotal) * 100) : 0;

  const masseSalariale = filteredEmployees.reduce(
    (total, e) => total + Number(e.salaire || 0),
    0
  );

  const totalAbsences = filteredEmployees.reduce(
    (total, e) => total + Number(e.absenceJours || 0),
    0
  );

  const formations = filteredEmployees.filter(
    (e) => e.formation === "Oui" || e.formation === true || e.formation === 1
  ).length;

  const departs = filteredEmployees.filter((e) => e.statut === "Sorti").length;

  const turnover =
    effectifTotal > 0 ? Math.round((departs / effectifTotal) * 100) : 0;

  const totalAccidents = filteredEmployees.reduce(
    (total, e) => total + Number(e.accidents || 0),
    0
  );

  const hseScore =
    effectifTotal > 0
      ? Math.max(0, Math.round(100 - (totalAccidents / effectifTotal) * 100))
      : 0;

  function calculateAge(dateNaissance?: string) {
    if (!dateNaissance) return NaN;

    const birth = new Date(dateNaissance);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  }

  const ages = filteredEmployees
    .map((e) => calculateAge(e.dateNaissance))
    .filter((age) => !isNaN(age));

  const ageMoyen =
    ages.length > 0
      ? Math.round(ages.reduce((sum, age) => sum + age, 0) / ages.length)
      : 0;

  const ageGroups = {
    "60+": ages.filter((a) => a >= 60).length,
    "55-59": ages.filter((a) => a >= 55 && a <= 59).length,
    "45-54": ages.filter((a) => a >= 45 && a <= 54).length,
    "35-44": ages.filter((a) => a >= 35 && a <= 44).length,
    "25-34": ages.filter((a) => a >= 25 && a <= 34).length,
    "-25": ages.filter((a) => a < 25).length,
  };

  const monthlyEffectif = Array.from({ length: 12 }, (_, monthIndex) => {
    return filteredEmployees.filter((e) => {
      if (!e.dateEmbauche) return false;
      const d = new Date(e.dateEmbauche);
      return d.getMonth() <= monthIndex;
    }).length;
  });

  const maxMonthly = Math.max(...monthlyEffectif, 1);

  const absenceRate =
    effectifTotal > 0
      ? Math.round((totalAbsences / effectifTotal) * 10) / 10
      : 0;

  const topDepartment =
    filteredEmployees.length > 0
      ? Object.entries(
          filteredEmployees.reduce((acc: Record<string, number>, e) => {
            const dep = e.department || "Non défini";
            acc[dep] = (acc[dep] || 0) + Number(e.absenceJours || 0);
            return acc;
          }, {})
        ).sort((a, b) => b[1] - a[1])[0]?.[0]
      : "non défini";

  const engagementScore =
    effectifTotal > 0
      ? Math.max(
          0,
          Math.min(
            100,
            Math.round(
              100 -
                absenceRate * 5 -
                turnover * 2 -
                totalAccidents * 0.2 +
                (formations / effectifTotal) * 20
            )
          )
        )
      : 0;

  const criticalAlerts: string[] = [];

  if (absenceRate > 3) {
    criticalAlerts.push(`Absentéisme élevé : ${absenceRate} jours par employé`);
  }

  if (totalAccidents > 0) {
    criticalAlerts.push(`Accidents déclarés : ${totalAccidents}`);
  }

  if (turnover > 10) {
    criticalAlerts.push(`Turnover élevé : ${turnover}%`);
  }

  const menu = [
    "Dashboard",
    "Employés",
    "Profil",
    "Effectif",
    "Rémunération",
    "Absences",
    "Rendement",
    "Recrutement",
    "Formation",
    "Accidents/HSE",
    "Analyse",
    "Comparaison",
    "Rapports",
    "Import",
    "Audit",
    "Paramètres",
    "Aide",
  ];

  return (
    <main className="min-h-screen bg-[#f6f7fb] flex text-[#081326]">
      <aside className="w-64 bg-[#061125] text-white min-h-screen flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold p-6">EPPM RH</h1>

          <nav className="mt-4">
            {menu.map((item) => (
              <div
                key={item}
                className={`px-6 py-3 text-sm flex items-center gap-3 ${
                  item === "Dashboard"
                    ? "bg-[#0d1d3a]"
                    : "text-gray-300 hover:bg-[#0d1d3a]"
                }`}
              >
                <span>▣</span>
                {item}
              </div>
            ))}
          </nav>
        </div>

        <div className="p-6 flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-white text-[#061125] flex items-center justify-center font-bold">
            RH
          </div>
          <div>
            <p className="text-sm font-bold">Utilisateur RH</p>
            <p className="text-xs text-gray-400">Connecté</p>
          </div>
        </div>
      </aside>

      <section className="flex-1">
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <span className="text-xl">☰</span>
            <h2 className="text-xl font-bold">Bilan Social</h2>
          </div>

          <div className="flex gap-3">
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="border px-4 py-2 rounded text-sm bg-white"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  Année: {y}
                </option>
              ))}
            </select>

            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="border px-4 py-2 rounded text-sm bg-white"
            >
              {departments.map((dep) => (
                <option key={dep} value={dep}>
                  Département: {dep}
                </option>
              ))}
            </select>

            <select
              value={site}
              onChange={(e) => setSite(e.target.value)}
              className="border px-4 py-2 rounded text-sm bg-white"
            >
              {sites.map((s) => (
                <option key={s} value={s}>
                  Site: {s}
                </option>
              ))}
            </select>

            <button
              onClick={() =>
                alert(
                  `Export PDF - Année ${year}, Département ${department}, Site ${site}`
                )
              }
              className="bg-[#061125] text-white px-5 py-2 rounded text-sm font-bold"
            >
              Exporter PDF
            </button>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-4 gap-5">
            <Kpi title="EFFECTIF TOTAL" value={String(effectifTotal)} note="Données importées" />
            <Kpi title={`H (${hommes}) / F (${femmes})`} value={`${tauxFemmes}%`} note="Taux de féminisation" />
            <Kpi title="MASSE SALARIALE" value={`${masseSalariale.toLocaleString()} TND`} note="Calcul auto" />
            <Kpi title="JOURS D’ABSENCE" value={String(totalAbsences)} note="Total importé" red />
            <Kpi title="ÂGE MOYEN" value={`${ageMoyen} ans`} note="Calcul auto" />
            <Kpi title="TURNOVER" value={`${turnover}%`} note="Selon sorties" />
            <Kpi title="FORMATIONS" value={String(formations)} note="Employés formés" />
            <Kpi title="HSE SCORE" value={`${hseScore}/100`} note="Calcul auto" />
          </div>

          <div className="grid grid-cols-3 gap-5 mt-6">
            <div className="col-span-2 bg-white rounded-lg border p-6">
              <div className="flex justify-between">
                <h3 className="font-bold">Évolution de l’effectif mensuel</h3>
                <p className="text-xs">● Réel ○ Prévu</p>
              </div>

              <div className="flex items-end gap-5 h-56 mt-8">
                {["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"].map(
                  (m, i) => (
                    <div key={m} className="flex flex-col items-center gap-2 flex-1">
                      <div
                        className="w-8 bg-[#061125] rounded-t"
                        style={{
                          height: `${(monthlyEffectif[i] / maxMonthly) * 160}px`,
                        }}
                      />
                      <span className="text-xs text-gray-500">{m}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="bg-[#0b234a] text-white rounded-lg p-6">
              <h3 className="font-bold text-lg">✦ Analyse IA RH</h3>

              <p className="text-sm italic mt-5 leading-6">
                L’analyse des données importées montre un taux moyen d’absence de{" "}
                {absenceRate} jour(s) par employé. Le département le plus concerné
                est {topDepartment}. Le score HSE est estimé à {hseScore}/100 selon
                le nombre d’accidents déclarés.
              </p>

              <div className="mt-6">
                <div className="flex justify-between text-xs">
                  <span>Score d’engagement calculé automatiquement</span>
                  <span>{engagementScore}%</span>
                </div>

                <div className="h-2 bg-[#31456d] rounded mt-2">
                  <div
                    className="h-2 bg-white rounded"
                    style={{ width: `${engagementScore}%` }}
                  />
                </div>
              </div>

              <button className="w-full bg-white text-[#0b234a] rounded py-3 mt-7 font-bold text-sm">
                Générer rapport complet
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 mt-6">
            <div className="bg-white rounded-lg border p-6">
              <h3 className="font-bold mb-4">Pyramide des âges</h3>

              {Object.entries(ageGroups).map(([label, value]) => (
                <AgeBar key={label} label={label} value={value} />
              ))}
            </div>

            <div className="bg-white rounded-lg border p-6">
              <div className="flex justify-between">
                <h3 className="font-bold">Alertes RH Critiques</h3>

                <span className="text-red-500 text-xs font-bold">
                  {criticalAlerts.length} Actions requises
                </span>
              </div>

              {criticalAlerts.length > 0 ? (
                criticalAlerts.map((alert) => (
                  <div
                    key={alert}
                    className="bg-red-50 border border-red-100 rounded mt-4 p-4 flex justify-between"
                  >
                    <p className="font-bold text-sm text-red-700">{alert}</p>
                    <button className="text-xs font-bold">Traiter</button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-green-600 mt-6">
                  Aucune alerte critique détectée.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Kpi({
  title,
  value,
  note,
  red = false,
}: {
  title: string;
  value: string;
  note: string;
  red?: boolean;
}) {
  return (
    <div className="bg-white rounded-lg border p-5 h-28">
      <p className="text-xs text-gray-400 font-bold">{title}</p>
      <div className="flex items-end justify-between mt-4">
        <h3 className="text-3xl font-bold">{value}</h3>
        <span className={`text-xs font-bold ${red ? "text-red-400" : "text-green-500"}`}>
          {note}
        </span>
      </div>
    </div>
  );
}

function AgeBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="w-10 text-xs">{label}</span>
      <span className="bg-[#061125] text-white text-xs px-2 py-1 rounded min-w-8 text-center">
        {value}
      </span>
      <div
        className="h-3 bg-[#8fa0c2] rounded"
        style={{ width: `${Math.max(20, value * 4)}px` }}
      />
    </div>
  );
}