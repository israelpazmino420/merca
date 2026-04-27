"use client";

import Link from "next/link";
import { useState } from "react";
import { products, productImage, type Product } from "../data/products";

const CATEGORIES = ["Todo", "Hombre", "Mujer", "Zapatos", "Niños", "Deporte"];

function formatSold(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(n);
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

  return (
    <div className="min-h-screen bg-zinc-200 flex justify-center font-sans">
      {/* Mobile frame */}
      <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col shadow-xl relative">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white">
          <div className="h-12 px-3 flex items-center justify-between">
            <button
              aria-label="Mensajes"
              className="h-9 w-9 flex items-center justify-center text-zinc-900"
            >
              <MessageIcon />
            </button>
            <Link
              href="/"
              className="text-2xl font-black tracking-tight text-zinc-950"
            >
              merca
            </Link>
            <button
              aria-label="Calendario"
              className="h-9 w-9 flex items-center justify-center text-zinc-900 relative"
            >
              <CalendarIcon />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-600 ring-2 ring-white" />
            </button>
          </div>

          {/* Search bar */}
          <div className="px-3 py-1 flex items-center gap-2">
            <div className="flex-1 h-9 bg-zinc-100 rounded-full px-3 flex items-center gap-2">
              <SearchIcon size={16} className="text-zinc-500 flex-shrink-0" />
              <span className="flex-1 text-sm text-zinc-800 truncate">
                Tops 🔥
              </span>
              <button
                aria-label="Buscar con cámara"
                className="text-zinc-700 flex-shrink-0"
              >
                <CameraIcon size={18} />
              </button>
            </div>
            <button
              aria-label="Favoritos"
              className="h-9 w-9 flex items-center justify-center text-zinc-900"
            >
              <HeartIcon size={22} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-end border-b border-zinc-100">
            <div className="flex-1 flex overflow-x-auto scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-3.5 py-2.5 text-sm whitespace-nowrap relative transition ${
                    activeTab === cat
                      ? "font-bold text-zinc-950"
                      : "text-zinc-500"
                  }`}
                >
                  {cat}
                  {activeTab === cat && (
                    <span className="absolute -bottom-px left-1/2 -translate-x-1/2 h-0.5 w-6 bg-zinc-950 rounded-full" />
                  )}
                </button>
              ))}
            </div>
            <button
              aria-label="Más categorías"
              className="px-3 py-2.5 text-zinc-700"
            >
              <MenuIcon />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 pb-20">
          {/* Promo banner */}
          <div className="mx-3 mt-3 bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-100 rounded-xl p-3 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-rose-600 text-white flex items-center justify-center flex-shrink-0">
              <ArrowDownIcon />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-950 leading-snug">
                ¡Tus artículos de interés ahora son más baratos!
              </p>
              <p className="text-xs text-rose-600 font-bold mt-0.5">
                -15% extra al pagar →
              </p>
            </div>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 gap-2 p-3">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onWishlist={toggleWishlist}
                isWishlisted={wishlist.has(p.id)}
              />
            ))}
          </div>
        </div>

        {/* Bottom tab bar — fixed within frame */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] z-20 bg-white border-t border-zinc-200 pb-[env(safe-area-inset-bottom)]">
          <div className="grid grid-cols-5 h-16">
            <TabBarItem icon={<HomeIcon />} label="Comprar" active />
            <TabBarItem icon={<SearchIcon size={22} />} label="Categoría" />
            <TabBarItem icon={<BoltIcon />} label="Trends" />
            <TabBarItem
              icon={<BagIcon />}
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

  return (
    <div className="bg-white">
      <div className="relative aspect-square bg-zinc-100 overflow-hidden rounded-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={productImage(product.id)}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        {discount > 0 && (
          <span className="absolute top-1.5 left-1.5 bg-rose-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
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
            size={14}
            className={isWishlisted ? "text-rose-600" : "text-zinc-700"}
          />
        </button>
      </div>
      <div className="px-1 py-2">
        <h3 className="text-xs text-zinc-900 line-clamp-2 leading-tight min-h-[2.4em]">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mt-1.5 text-[11px] text-zinc-500">
          <span className="text-amber-500 text-xs">★</span>
          <span className="font-medium text-zinc-700">{product.rating}</span>
          <span className="text-zinc-400">·</span>
          <span>{formatSold(product.sold)}+ vendidos</span>
        </div>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-base font-bold text-orange-600">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-[10px] text-zinc-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <div className="text-[10px] text-rose-600 mt-0.5">Estimado</div>
      </div>
    </div>
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
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}

/* --- Icons (line / minimalist) --- */

function MessageIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function SearchIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function CameraIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
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
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
