"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as XLSX from "xlsx";
import Link from "next/link";

type Employee = {
  matricule: string;
  nom: string;
  prenom: string;
  genre: string;
  age: string;
  departement: string;
  poste: string;
  contrat: string;
  anciennete: string;
  salaire: string;
  statut: string;
};

function cleanKey(key: string) {
  return key
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .replace(/_/g, "");
}

function normalizeEmployee(row: any): Employee {
  const result: any = {};

  Object.keys(row).forEach((key) => {
    result[cleanKey(key)] = row[key];
  });

  return {
    matricule: String(result.matricule ?? ""),
    nom: String(result.nom ?? ""),
    prenom: String(result.prenom ?? ""),
    genre: String(result.genre ?? result.sexe ?? ""),
    age: String(result.age ?? result.âge ?? ""),
    departement: String(result.departement ?? result.department ?? ""),
    poste: String(result.poste ?? result.fonction ?? result.emploi ?? ""),
    contrat: String(
      result.contrat ??
        result.typecontrat ??
        result.typedecontrat ??
        result.naturecontrat ??
        ""
    ),
    anciennete: String(
      result.anciennete ??
        result.anneesanciennete ??
        result.experience ??
        result.duree ??
        ""
    ),
    salaire: String(result.salaire ?? result.salairetnd ?? ""),
    statut: String(result.statut ?? result.status ?? ""),
  };
}

function SidebarItem({
  text,
  href,
  active,
}: {
  text: string;
  href: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`px-5 py-3 text-sm flex items-center gap-3 cursor-pointer ${
        active ? "bg-[#111c33] text-white" : "text-slate-300 hover:bg-[#111c33]"
      }`}
    >
      <span className="w-3 h-3 border border-slate-300 rounded-sm" />
      {text}
    </Link>
  );
}

function Kpi({
  title,
  value,
  note,
}: {
  title: string;
  value: string;
  note: string;
}) {
  return (
    <div className="bg-white border rounded-md p-5 shadow-sm">
      <p className="text-xs text-slate-500">{title}</p>
      <h2 className="text-3xl font-bold text-[#07152d] mt-2">{value}</h2>
      <p className="text-xs text-green-600 mt-2">{note}</p>
    </div>
  );
}

export default function EmployesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
const [showForm, setShowForm] = useState(false);

const [newEmployee, setNewEmployee] = useState<Employee>({
  matricule: "",
  nom: "",
  prenom: "",
  genre: "",
  age: "",
  departement: "",
  poste: "",
  contrat: "",
  anciennete: "",
  salaire: "",
  statut: "Actif",
});
  useEffect(() => {
    const storedData = localStorage.getItem("employeesData");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const normalizedData = parsedData.map((row: any) => normalizeEmployee(row));
      setEmployees(normalizedData);
    }
  }, []);
