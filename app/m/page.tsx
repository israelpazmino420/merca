"use client";

import Link from "next/link";
import { useState } from "react";
import { products, productImage, type Product } from "../data/products";

const CATEGORIES = ["Todo", "Hombre", "Mujer", "Zapatos", "Niños", "Deporte"];
const BRANDS = [
  "Lina",
  "Cielo",
  "Móra",
  "Coral",
  "Selva",
  "Aurora",
  "Solé",
  "Brisa",
  "Nido",
  "Vera",
];

function formatK(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(n);
}

function brandFor(id: number): string | null {
  if (id % 3 === 0) return null;
  return BRANDS[id % BRANDS.length];
}

export default function MercaApp() {
  const [activeTab, setActiveTab] = useState("Hombre");
  const [cartCount, setCartCount] = useState(9);
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // First product on left, promo card on right, then rest
  const promoProduct = products[1];
  const restProducts = products.slice(2);

  return (
    <div className="min-h-screen bg-zinc-200 flex justify-center font-sans">
      <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col shadow-xl relative">
        {/* iOS-style status bar with brand centered */}
        <div className="h-7 bg-white flex items-center justify-between px-5 text-[13px]">
          <span className="font-semibold text-zinc-950 tabular-nums">10:22</span>
          <Link href="/" className="text-base font-black tracking-tight text-zinc-950">
            merca
          </Link>
          <div className="flex items-center gap-1.5 text-zinc-950">
            <SignalIcon />
            <WifiIcon />
            <BatteryIcon />
          </div>
        </div>

        {/* Header — single row */}
        <header className="sticky top-0 z-30 bg-white">
          <div className="px-3 py-2 flex items-center gap-2">
            <button
              aria-label="Mensajes"
              className="h-10 w-7 flex items-center justify-center text-zinc-900 flex-shrink-0"
            >
              <MessageIcon />
            </button>
            <button
              aria-label="Calendario"
              className="h-10 w-7 flex items-center justify-center text-zinc-900 relative flex-shrink-0"
            >
              <CalendarIcon />
              <span className="absolute top-1.5 -right-0.5 h-2 w-2 rounded-full bg-rose-600 ring-2 ring-white" />
            </button>

            {/* Search bar — outlined with black search button */}
            <div className="flex-1 h-10 border border-zinc-950 rounded-md flex items-center overflow-hidden bg-white">
              <span className="flex-1 text-sm pl-3 text-zinc-800 truncate">
                Tops 🔥
              </span>
              <button
                aria-label="Buscar con cámara"
                className="px-1.5 text-zinc-700"
              >
                <CameraIcon size={20} />
              </button>
              <button
                aria-label="Buscar"
                className="h-10 w-10 bg-zinc-950 text-white flex items-center justify-center"
              >
                <SearchIcon size={18} />
              </button>
            </div>

            <button
              aria-label="Favoritos"
              className="h-10 w-7 flex items-center justify-center text-zinc-900 flex-shrink-0"
            >
              <HeartIcon size={24} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-end">
            <div className="flex-1 flex overflow-x-auto scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-3.5 py-2.5 text-base whitespace-nowrap relative transition ${
                    activeTab === cat
                      ? "font-bold text-zinc-950"
                      : "text-zinc-400"
                  }`}
                >
                  {cat}
                  {activeTab === cat && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-9 bg-zinc-950 rounded-full" />
                  )}
                </button>
              ))}
            </div>
            <button
              aria-label="Más categorías"
              className="px-3 py-2.5 text-zinc-700 flex-shrink-0"
            >
              <MenuIcon />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 pb-20 bg-zinc-50">
          <div className="grid grid-cols-2 gap-1.5 p-1.5">
            <ProductCard
              product={products[0]}
              onWishlist={toggleWishlist}
              isWishlisted={wishlist.has(products[0].id)}
            />
            <PromoCard product={promoProduct} />
            {restProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onWishlist={toggleWishlist}
                isWishlisted={wishlist.has(p.id)}
              />
            ))}
          </div>
        </div>

        {/* Bottom tab bar */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] z-20 bg-white border-t border-zinc-100 pb-[env(safe-area-inset-bottom)]">
          <div className="grid grid-cols-5 h-16">
            <TabBarItem icon={<HomeFilledIcon />} label="Comprar" active />
            <TabBarItem icon={<CategoryIcon />} label="Categoría" />
            <TabBarItem icon={<TrendsIcon />} label="Trends" />
            <TabBarItem
              icon={<CartIcon />}
              label="Cesta"
              badge={cartCount}
              onClick={() => setCartCount((c) => Math.max(0, c - 1))}
            />
            <TabBarItem icon={<UserIcon />} label="Yo" />
          </div>
        </nav>
      </div>
    </div>
  );
}

function ProductCard({
  product,
  isWishlisted,
  onWishlist,
}: {
  product: Product;
  isWishlisted: boolean;
  onWishlist: (id: number) => void;
}) {
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;
  const brand = brandFor(product.id);
  const fullName = brand ? `${brand} ${product.name}` : product.name;

  return (
    <Link href={`/m/p/${product.id}`} className="bg-white block">
      <div className="relative aspect-[4/5] bg-zinc-100 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={productImage(product.id)}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onWishlist(product.id);
          }}
          aria-label="Agregar a favoritos"
          className="absolute top-1.5 right-1.5 h-7 w-7 rounded-full bg-white/90 backdrop-blur flex items-center justify-center"
        >
          <HeartIcon
            filled={isWishlisted}
            size={14}
            className={isWishlisted ? "text-rose-600" : "text-zinc-700"}
          />
        </button>
      </div>
      <div className="px-1.5 py-2">
        <div className="flex items-start gap-1.5">
          {discount > 0 && (
            <span className="bg-rose-100 text-rose-600 text-[11px] font-bold px-1 rounded shrink-0 leading-tight pt-px">
              -{discount}%
            </span>
          )}
          <h3 className="text-[13px] text-zinc-900 line-clamp-1 leading-snug flex-1">
            {fullName}
          </h3>
        </div>
        <div className="flex items-center gap-1 mt-1 text-[11px]">
          <Stars rating={product.rating} />
          <span className="text-zinc-500">({formatK(product.reviews)}+)</span>
        </div>
        <div className="flex items-baseline gap-1.5 mt-1.5">
          <span className="text-[15px] font-bold text-orange-600 leading-none">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-[11px] text-zinc-600">
            {formatK(product.sold)} vendidos
          </span>
        </div>
        <div className="text-[10px] text-rose-600 mt-0.5">Estimado</div>
      </div>
    </Link>
  );
}

function PromoCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/m/p/${product.id}`}
      className="bg-white relative rounded-sm border border-rose-200 overflow-hidden block"
    >
      <div className="relative aspect-[4/5] bg-zinc-900 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={productImage(product.id)}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-orange-500 text-white text-[11px] font-bold py-1 px-2 flex items-center gap-1">
          <ArrowDownIcon size={12} />
          <span>5% OFF desde que lo viste</span>
        </div>
      </div>
      <div className="px-2 py-2 bg-gradient-to-b from-rose-50 to-rose-100">
        <p className="text-[13px] font-medium text-zinc-950 leading-snug">
          ¡Tus artículos de interés ahora son más baratos!{" "}
          <span className="font-bold">›</span>
        </p>
        <div className="flex items-baseline gap-1 mt-1.5">
          <span className="text-[15px] font-bold text-orange-600 leading-none">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-[11px] text-rose-600">Estimado</span>
        </div>
      </div>
    </Link>
  );
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className="flex items-center text-zinc-900">
      {[0, 1, 2, 3, 4].map((i) => {
        if (i < full) return <span key={i}>★</span>;
        if (i === full && half) return <span key={i}>⯨</span>;
        return <span key={i} className="text-zinc-300">★</span>;
      })}
    </span>
  );
}

