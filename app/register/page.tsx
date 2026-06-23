"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [role, setRole] = useState("RH");
  const [fullName, setFullName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const tunisianPhoneRegex = /^(\+216)?[2459]\d{7}$/;

const isPhoneValid = tunisianPhoneRegex.test(
  phone.replace(/\s/g, "")
);

  const [acceptConditions, setAcceptConditions] = useState(false);
const [acceptPrivacy, setAcceptPrivacy] = useState(false);
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const departments: Record<string, string[]> = {
  "Engineering (Bureau d'Études)": [
    "Process Engineering",
    "Mechanical Engineering",
    "Piping Engineering",
    "Civil & Structural Engineering",
    "Electrical Engineering",
    "Instrumentation & Control (E&I)",
    "HSE Engineering",
    "Document Control",
  ],
  "Project Management": [
    "Gestion de projets EPC",
    "Planning",
    "Cost Control",
    "Reporting",
    "Coordination client",
  ],
  "Procurement (Achats)": [
    "Achat matériel",
    "Sourcing fournisseurs",
    "Expediting",
    "Logistique",
    "Transport international",
    "Gestion des contrats fournisseurs",
  ],
  "Construction": [
    "Supervision chantier",
    "Civil Works",
    "Mechanical Works",
    "Electrical Works",
    "Commissioning support",
  ],
  "Commissioning & Start-up": [
    "Précommissioning",
    "Commissioning",
    "Démarrage des installations",
    "Tests de performance",
  ],
  "Operations & Maintenance": [
    "Maintenance préventive",
    "Maintenance corrective",
    "Exploitation des installations",
  ],
  QHSE: [
    "Quality Assurance",
    "Quality Control (QA/QC)",
    "Health & Safety",
    "Environment",
  ],
  "Business Development & Commercial": [
    "Développement commercial",
    "Appels d'offres",
    "Estimation des coûts",
    "Relations clients",
  ],
  "Finance & Administration": [
    "Comptabilité",
    "Contrôle de gestion",
    "Trésorerie",
    "Administration",
  ],
  "Ressources Humaines": [
    "Recrutement",
    "Formation",
    "Gestion du personnel",
    "Paie",
  ],
  "IT / Systèmes d'information": [
    "Support informatique",
    "Réseaux",
    "Cybersécurité",
    "ERP et logiciels métiers",
  ],
};

const [department, setDepartment] = useState("");
const [poste, setPoste] = useState("");
const isFormValid =
  fullName.trim() !== "" &&
  email.trim() !== "" &&
  isPhoneValid &&
  department !== "" &&
  poste !== "" &&
  password !== "" &&
  confirmPassword !== "" &&
  password === confirmPassword &&
  acceptConditions &&
  acceptPrivacy;
  return (
    <main className="min-h-screen bg-[#f6f7f9] flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-[390px]">
        <div className="flex items-center gap-2 mb-6">
          <div className="text-[#0b234a]">▦</div>
          <h1 className="font-bold text-[#0b234a]">EPPM RH</h1>
        </div>

        <div className="bg-white rounded-md shadow-md border border-gray-200 px-6 py-7">
          <h2 className="text-2xl font-bold text-[#0b234a]">Créer un compte</h2>
          <p className="text-xs text-gray-500 mt-1">
            Remplissez les informations ci-dessous pour demander l’accès à la plateforme Bilan Social.
          </p>

          <Section title="Informations personnelles" />

         <Input
  label="Nom complet"
  placeholder="Ex: Anis Dupont"
  value={fullName}
  onChange={(e) => setFullName(e.target.value)}
/>

<Input
  label="Email professionnel"
  placeholder="anis.dupont@entreprise.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<Input
  label="Téléphone"
  placeholder="+216 00 000 000"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
/>

{phone !== "" && !isPhoneValid && (
  <p className="text-red-500 text-xs mt-1">
    Numéro tunisien invalide.
  </p>
)}

          <Section title="Informations du compte" />

<Input
  label="Mot de passe"
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
       <Input
  label="Confirmer le mot de passe"
  type="password"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
/>
{confirmPassword && password !== confirmPassword && (
  <p className="text-red-500 text-xs mt-1">
    Les mots de passe ne correspondent pas.
  </p>
)}
          <Section title="Rôle demandé" />

          <div className="grid grid-cols-2 gap-3 mt-3">
            {["Admin", "RH", "Direction", "Lecture seule"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`h-16 rounded-md border text-xs font-semibold ${
                  role === r
                    ? "border-[#0b234a] bg-[#eef3ff] text-[#0b234a]"
                    : "border-gray-200 bg-white text-gray-600"
                }`}
              >
                <div className="text-lg mb-1">▧</div>
                {r}
              </button>
            ))}
          </div>

          <Section title="Informations professionnelles" />
