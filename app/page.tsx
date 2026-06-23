export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f6f7f9] flex flex-col items-center justify-center px-4">
      <div className="mb-7 text-center">
        <div className="flex items-center justify-center gap-2">
          <div className="bg-[#0b234a] text-white w-7 h-7 rounded flex items-center justify-center font-bold">
            ▥
          </div>
          <h1 className="text-3xl font-bold text-[#0b234a]">
            EPPM <span className="font-light">RH</span>
          </h1>
        </div>
        <p className="text-[10px] tracking-[2px] font-semibold text-gray-800 mt-1">
          HUMAN CAPITAL INTELLIGENCE
        </p>
      </div>

      <div className="bg-white w-full max-w-[370px] rounded-md shadow-md border border-gray-200 px-7 py-8">
        <h2 className="text-2xl font-bold text-center leading-tight">
          Connexion à la plateforme Bilan Social
        </h2>

        <p className="text-sm text-center italic text-gray-600 mt-3">
          Saisissez vos identifiants pour accéder au tableau de bord.
        </p>

        <div className="mt-7">
          <label className="text-xs font-bold tracking-wider text-[#0b234a]">
            RÔLE UTILISATEUR
          </label>

          <div className="grid grid-cols-2 gap-1 mt-2">
            <button className="bg-[#0b234a] text-white rounded px-3 py-2 text-xs font-bold">
              Admin
            </button>
            <button className="border border-gray-300 rounded px-3 py-2 text-xs font-semibold">
              RH
            </button>
            <button className="border border-gray-300 rounded px-3 py-2 text-xs font-semibold">
              Direction
            </button>
            <button className="border border-gray-300 rounded px-3 py-2 text-xs font-semibold">
              Lecture seule
            </button>
          </div>
        </div>

        <div className="mt-5">
          <label className="text-xs font-bold tracking-wider text-[#0b234a]">
            EMAIL PROFESSIONNEL
          </label>
          <div className="mt-2 bg-[#f0eef2] border border-gray-300 rounded h-12 flex items-center px-4 text-gray-500">
            ✉️
            <input
              className="bg-transparent outline-none ml-2 text-sm w-full"
              placeholder="nom.prenom@eppm.com"
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between">
            <label className="text-xs font-bold tracking-wider text-[#0b234a]">
              MOT DE PASSE
            </label>
            <a className="text-xs text-[#6f6fa3] font-semibold" href="#">
              Mot de passe oublié ?
            </a>
          </div>

          <div className="mt-2 bg-[#f0eef2] border border-gray-300 rounded h-12 flex items-center px-4 text-gray-500">
            🔒
            <input
              type="password"
              className="bg-transparent outline-none ml-2 text-sm w-full"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 text-sm text-gray-700">
          <input type="checkbox" className="w-4 h-4" />
          <span>Se souvenir de moi</span>
        </div>

        <button className="w-full bg-[#0b234a] text-white font-bold text-lg rounded mt-4 py-3 shadow-md">
          Se connecter
        </button>

        <div className="border-t border-gray-200 mt-7 pt-5 text-center">
          <p className="text-xs font-semibold text-gray-700">
            Besoin d'assistance ?{" "}
            <span className="text-[#6f6fa3]">Contacter le support IT</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-6 text-xs tracking-[3px] text-gray-300">
        <div className="w-10 h-px bg-gray-300" />
        INDUSTRIE & ÉNERGIE
        <div className="w-10 h-px bg-gray-300" />
      </div>
    </main>
  );
}