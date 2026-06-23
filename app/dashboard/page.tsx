export default function DashboardPage() {
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
            JD
          </div>
          <div>
            <p className="text-sm font-bold">Jean Dupont</p>
            <p className="text-xs text-gray-400">RH Directeur</p>
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
            <button className="border px-4 py-2 rounded text-sm">Année: 2024⌄</button>
            <button className="border px-4 py-2 rounded text-sm">Département: Tous⌄</button>
            <button className="border px-4 py-2 rounded text-sm">Site: Tous⌄</button>
            <button className="bg-[#061125] text-white px-5 py-2 rounded text-sm font-bold">
              Exporter PDF
            </button>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-4 gap-5">
            <Kpi title="EFFECTIF TOTAL" value="350" note="+12" />
            <Kpi title="H (280) / F (70)" value="20%" note="Taux de féminisation" />
            <Kpi title="MASSE SALARIALE" value="8.4M TND" note="-3.4%" red />
            <Kpi title="TAUX D’ABSENTÉISME" value="4.2%" note="+0.2%" red />
            <Kpi title="ÂGE MOYEN" value="38 ans" note="" />
            <Kpi title="TURNOVER" value="7%" note="—" />
            <Kpi title="FORMATIONS" value="45 Sessions" note="+5 vs N-1" />
            <Kpi title="HSE SCORE" value="98/100" note="✅" />
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
                        style={{ height: `${120 - (i % 4) * 5}px` }}
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
                L’augmentation de 4.2% de l’absentéisme est principalement
                localisée sur le site de Sfax dans le département Maintenance.
                Cette tendance est corrélée avec une hausse de la charge de
                travail de 15% sur le dernier trimestre.
              </p>

              <div className="mt-6">
                <div className="flex justify-between text-xs">
                  <span>Score d’engagement estimé</span>
                  <span>74%</span>
                </div>
                <div className="h-2 bg-[#31456d] rounded mt-2">
                  <div className="h-2 bg-white rounded w-[74%]" />
                </div>
              </div>

              <button className="w-full bg-white text-[#0b234a] rounded py-3 mt-7 font-bold text-sm">
                Générer rapport complet
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 mt-6">
            <div className="bg-white rounded-lg border p-6">
              <h3 className="font-bold">Pyramide des âges</h3>
              <div className="mt-8 space-y-3">
                <AgeBar label="60+" value="8" />
                <AgeBar label="55-59" value="15" />
                <AgeBar label="45-54" value="48" />
                <AgeBar label="35-44" value="92" />
              </div>
            </div>

            <div className="bg-white rounded-lg border p-6">
              <div className="flex justify-between">
                <h3 className="font-bold">Alertes RH Critiques</h3>
                <span className="text-red-500 text-xs font-bold">
                  4 Actions requises
                </span>
              </div>

              <div className="bg-red-50 border border-red-100 rounded mt-6 p-4 flex justify-between">
                <div>
                  <p className="font-bold text-sm text-red-700">
                    Visite médicale dépassée (12 employés)
                  </p>
                  <p className="text-xs text-red-400">
                    Département: Exploitation - Priorité Haute
                  </p>
                </div>
                <button className="text-xs font-bold">Traiter</button>
              </div>
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

function AgeBar({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-10 text-xs">{label}</span>
      <span className="bg-[#061125] text-white text-xs px-2 py-1 rounded">{value}</span>
      <div className="h-3 bg-[#8fa0c2] rounded w-24" />
    </div>
  );
}