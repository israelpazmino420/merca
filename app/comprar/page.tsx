import Link from "next/link";

export const metadata = {
  title: "Comprar — Merca",
  description: "Descubre y compra moda latinoamericana en Merca.",
};

export default function ComprarPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-xl flex flex-col items-center gap-6 py-24">
        <Link
          href="/"
          className="text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          ← merca
        </Link>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Pronto, todo el mercado en un solo lugar
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Estamos preparando el lanzamiento. Suscríbete y serás de los primeros
          en comprar cuando abramos.
        </p>
        <a
          href="mailto:hola@merca.lat?subject=Quiero%20comprar%20en%20Merca"
          className="h-12 px-8 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 flex items-center justify-center font-medium hover:opacity-90 transition"
        >
          Avísenme
        </a>
      </div>
    </div>
  );
}
