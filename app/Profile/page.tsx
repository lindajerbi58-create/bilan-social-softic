"use client";

import {
  LayoutDashboard,
  Users,
  User,
  BarChart3,
  Banknote,
  CalendarX,
  Gauge,
  UserPlus,
  GraduationCap,
  ShieldAlert,
  ChartNoAxesCombined,
  GitCompareArrows,
  FileText,
  FileInput,
  SearchCheck,
  Settings,
  HelpCircle,
  Menu,
  Bell,
  Eye,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Employés", icon: Users, active: true },
  { label: "Profil", icon: User },
  { label: "Effectif", icon: BarChart3 },
  { label: "Rémunération", icon: Banknote },
  { label: "Absences", icon: CalendarX },
  { label: "Rendement", icon: Gauge },
  { label: "Recrutement", icon: UserPlus },
  { label: "Formation", icon: GraduationCap },
  { label: "Accidents/HSE", icon: ShieldAlert },
  { label: "Analyse", icon: ChartNoAxesCombined },
  { label: "Comparaison", icon: GitCompareArrows },
  { label: "Rapports", icon: FileText },
  { label: "Import", icon: FileInput },
  { label: "Audit", icon: SearchCheck },
  { label: "Paramètres", icon: Settings },
  { label: "Aide", icon: HelpCircle },
];