function TabBarItem({
  icon,
  label,
  active = false,
  badge,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-0.5 transition ${
        active ? "text-zinc-950" : "text-zinc-500"
      }`}
    >
      <div className="relative">
        {icon}
        {badge !== undefined && badge > 0 && (
          <span className="absolute -top-1.5 -right-2.5 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
            {badge}
          </span>
        )}
      </div>
      <span className="text-[11px] font-medium">{label}</span>
    </button>
  );
}

/* --- Status bar icons --- */

function SignalIcon() {
  return (
    <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor">
      <rect x="0" y="7" width="3" height="4" rx="0.5" />
      <rect x="4.3" y="5" width="3" height="6" rx="0.5" />
      <rect x="8.6" y="3" width="3" height="8" rx="0.5" />
      <rect x="12.9" y="0" width="3" height="11" rx="0.5" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
      <path d="M7.5 0C4.6 0 1.9 1 0 2.6l1.4 1.7C2.9 3 5.1 2.2 7.5 2.2s4.6.8 6.1 2.1L15 2.6C13.1 1 10.4 0 7.5 0Zm0 4.4c-1.9 0-3.6.7-4.9 1.7l1.5 1.7c.9-.7 2.1-1.2 3.4-1.2s2.5.5 3.4 1.2l1.5-1.7c-1.3-1-3-1.7-4.9-1.7Zm0 4.4c-.9 0-1.6.3-2.2.9L7.5 11l2.2-1.3c-.6-.6-1.3-.9-2.2-.9Z" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="25" height="11" viewBox="0 0 25 11" fill="none">
      <rect x="0.5" y="0.5" width="21" height="10" rx="2.5" stroke="currentColor" strokeOpacity="0.4" />
      <rect x="2" y="2" width="11" height="7" rx="1" fill="currentColor" />
      <rect x="22.5" y="3.5" width="2" height="4" rx="1" fill="currentColor" fillOpacity="0.4" />
    </svg>
  );
}

/* --- App icons --- */

function MessageIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16v12H7l-3 3z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="1.5" />
      <line x1="16" y1="3" x2="16" y2="7" />
      <line x1="8" y1="3" x2="8" y2="7" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function SearchIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function CameraIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function HeartIcon({
  filled = false,
  size = 22,
  className = "",
}: {
  filled?: boolean;
  size?: number;
  className?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function ArrowDownIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  );
}

function HomeFilledIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="m12 3 9 8h-2v9h-5v-6h-4v6H5v-9H3z" />
    </svg>
  );
}

function CategoryIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
      <line x1="8" y1="11" x2="14" y2="11" />
      <line x1="11" y1="8" x2="11" y2="14" />
    </svg>
  );
}

function TrendsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3 7 14h5l-2 7 7-11h-5z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
