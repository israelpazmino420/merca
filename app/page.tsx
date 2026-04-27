"use client";

import Link from "next/link";
import { useState } from "react";
import { products, productImage, type Product } from "./data/products";

const CATEGORIES = [
  "Tendencias",
  "Vestidos",
  "Tops",
  "Jeans",
  "Pantalones",
  "Faldas",
  "Conjuntos",
  "Exterior",
  "Lencería",
  "Pijamas",
  "Calzado",
  "Accesorios",
  "Ofertas",
];

function formatSold(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(n);
}

export default function Home() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [toast, setToast] = useState<string | null>(null);

  const addToCart = (productName: string) => {
    setCartCount((c) => c + 1);
    setToast(`Agregado: ${productName}`);
    setTimeout(() => setToast(null), 2000);
  };

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const trending = products.slice(0, 17);
  const bestSellers = [...products]
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 17);
  const newArrivals = products.slice(33, 50);

  return (
    <div className="flex flex-col flex-1 bg-zinc-50 text-zinc-950">
      {/* Top utility bar */}
      <div className="bg-zinc-950 text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 h-7 flex items-center justify-between">
          <span>🚚 Envío gratis en compras de +$50 USD a toda LATAM</span>
          <div className="hidden sm:flex items-center gap-4">
            <Link href="/marcas" className="hover:underline">
              Vende en Merca
            </Link>
            <span className="opacity-60">|</span>
            <span>USD ▾</span>
            <span className="opacity-60">|</span>
            <span>ES ▾</span>
          </div>
        </div>
      </div>

      {/* Main header — dark */}
      <header className="bg-zinc-950 text-white sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="text-2xl font-black tracking-tight">
            merca
          </Link>

          <div className="flex-1 max-w-2xl mx-2 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Busca vestidos, jeans, tenis…"
                className="w-full h-10 pl-4 pr-12 rounded-full bg-white text-zinc-950 placeholder-zinc-500 border-2 border-transparent focus:border-rose-500 focus:outline-none text-sm"
              />
              <button
                aria-label="Buscar"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-zinc-950 text-white flex items-center justify-center"
              >
                <SearchIcon />
              </button>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-1">
            <DarkIconButton label="Cuenta">
              <UserIcon />
            </DarkIconButton>
            <DarkIconButton label="Favoritos" badge={wishlist.size || undefined}>
              <HeartIcon />
            </DarkIconButton>
            <DarkIconButton label="Carrito" badge={cartCount || undefined}>
              <CartIcon />
            </DarkIconButton>
          </div>
        </div>

        {/* Category nav */}
        <nav className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 h-10 flex items-center gap-5 overflow-x-auto scrollbar-none text-sm">
            {CATEGORIES.map((cat, i) => (
              <a
                key={cat}
                href="#"
                className={`whitespace-nowrap font-medium transition ${
                  i === 0
                    ? "text-rose-400"
                    : "text-zinc-300 hover:text-white"
                }`}
              >
                {cat}
                {cat === "Ofertas" && <span className="ml-1">🔥</span>}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* Sticky promo strip */}
      <div className="bg-rose-600 text-white text-center text-xs sm:text-sm font-medium py-2 px-4">
        🎁 COMPRA 2, LLEVA 1 GRATIS · solo hoy ·{" "}
        <span className="underline">aprovecha →</span>
      </div>

      {/* Mobile search */}
      <div className="md:hidden px-4 py-2 bg-zinc-950">
        <div className="relative">
          <input
            type="text"
            placeholder="Busca vestidos, jeans, tenis…"
            className="w-full h-9 pl-4 pr-10 rounded-full bg-white text-zinc-950 placeholder-zinc-500 text-sm focus:outline-none"
          />
          <button
            aria-label="Buscar"
            className="absolute right-1 top-1 h-7 w-7 rounded-full bg-zinc-950 text-white flex items-center justify-center"
          >
            <SearchIcon />
          </button>
        </div>
      </div>

      <main className="flex-1">
        {/* Hero — banner tile grid */}
        <section className="max-w-7xl mx-auto px-3 sm:px-4 pt-3 sm:pt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            <div className="col-span-2 md:col-span-2 row-span-2 aspect-[2/1] md:aspect-auto rounded-xl bg-gradient-to-br from-rose-500 via-pink-500 to-orange-400 text-white p-5 sm:p-8 flex flex-col justify-end relative overflow-hidden">
              <span className="text-[10px] sm:text-xs uppercase tracking-widest opacity-90">
                Solo esta semana
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black leading-none mt-1 sm:mt-2">
                MERCA<br />DAYS
              </h2>
              <p className="mt-2 sm:mt-3 text-sm sm:text-lg opacity-95">
                Hasta 70% off · envío gratis
              </p>
              <button className="mt-3 sm:mt-4 self-start bg-white text-zinc-950 font-bold px-5 sm:px-6 py-2 rounded-full hover:bg-zinc-100 text-sm">
                Comprar ahora
              </button>
              <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/15" />
              <div className="absolute top-20 right-20 h-20 w-20 rounded-full bg-white/15" />
            </div>

            <div className="rounded-xl bg-gradient-to-br from-violet-500 to-indigo-700 text-white p-3 sm:p-4 flex flex-col justify-end aspect-square md:aspect-auto">
              <span className="text-[10px] uppercase tracking-widest opacity-90">
                Nuevo
              </span>
              <h3 className="text-base sm:text-xl font-bold mt-1 leading-tight">
                Colección<br />Hombre
              </h3>
              <span className="text-[11px] sm:text-xs opacity-90 mt-1">Desde $14.99</span>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-3 sm:p-4 flex flex-col justify-end aspect-square md:aspect-auto">
              <span className="text-[10px] uppercase tracking-widest opacity-90">
                Hogar
              </span>
              <h3 className="text-base sm:text-xl font-bold mt-1 leading-tight">
                Hasta -60%
              </h3>
              <span className="text-[11px] sm:text-xs opacity-90 mt-1">+1.000 productos</span>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-amber-400 to-rose-500 text-white p-3 sm:p-4 flex flex-col justify-end aspect-square md:aspect-auto">
              <span className="text-[10px] uppercase tracking-widest opacity-90">
                Beauty
              </span>
              <h3 className="text-base sm:text-xl font-bold mt-1 leading-tight">
                Make up<br />nuevo
              </h3>
              <span className="text-[11px] sm:text-xs opacity-90 mt-1">2x1 toda la semana</span>
            </div>

            <div className="rounded-xl bg-zinc-950 text-white p-3 sm:p-4 flex flex-col justify-end aspect-square md:aspect-auto">
              <span className="text-[10px] uppercase tracking-widest text-rose-400">
                Calzado
              </span>
              <h3 className="text-base sm:text-xl font-bold mt-1 leading-tight">
                Tenis<br />desde $19
              </h3>
              <span className="text-[11px] sm:text-xs text-zinc-400 mt-1">Envío gratis</span>
            </div>
          </div>
        </section>

        {/* Quick category pills */}
        <section className="max-w-7xl mx-auto px-3 sm:px-4 py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
            {[
              { label: "Vestidos", color: "bg-rose-100 text-rose-900" },
              { label: "Jeans", color: "bg-blue-100 text-blue-900" },
              { label: "Tenis", color: "bg-zinc-200 text-zinc-900" },
              { label: "Bolsos", color: "bg-amber-100 text-amber-900" },
              { label: "Sudaderas", color: "bg-violet-100 text-violet-900" },
              { label: "Lentes", color: "bg-emerald-100 text-emerald-900" },
              { label: "Joyería", color: "bg-pink-100 text-pink-900" },
              { label: "Decoración", color: "bg-orange-100 text-orange-900" },
            ].map((c) => (
              <button
                key={c.label}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium ${c.color}`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </section>

        <ProductSection
          title="🔥 Tendencias en LATAM"
          subtitle="Lo que más se busca esta semana"
          items={trending}
          onAdd={addToCart}
          wishlist={wishlist}
          onWishlist={toggleWishlist}
        />

        {/* Brand promo strip */}
        <section className="max-w-7xl mx-auto px-3 sm:px-4 my-4">
          <div className="rounded-xl bg-zinc-950 text-white p-5 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold">
                ¿Vendes ropa? Súbete a Merca
              </h3>
              <p className="text-zinc-400 text-sm mt-1">
                Llega a millones de compradores en toda Latinoamérica.
              </p>
            </div>
            <Link
              href="/marcas"
              className="bg-white text-zinc-950 font-semibold px-5 py-2.5 rounded-full hover:bg-zinc-200 text-sm whitespace-nowrap"
            >
              Soy una marca →
            </Link>
          </div>
        </section>

        <ProductSection
          title="⭐ Más vendidos"
          subtitle="Los favoritos de la región"
          items={bestSellers}
          onAdd={addToCart}
          wishlist={wishlist}
          onWishlist={toggleWishlist}
        />

        <ProductSection
          title="✨ Recién llegados"
          subtitle="Lo nuevo en Merca"
          items={newArrivals}
          onAdd={addToCart}
          wishlist={wishlist}
          onWishlist={toggleWishlist}
        />
      </main>

      {/* Footer */}
      <footer className="bg-zinc-100 mt-10 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <div>
            <h4 className="font-bold mb-3">Ayuda</h4>
            <ul className="space-y-2 text-zinc-600">
              <li>Centro de soporte</li>
              <li>Envíos</li>
              <li>Devoluciones</li>
              <li>Métodos de pago</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Merca</h4>
            <ul className="space-y-2 text-zinc-600">
              <li>Sobre nosotros</li>
              <li>Trabaja con nosotros</li>
              <li>Prensa</li>
              <li>Sostenibilidad</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Para marcas</h4>
            <ul className="space-y-2 text-zinc-600">
              <li>
                <Link href="/marcas" className="hover:text-zinc-950">
                  Vende en Merca
                </Link>
              </li>
              <li>Programa de afiliados</li>
              <li>Centro de marcas</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Síguenos</h4>
            <ul className="space-y-2 text-zinc-600">
              <li>Instagram</li>
              <li>TikTok</li>
              <li>YouTube</li>
              <li>WhatsApp</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-200">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500 gap-2">
            <span>© {new Date().getFullYear()} Merca · Hecho en Latinoamérica</span>
            <span>Términos · Privacidad · Cookies</span>
          </div>
        </div>
      </footer>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-zinc-950 text-white px-5 py-3 rounded-full shadow-xl text-sm font-medium z-50">
          ✓ {toast}
        </div>
      )}
    </div>
  );
}

function ProductSection({
  title,
  subtitle,
  items,
  onAdd,
  wishlist,
  onWishlist,
}: {
  title: string;
  subtitle: string;
  items: Product[];
  onAdd: (name: string) => void;
  wishlist: Set<number>;
  onWishlist: (id: number) => void;
}) {
  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-4">
      <div className="flex items-end justify-between mb-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">{subtitle}</p>
        </div>
        <a
          href="#"
          className="text-xs sm:text-sm font-medium text-zinc-700 hover:text-zinc-950 hidden sm:block"
        >
          Ver todo →
        </a>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
        {items.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onAdd={onAdd}
            isWishlisted={wishlist.has(p.id)}
            onWishlist={onWishlist}
          />
        ))}
      </div>
    </section>
  );
}

function ProductCard({
  product,
  onAdd,
  isWishlisted,
  onWishlist,
}: {
  product: Product;
  onAdd: (name: string) => void;
  isWishlisted: boolean;
  onWishlist: (id: number) => void;
}) {
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <div className="group flex flex-col bg-white rounded-lg overflow-hidden">
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={productImage(product.id)}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        {product.badge && (
          <span className="absolute top-1.5 left-1.5 bg-rose-600 text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded">
            {product.badge}
          </span>
        )}
        {discount > 0 && !product.badge && (
          <span className="absolute top-1.5 left-1.5 bg-zinc-950 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
            -{discount}%
          </span>
        )}
        <button
          onClick={() => onWishlist(product.id)}
          aria-label="Agregar a favoritos"
          className="absolute top-1.5 right-1.5 h-7 w-7 rounded-full bg-white/90 backdrop-blur flex items-center justify-center"
        >
          <HeartIcon
            filled={isWishlisted}
            className={isWishlisted ? "text-rose-600" : "text-zinc-700"}
            size={14}
          />
        </button>
        <button
          onClick={() => onAdd(product.name)}
          className="absolute bottom-1.5 right-1.5 h-7 px-2.5 rounded-full bg-zinc-950 text-white text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition hover:bg-zinc-800"
        >
          + Agregar
        </button>
      </div>

      <div className="p-2">
        <h3 className="text-xs sm:text-sm text-zinc-800 line-clamp-2 leading-snug min-h-[2.4em]">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-1.5 mt-1">
          <span className="text-sm sm:text-base font-bold text-rose-600">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-[10px] sm:text-xs text-zinc-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between mt-0.5 text-[10px] sm:text-xs text-zinc-500">
          <div className="flex items-center gap-0.5">
            <span className="text-amber-500">★</span>
            <span className="font-medium text-zinc-700">{product.rating}</span>
          </div>
          <span>{formatSold(product.sold)}+ vendidos</span>
        </div>
      </div>
    </div>
  );
}

function DarkIconButton({
  children,
  badge,
  label,
}: {
  children: React.ReactNode;
  badge?: number;
  label: string;
}) {
  return (
    <button
      aria-label={label}
      className="relative h-9 w-9 rounded-full hover:bg-white/10 flex items-center justify-center text-white"
    >
      {children}
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function HeartIcon({
  filled = false,
  className = "",
  size = 20,
}: {
  filled?: boolean;
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}