export default function ProfilEmployePage() {
  return (
    <div className="min-h-screen bg-[#f6f5fb] flex text-[#111827]">
      <aside className="w-[210px] bg-[#020b1d] text-white min-h-screen fixed left-0 top-0">
        <div className="px-6 py-5 text-xl font-bold">
          EPPM <span className="text-gray-300">RH</span>
        </div>

        <nav className="mt-2 space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-semibold cursor-pointer transition ${
                  item.active
                    ? "bg-[#081a35] text-white border-l-4 border-[#7c5cff]"
                    : "text-gray-400 hover:bg-[#081a35] hover:text-white"
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </div>
            );
          })}
        </nav>
      </aside>

      <main className="ml-[210px] w-full">
        <header className="h-[58px] bg-white border-b border-gray-200 flex items-center justify-between px-7">
          <div className="flex items-center gap-3 font-bold text-sm">
            <Menu size={18} />
            <span>Bilan Social — Profil Employé</span>
          </div>

          <div className="flex items-center gap-4">
            <Bell size={18} />
            <button className="bg-[#06142d] text-white px-4 py-2 rounded text-xs font-bold">
              Exporter PDF
            </button>
          </div>
        </header>

        <div className="p-7">
          <div className="text-xs text-gray-500 mb-4">
            Employés <span className="mx-2">›</span>
            <span className="font-bold text-gray-800">M. Karim Ben Jaber</span>
          </div>

          <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="h-[105px] bg-[#08214a]"></div>

            <div className="px-8 pb-6 -mt-8 flex items-end justify-between">
              <div className="flex items-end gap-5">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  className="w-24 h-24 object-cover border-4 border-white shadow"
                  alt="Employé"
                />

                <div>
                  <h1 className="text-2xl font-bold mb-2">Karim Ben Jaber</h1>
                  <span className="bg-[#dbeafe] text-[#1d4ed8] px-3 py-1 rounded text-xs font-bold">
                    ACTIF
                  </span>
                  <p className="text-sm text-gray-600 mt-2">
                    Matricule: <b>EPPM-2024-084</b>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Directeur Technique
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Tunis, Siège Social
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="border px-5 py-2 rounded text-sm font-semibold">
                  Modifier
                </button>
                <button className="bg-[#06142d] text-white px-5 py-2 rounded text-sm font-semibold">
                  Actions
                </button>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-6">
              <Card title="Détails Professionnels">
                <Info label="Département" value="Ingénierie & HSE" />
                <Info label="Manager Direct" value="M. Slimane Arbi" />
                <Info label="Date d'embauche" value="12 Mars 2018" />
                <Info label="Type de contrat" value="CDI" />
                <Info label="Ancienneté" value="6 ans, 2 mois" />
              </Card>

              <div className="bg-[#08214a] text-white rounded-lg p-5 shadow-sm">
                <p className="text-xs font-bold mb-2">FORMATION 2023-2024</p>
                <h2 className="text-2xl font-black">128 Heures</h2>
                <p className="text-sm text-gray-300 mb-3">Objectif annuel : 150h</p>
                <div className="w-full bg-white/20 h-2 rounded-full">
                  <div className="bg-white h-2 rounded-full w-[85%]"></div>
                </div>
                <p className="text-xs mt-3">3 Certifications validées</p>
              </div>
            </div>

            <Card title="Performance & Rendement" className="col-span-2">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    Évaluation trimestrielle Q1 2024
                  </p>
                  <div className="mt-8 w-[220px] h-[140px] bg-gray-100 flex items-end gap-2 px-4">
                    {[40, 55, 68, 72, 95].map((h, i) => (
                      <div
                        key={i}
                        style={{ height: `${h}%` }}
                        className="w-8 bg-gray-300 last:bg-[#06142d]"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Croissance de performance mensuelle
                  </p>
                </div>

                <div className="w-[260px]">
                  <div className="text-right mb-4">
                    <div className="text-4xl font-black">4.8</div>
                    <p className="text-xs text-green-600">+0.3 vs 2023</p>
                  </div>

                  <p className="font-bold text-sm mb-2">Notes du Manager</p>
                  <div className="bg-[#f6f5fb] p-4 rounded text-xs italic text-gray-600">
                    “Karim continue d’exceller dans la gestion des projets
                    offshore complexes. Son leadership technique est un atout
                    majeur pour l’équipe.”
                  </div>

                  <div className="flex gap-2 mt-4 flex-wrap">
                    {["Leadership", "HSE Expert", "Proactif"].map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card title="Historique de Rémunération" className="col-span-2">
              <div className="flex justify-end -mt-8 mb-3">
                <Eye size={16} />
              </div>

              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500 text-xs border-b">
                    <th className="text-left py-3">MOIS</th>
                    <th className="text-right">SALAIRE DE BASE</th>
                    <th className="text-right">PRIMES / HS</th>
                    <th className="text-right">NET À PAYER</th>
                  </tr>
                </thead>
                <tbody>
                  <Row mois="Mars 2024" base="4,200 TND" prime="350 TND" net="4,550 TND" />
                  <Row mois="Février 2024" base="4,200 TND" prime="120 TND" net="4,320 TND" />
                  <Row mois="Janvier 2024" base="4,200 TND" prime="480 TND" net="4,680 TND" />
                </tbody>
              </table>

              <div className="mt-5 bg-gray-100 rounded p-4 flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500">SALAIRE ANNUEL BRUT</p>
                  <p className="font-bold">62,400 TND</p>
                </div>
                <button className="text-xs font-bold">Voir détails</button>
              </div>
            </Card>

            <Card title="Suivi des Absences">
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-gray-100 p-4 rounded text-center">
                  <p className="text-xs text-gray-500">SOLDE CONGÉS</p>
                  <p className="text-2xl font-black">18.5</p>
                  <p className="font-bold">Jours</p>
                </div>

                <div className="bg-red-50 p-4 rounded text-center">
                  <p className="text-xs text-gray-500">ABSENCES YTD</p>
                  <p className="text-2xl font-black text-red-600">4 Jours</p>
                </div>
              </div>

              <Abs label="Congés Annuels" value="12 / 30j" />
              <Abs label="Arrêt Maladie" value="2 / 15j" red />

              <p className="text-xs text-gray-500 font-bold mt-5 mb-3">
                HISTORIQUE RÉCENT
              </p>

              <p className="text-xs mb-2">
                15/05/2024 - 17/05/2024{" "}
                <b className="float-right">Congé Annuel (3j)</b>
              </p>
              <p className="text-xs">
                02/04/2024 - 02/04/2024{" "}
                <b className="float-right">Maladie (1j)</b>
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function Card({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm p-5 ${className}`}>
      <h3 className="font-black text-sm mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm py-2">
      <span className="text-gray-500">{label}</span>
      <b className="text-right">{value}</b>
    </div>
  );
}

function Row({
  mois,
  base,
  prime,
  net,
}: {
  mois: string;
  base: string;
  prime: string;
  net: string;
}) {
  return (
    <tr className="border-b">
      <td className="py-4 font-bold">{mois}</td>
      <td className="text-right">{base}</td>
      <td className="text-right">{prime}</td>
      <td className="text-right font-black">{net}</td>
    </tr>
  );
}

function Abs({
  label,
  value,
  red = false,
}: {
  label: string;
  value: string;
  red?: boolean;
}) {
  return (
    <div className="flex justify-between items-center text-sm py-3 border-b">
      <span className={red ? "text-red-600 font-bold" : "font-bold"}>
        {label}
      </span>
      <span>{value}</span>
    </div>
  );
}