<div className="mt-3">
  <label className="text-xs font-semibold text-gray-700">
    Département / Service
  </label>

  <select
    value={department}
    onChange={(e) => {
      setDepartment(e.target.value);
      setPoste("");
    }}
    className="mt-1 w-full h-10 border border-gray-300 rounded px-3 text-sm outline-none focus:border-[#0b234a] bg-white"
  >
    <option value="">Choisir un département</option>
    {Object.keys(departments).map((dep) => (
      <option key={dep} value={dep}>
        {dep}
      </option>
    ))}
  </select>
</div>

<div className="mt-3">
  <label className="text-xs font-semibold text-gray-700">
    Poste occupé
  </label>

  <select
    value={poste}
    onChange={(e) => setPoste(e.target.value)}
    disabled={!department}
    className="mt-1 w-full h-10 border border-gray-300 rounded px-3 text-sm outline-none focus:border-[#0b234a] bg-white disabled:bg-gray-100"
  >
    <option value="">
      {department ? "Choisir un poste" : "Choisir d'abord un département"}
    </option>

    {department &&
      departments[department].map((p) => (
        <option key={p} value={p}>
          {p}
        </option>
      ))}
  </select>
</div>

          <div className="mt-5 space-y-3 text-xs text-gray-600">
           <label className="flex gap-2">
  <input
    type="checkbox"
    checked={acceptConditions}
    onChange={(e) => setAcceptConditions(e.target.checked)}
  />
  <span>
    J’accepte les conditions d’utilisation
  </span>
</label>

<label className="flex gap-2">
  <input
    type="checkbox"
    checked={acceptPrivacy}
    onChange={(e) => setAcceptPrivacy(e.target.checked)}
  />
  <span>
    J’accepte la politique de confidentialité
  </span>
</label>
          </div>
<button
  disabled={!isFormValid}
  className={`w-full rounded mt-6 py-3 text-sm font-bold text-white ${
    isFormValid
      ? "bg-[#0b234a]"
      : "bg-gray-400 cursor-not-allowed"
  }`}
>
  Créer un compte →
</button>
          <a
            href="/"
            className="block text-center w-full border border-gray-200 rounded mt-3 py-3 text-sm font-semibold text-[#0b234a]"
          >
            Retour à la connexion
          </a>

          <p className="text-center text-xs text-gray-500 mt-5">
            Vous avez déjà un compte ?{" "}
            <a href="/" className="text-[#0b234a] font-semibold">
              Se connecter
            </a>
          </p>
        </div>

        <footer className="text-center mt-8 text-[10px] text-gray-400">
          <p className="font-bold text-[#0b234a]">EPPM RH</p>
          <p>Expertise · Performance · Travail d’équipe</p>
          <p>© 2026 EPPM RH. Tous droits réservés.</p>
        </footer>
      </div>
    </main>
  );
}

function Section({ title }: { title: string }) {
  return (
    <h3 className="text-sm font-bold text-[#0b234a] mt-6 border-l-4 border-[#0b234a] pl-2">
      {title}
    </h3>
  );
}

function Input({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="mt-3">
      <label className="text-xs font-semibold text-gray-700">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="mt-1 w-full h-10 border border-gray-300 rounded px-3 text-sm outline-none focus:border-[#0b234a]"
      />
    </div>
  );
}