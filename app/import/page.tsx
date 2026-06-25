"use client";
import Link from "next/link";
import { useState } from "react";
import * as XLSX from "xlsx";
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
export default function ImportPage() {
  const [type, setType] = useState("Employés");
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
const [previewData, setPreviewData] = useState<any[]>([]);
  const fakeErrors = {
    Employés: [
      "Ligne 42 : le champ matricule est obligatoire.",
      "Ligne 15 : matricule EMP_2023_008 déjà présent.",
    ],
    Paie: [
      "Ligne 7 : salaire négatif détecté.",
      "Ligne 18 : employé inexistant.",
    ],
    Absences: [
      "Ligne 11 : date de fin avant date de début.",
      "Ligne 20 : type d’absence non reconnu.",
    ],
  };

function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
  const file = e.target.files?.[0];
  if (!file) return;

  setFileName(file.name);

  const reader = new FileReader();

  reader.onload = (event) => {
    const data = event.target?.result;
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    if (jsonData.length === 0) {
      setErrors(["Le fichier Excel est vide."]);
      return;
    }
setPreviewData(jsonData);
setErrors([]);
  };

  reader.readAsArrayBuffer(file);
}

  return (
    <main className="min-h-screen bg-[#f7f8fb] flex">
    <aside className="w-64 bg-[#061125] text-white min-h-screen">
  <h1 className="font-bold text-lg p-6">EPPM RH</h1>

  <nav className="mt-4">
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
    <SidebarItem text="Import" href="/import" active />
    <SidebarItem text="Audit" href="/Audit" />
    <SidebarItem text="Paramètres" href="/Parametres" />
    <SidebarItem text="Aide" href="/Aide" />
  </nav>
</aside>

      <section className="flex-1">
        <header className="h-16 bg-white border-b flex justify-between items-center px-6">
          <h2 className="font-bold text-lg">☰ BILAN SOCIAL</h2>
          <div className="flex gap-3">
            <button className="border px-4 py-2 rounded text-sm">Année: 2023⌄</button>
            <button className="bg-[#061125] text-white px-4 py-2 rounded text-sm">
              Exporter PDF
            </button>
          </div>
        </header>

        <div className="max-w-5xl mx-auto p-8">
          <h1 className="text-3xl font-bold text-[#061125]">
            Import de données Excel
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Importez vos fichiers RH : employés, paie ou absences.
          </p>

          <div className="flex justify-between mt-8 text-xs text-gray-500">
            {["Choisir", "Télécharger", "Importer", "Vérifier", "Valider"].map(
              (step, index) => (
                <div key={step} className="text-center">
                  <div
                    className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center ${
                      index === 0 ? "bg-[#061125] text-white" : "bg-gray-200"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <p className="mt-2">{step}</p>
                </div>
              )
            )}
          </div>

          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="col-span-2">
              <div className="bg-white border rounded p-5">
                <h3 className="font-bold text-sm mb-4">
                  1. Type de données à importer
                </h3>

                <div className="grid grid-cols-3 gap-3">
                  {["Employés", "Paie", "Absences"].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setType(item);
                        setErrors([]);
                        setFileName("");
                      }}
                      className={`border rounded p-5 font-bold text-sm ${
                        type === item
                          ? "border-[#061125] bg-[#eef3ff]"
                          : "bg-white"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <label className="mt-6 bg-white border-2 border-dashed rounded h-56 flex flex-col items-center justify-center cursor-pointer">
                <div className="text-4xl">☁️</div>
                <p className="font-bold mt-3">
                  Glissez-déposez votre fichier Excel ici
                </p>
                <p className="text-xs text-gray-500">
                  ou cliquez pour parcourir vos fichiers (.xlsx, .xls)
                </p>

                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFile}
                  className="hidden"
                />

                {fileName && (
                  <p className="mt-4 text-sm font-bold text-[#061125]">
                    Fichier sélectionné : {fileName}
                  </p>
                )}
              </label>
            </div>

            <div>
              <div className="bg-[#0b234a] text-white rounded p-5">
                <h3 className="font-bold">Modèle de fichier</h3>
                <p className="text-xs mt-3">
                  Utilisez notre modèle standard pour éviter les erreurs
                  d’importation.
                </p>
                <button
                  onClick={() => alert(`Téléchargement modèle ${type}`)}
                  className="bg-white text-[#0b234a] w-full py-3 rounded mt-5 font-bold text-sm"
                >
                  Télécharger le modèle (.xlsx)
                </button>
              </div>

              <div className="bg-white border rounded p-5 mt-6">
                <div className="flex justify-between">
                  <h3 className="font-bold">Analyse en cours</h3>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">
                    {errors.length} Erreurs
                  </span>
                </div>

                {fileName ? (
                  <div className="mt-4 space-y-3">
                    {errors.map((err) => (
                      <div
                        key={err}
                        className="bg-red-50 border-l-4 border-red-500 p-3 text-xs text-red-700"
                      >
                        {err}
                      </div>
                    ))}

                    {errors.length === 0 && (
                      <p className="text-green-600 text-sm">
                        Fichier valide. Vous pouvez confirmer l’importation.
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mt-4">
                    Aucun fichier importé pour le moment.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="border-t mt-10 pt-5 flex justify-end gap-4">
            <button
              onClick={() => {
                setFileName("");
                setErrors([]);
              }}
              className="border px-6 py-3 rounded font-bold text-sm"
            >
              Annuler
            </button>
<button
  onClick={() => {
    localStorage.setItem("employeesData", JSON.stringify(previewData));
    alert("Importation validée avec succès !");
    window.location.href = "/dashboard";
  }}
  disabled={!fileName || errors.length > 0 || previewData.length === 0}
              className={`px-6 py-3 rounded font-bold text-sm text-white ${
                fileName && errors.length === 0
                  ? "bg-[#061125]"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Valider l’importation
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}