const addEmployee = () => {
  if (!newEmployee.matricule || !newEmployee.nom || !newEmployee.prenom) {
    alert("Matricule, nom et prénom sont obligatoires");
    return;
  }

  const updatedEmployees = [...employees, newEmployee];

  setEmployees(updatedEmployees);
  localStorage.setItem("employeesData", JSON.stringify(updatedEmployees));

  setNewEmployee({
    matricule: "",
    nom: "",
    prenom: "",
    genre: "",
    age: "",
    departement: "",
    poste: "",
    contrat: "",
    anciennete: "",
    salaire: "",
    statut: "Actif",
  });

  setShowForm(false);
};
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      const rows = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
      const normalized = rows.map((row: any) => normalizeEmployee(row));

      setEmployees(normalized);
      localStorage.setItem("employeesData", JSON.stringify(normalized));
    };

    reader.readAsArrayBuffer(file);
  };

  const exportExcel = () => {
    if (employees.length === 0) {
      alert("Aucune donnée à exporter");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(employees);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Employes");
    XLSX.writeFile(workbook, "employes_export.xlsx");
  };

  const effectifTotal = employees.length;

  const femmes = employees.filter((e) => {
    const genre = e.genre.toLowerCase().trim();
    return genre === "femme" || genre === "f" || genre === "female";
  }).length;

  const tauxFemmes =
    effectifTotal > 0 ? ((femmes / effectifTotal) * 100).toFixed(1) : "0";

  const ageMoyen = useMemo(() => {
    const ages = employees
      .map((e) => Number(e.age))
      .filter((age) => !isNaN(age) && age > 0);

    if (ages.length === 0) return "0";

    return (ages.reduce((a, b) => a + b, 0) / ages.length).toFixed(1);
  }, [employees]);

  const masseSalariale = useMemo(() => {
    const total = employees.reduce((sum, e) => {
      const salaire = Number(String(e.salaire).replace(",", "."));
      return sum + (isNaN(salaire) ? 0 : salaire);
    }, 0);

    return total.toFixed(1);
  }, [employees]);
const departments = [
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

const postes = [
  "Manager",
  "Ingénieur",
  "Technicien",
  "Chef de projet",
  "Responsable RH",
  "Comptable",
  "Acheteur",
  "Assistant",
  "Superviseur",
];

const contrats = ["CDI", "CDD", "SIVP", "Stage", "Freelance"];

const generateNextMatricule = () => {
  const numbers = employees
    .map((e) => Number(String(e.matricule).replace(/\D/g, "")))
    .filter((n) => !isNaN(n));

  const max = numbers.length > 0 ? Math.max(...numbers) : 0;
  return `EMP${String(max + 1).padStart(4, "0")}`;
};
  return (
    <div className="min-h-screen bg-[#f4f5f8] flex font-sans text-[#0b1730]">
      <aside className="w-64 bg-[#071127] text-white min-h-screen">
        <div className="h-16 flex items-center px-6 text-xl font-bold border-b border-slate-800">
          EPPM RH
        </div>

        <nav className="py-4">
          <SidebarItem text="Dashboard" href="/dashboard" />
          <SidebarItem text="Employés" href="/Employe" active />
          <SidebarItem text="Profil" href="/Profil" />
          <SidebarItem text="Effectif" href="/Effectif" />
          <SidebarItem text="Rémunération" href="/Remuneration" />
          <SidebarItem text="Absences" href="/Absences" />
          <SidebarItem text="Rendement" href="/Rendement" />
          <SidebarItem text="Recrutement" href="/Recrutement" />
          <SidebarItem text="Formation" href="/Formation" />
          <SidebarItem text="Accidents/HSE" href="/AccidentsHSE" />
          <SidebarItem text="Analyse" href="/Analyse" />
          <SidebarItem text="Comparaison" href="/Comparaison" />
          <SidebarItem text="Rapports" href="/Rapports" />
          <SidebarItem text="Import" href="/import" />
          <SidebarItem text="Audit" href="/Audit" />
          <SidebarItem text="Paramètres" href="/Parametres" />
          <SidebarItem text="Aide" href="/Aide" />
        </nav>
      </aside>

      <main className="flex-1">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8">
          <div className="flex items-center gap-3">
            <span className="text-xl">≡</span>
            <h1 className="font-semibold text-lg">Employés</h1>
          </div>

          <div className="flex gap-3">
<button
  onClick={() => {
    setNewEmployee({
      matricule: generateNextMatricule(),
      nom: "",
      prenom: "",
      genre: "F",
      age: "",
      departement: departments[0],
      poste: postes[0],
      contrat: contrats[0],
      anciennete: "",
      salaire: "",
      statut: "Actif",
    });
    setShowForm(true);
  }}
  className="bg-[#071127] text-white text-xs px-4 py-2 rounded"
>
  + Ajouter employé
</button>

            <input
              type="file"
              accept=".xlsx,.xls"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImport}
            />

          

            <button
              onClick={exportExcel}
              className="border text-xs px-4 py-2 rounded bg-white"
            >
              Exporter Excel
            </button>
          </div>
        </header>

        <section className="p-8">
        {showForm && (
  <div className="bg-white border rounded-md shadow-sm p-6 mb-6">
    <h2 className="font-bold text-lg mb-4">Ajouter un employé</h2>

    <div className="grid grid-cols-4 gap-4">
      <div>
        <label className="text-xs text-slate-500">Matricule</label>
        <input
          value={newEmployee.matricule}
          readOnly
          className="w-full mt-1 border rounded px-3 py-2 text-sm bg-gray-100"
        />
      </div>

      <div>
        <label className="text-xs text-slate-500">Nom</label>
        <input
          value={newEmployee.nom}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, nom: e.target.value })
          }
          className="w-full mt-1 border rounded px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-xs text-slate-500">Prénom</label>
        <input
          value={newEmployee.prenom}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, prenom: e.target.value })
          }
          className="w-full mt-1 border rounded px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-xs text-slate-500">Genre</label>
        <select
          value={newEmployee.genre}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, genre: e.target.value })
          }
          className="w-full mt-1 border rounded px-3 py-2 text-sm"
        >
          <option value="F">F</option>
          <option value="H">H</option>
        </select>
      </div>

      <div>
        <label className="text-xs text-slate-500">Âge</label>
        <input
          type="number"
          min="18"
          max="70"
          value={newEmployee.age}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, age: e.target.value })
          }
          className="w-full mt-1 border rounded px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-xs text-slate-500">Département</label>
        <select
          value={newEmployee.departement}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, departement: e.target.value })
          }
          className="w-full mt-1 border rounded px-3 py-2 text-sm"
        >
          {departments.map((dep) => (
            <option key={dep} value={dep}>
              {dep}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs text-slate-500">Poste</label>
        <select
          value={newEmployee.poste}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, poste: e.target.value })
          }
          className="w-full mt-1 border rounded px-3 py-2 text-sm"
        >
          {postes.map((poste) => (
            <option key={poste} value={poste}>
              {poste}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs text-slate-500">Contrat</label>
        <select
          value={newEmployee.contrat}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, contrat: e.target.value })
          }
          className="w-full mt-1 border rounded px-3 py-2 text-sm"
        >
          {contrats.map((contrat) => (
            <option key={contrat} value={contrat}>
              {contrat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs text-slate-500">Ancienneté</label>
        <input
          value={newEmployee.anciennete}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, anciennete: e.target.value })
          }
          placeholder="Ex: 2 ans"
          className="w-full mt-1 border rounded px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-xs text-slate-500">Salaire</label>
        <input
          type="number"
          min="0"
          value={newEmployee.salaire}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, salaire: e.target.value })
          }
          className="w-full mt-1 border rounded px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-xs text-slate-500">Statut</label>
        <select
          value={newEmployee.statut}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, statut: e.target.value })
          }
          className="w-full mt-1 border rounded px-3 py-2 text-sm"
        >
          <option value="Actif">Actif</option>
          <option value="Sorti">Sorti</option>
        </select>
      </div>
    </div>

    <div className="flex justify-end gap-3 mt-5">
      <button
        onClick={() => setShowForm(false)}
        className="border px-5 py-2 rounded text-sm"
      >
        Annuler
      </button>

      <button
        onClick={addEmployee}
        className="bg-[#071127] text-white px-5 py-2 rounded text-sm"
      >
        Enregistrer
      </button>
    </div>
  </div>
)}
          <div className="bg-white border rounded-md shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#f7f8fb] text-slate-500">
                <tr>
                  <th className="text-left p-4">Matricule</th>
                  <th className="text-left p-4">Nom</th>
                  <th className="text-left p-4">Prénom</th>
                  <th className="text-left p-4">Genre</th>
                  <th className="text-left p-4">Âge</th>
                  <th className="text-left p-4">Département</th>
                  <th className="text-left p-4">Poste</th>
                  <th className="text-left p-4">Contrat</th>
                  <th className="text-left p-4">Ancienneté</th>
                  <th className="text-left p-4">Salaire (TND)</th>
                  <th className="text-left p-4">Statut</th>
                </tr>
              </thead>

              <tbody>
                {employees.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="p-6 text-center text-slate-500">
                      Aucun employé importé.
                    </td>
                  </tr>
                ) : (
                  employees.map((e, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-4">{e.matricule}</td>
                      <td className="p-4">{e.nom}</td>
                      <td className="p-4">{e.prenom}</td>
                      <td className="p-4">{e.genre}</td>
                      <td className="p-4">{e.age}</td>
                      <td className="p-4">{e.departement}</td>
                      <td className="p-4">{e.poste}</td>
                      <td className="p-4">{e.contrat}</td>
                      <td className="p-4">{e.anciennete}</td>
                      <td className="p-4">{e.salaire}</td>
                      <td className="p-4">{e.statut}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-4 gap-5 mt-6">
            <Kpi
              title="Effectif Total"
              value={String(effectifTotal)}
              note="Calculé depuis Excel"
            />
            <Kpi
              title="Taux de Féminisation"
              value={`${tauxFemmes}%`}
              note={`${femmes} femmes`}
            />
            <Kpi
              title="Âge Moyen"
              value={`${ageMoyen} ans`}
              note="Calcul automatique"
            />
            <Kpi
              title="Masse Salariale"
              value={`${masseSalariale} TND`}
              note="Somme des salaires"
            />
          </div>
        </section>
      </main>
    </div>
  );
}