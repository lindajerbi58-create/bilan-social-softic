"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [role, setRole] = useState("RH");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
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

          <Input label="Nom complet" placeholder="Ex: Anis Dupont" />
          <Input label="Email professionnel" placeholder="anis.dupont@entreprise.com" />
          <Input label="Téléphone" placeholder="+216 00 000 000" />

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

          <Input label="Département / Service" placeholder="Ex: Ressources Humaines" />
          <Input label="Poste occupé" placeholder="Ex: Responsable Paie" />

          <div className="mt-5 space-y-3 text-xs text-gray-600">
            <label className="flex gap-2">
              <input type="checkbox" />
              <span>
                J’accepte les{" "}
                <a className="text-[#0b234a] underline" href="#">
                  conditions d’utilisation
                </a>
              </span>
            </label>

            <label className="flex gap-2">
              <input type="checkbox" />
              <span>
                J’accepte la{" "}
                <a className="text-[#0b234a] underline" href="#">
                  politique de confidentialité
                </a>
              </span>
            </label>
          </div>

      <button
  disabled={password !== confirmPassword}
  className={`w-full rounded mt-6 py-3 text-sm font-bold text-white ${
    password === confirmPassword
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