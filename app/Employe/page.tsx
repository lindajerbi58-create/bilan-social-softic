"use client";

import React, { useMemo, useRef, useState } from "react";
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
    prenom: String(result.prenom ?? result.prénom ?? ""),
    genre: String(result.genre ?? result.sexe ?? ""),
    age: String(result.age ?? ""),
    departement: String(result.departement ?? result.department ?? ""),
    poste: String(result.poste ?? result.fonction ?? ""),
    contrat: String(result.contrat ?? ""),
    anciennete: String(result.anciennete ?? ""),
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
        active
          ? "bg-[#111c33] text-white"
          : "text-slate-300 hover:bg-[#111c33]"
      }`}
    >
      <span className="w-3 h-3 border border-slate-300 rounded-sm" />
      {text}
    </Link>
  );
}
function Kpi({ title, value, note }: { title: string; value: string; note: string }) {
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

  const femmes = employees.filter(
    (e) => e.genre.toLowerCase().trim() === "femme"
  ).length;

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

  return (
    <div className="min-h-screen bg-[#f4f5f8] flex font-sans text-[#0b1730]">
      <aside className="w-64 bg-[#071127] text-white min-h-screen">
        <div className="h-16 flex items-center px-6 text-xl font-bold border-b border-slate-800">
          EPPM RH
        </div>

      <nav className="py-4">
  <SidebarItem text="Dashboard" href="/dashboard" />
  <SidebarItem text="Employés" href="/Employe" />
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
            <button className="bg-[#071127] text-white text-xs px-4 py-2 rounded">
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
              onClick={() => fileInputRef.current?.click()}
              className="border text-xs px-4 py-2 rounded bg-white"
            >
              Importer Excel
            </button>

            <button
              onClick={exportExcel}
              className="border text-xs px-4 py-2 rounded bg-white"
            >
              Exporter Excel
            </button>
          </div>
        </header>

        <section className="p-8">
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
            <Kpi title="Effectif Total" value={String(effectifTotal)} note="Calculé depuis Excel" />
            <Kpi title="Taux de Féminisation" value={`${tauxFemmes}%`} note={`${femmes} femmes`} />
            <Kpi title="Âge Moyen" value={`${ageMoyen} ans`} note="Calcul automatique" />
            <Kpi title="Masse Salariale" value={`${masseSalariale} TND`} note="Somme des salaires" />
          </div>
        </section>
      </main>
    </div>
  );
}