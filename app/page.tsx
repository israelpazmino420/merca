import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <header className="w-full px-6 py-5 flex items-center justify-between max-w-6xl mx-auto">
        <span className="text-xl font-semibold tracking-tight">merca</span>
        <span className="text-xs uppercase tracking-widest text-zinc-500">
          Pronto · 🌎 LATAM
        </span>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-2xl flex flex-col items-center gap-6 py-24">
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[0.95]">
            La moda de LATAM,
            <br />
            <span className="text-zinc-500">a un click.</span>
          </h1>
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-xl">
            Merca es el marketplace que conecta marcas latinoamericanas con
            millones de compradores en la región. Sin fronteras, sin
            intermediarios.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full max-w-md">
            <Link
              href="/marcas"
              className="flex-1 h-12 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 flex items-center justify-center font-medium hover:opacity-90 transition"
            >
              Soy una marca
            </Link>
            <Link
              href="/comprar"
              className="flex-1 h-12 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 transition"
            >
              Quiero comprar
            </Link>
          </div>
        </div>
      </main>

      <footer className="w-full px-6 py-6 text-xs text-zinc-500 max-w-6xl mx-auto flex items-center justify-between">
        <span>© {new Date().getFullYear()} Merca</span>
        <span>Hecho en Latinoamérica</span>
      </footer>
    </div>
  );
}
