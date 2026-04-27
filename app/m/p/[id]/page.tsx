"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { products, productImage } from "../../../data/products";

const SIZES = ["XS", "S", "M", "L", "XL"];
const COLORS = [
  { name: "Negro", hex: "#0a0a0a" },
  { name: "Blanco", hex: "#fafafa" },
  { name: "Beige", hex: "#d2b48c" },
  { name: "Rosa", hex: "#fda4af" },
  { name: "Verde", hex: "#86efac" },
];

export default function ProductDetail() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const product = products.find((p) => p.id === Number(params.id));

  const [size, setSize] = useState("M");
  const [color, setColor] = useState(COLORS[0].name);
  const [favorited, setFavorited] = useState(false);
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-200 flex justify-center">
        <div className="w-full max-w-[420px] bg-white min-h-screen flex items-center justify-center p-6 text-center">
          <div>
            <p className="mb-4 text-zinc-600">Producto no encontrado</p>
            <Link href="/m" className="text-rose-600 underline font-medium">
              ← Volver
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <div className="min-h-screen bg-zinc-200 flex justify-center font-sans">
      <div className="w-full max-w-[420px] bg-white min-h-screen flex flex-col shadow-xl relative pb-24">
        {/* Floating header */}
        <header className="absolute top-0 left-0 right-0 z-30">
          <div className="h-12 px-3 flex items-center justify-between">
            <button
              onClick={() => router.back()}
              aria-label="Atrás"
              className="h-9 w-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-zinc-900"
            >
              <BackIcon />
            </button>
            <div className="flex items-center gap-2">
              <button
                aria-label="Compartir"
                onClick={() => showToast("Enlace copiado")}
                className="h-9 w-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-zinc-900"
              >
                <ShareIcon />
              </button>
              <button
                onClick={() => setFavorited(!favorited)}
                aria-label="Favorito"
                className="h-9 w-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center"
              >
                <HeartIcon
                  filled={favorited}
                  className={favorited ? "text-rose-600" : "text-zinc-900"}
                />
              </button>
            </div>
          </div>
        </header>

        {/* Hero image */}
        <div className="relative aspect-[4/5] bg-zinc-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={productImage(product.id)}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {discount > 0 && (
            <div className="absolute top-12 left-3 bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded">
              ↓ -{discount}% extra
            </div>
          )}
          {/* Image counter */}
          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
            1 / 1
          </div>
        </div>

        {/* Body */}
        <div className="px-4 pt-4">
          {/* Price block */}
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-3xl font-bold text-orange-600 leading-none">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-zinc-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {discount > 0 && (
              <span className="bg-rose-100 text-rose-600 text-xs font-bold px-1.5 py-0.5 rounded">
                -{discount}%
              </span>
            )}
          </div>
          <div className="text-xs text-rose-600 mt-1">
            Estimado · envío gratis con +$50 USD
          </div>

          {/* Name */}
          <h1 className="text-base text-zinc-900 mt-3 leading-snug">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-2 text-xs flex-wrap">
            <span className="text-amber-500">★★★★★</span>
            <span className="text-zinc-700 font-medium">{product.rating}</span>
            <span className="text-zinc-400">
              ({product.reviews.toLocaleString("es")} reseñas)
            </span>
            <span className="text-zinc-400">·</span>
            <span className="text-zinc-700">
              {product.sold.toLocaleString("es")}+ vendidos
            </span>
          </div>

          {/* Color picker */}
          <div className="mt-5">
            <div className="text-sm font-semibold mb-2">
              Color: <span className="text-zinc-600 font-normal">{color}</span>
            </div>
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  aria-label={c.name}
                  className={`h-10 w-10 rounded-full border-2 transition ${
                    color === c.name
                      ? "border-zinc-950"
                      : "border-zinc-200"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Size picker */}
          <div className="mt-5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold">
                Talla: <span className="text-zinc-600 font-normal">{size}</span>
              </div>
              <button className="text-xs text-zinc-500 underline">
                Guía de tallas
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`h-10 min-w-12 px-3 rounded text-sm font-medium border transition ${
                    size === s
                      ? "border-zinc-950 bg-zinc-950 text-white"
                      : "border-zinc-300 text-zinc-700"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-5">
            <div className="text-sm font-semibold mb-2">Cantidad</div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="h-10 w-10 rounded border border-zinc-300 text-xl text-zinc-700"
              >
                −
              </button>
              <span className="text-base w-10 text-center font-semibold">
                {qty}
              </span>
              <button
                onClick={() => setQty(qty + 1)}
                className="h-10 w-10 rounded border border-zinc-300 text-xl text-zinc-700"
              >
                +
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="mt-6 border-t border-zinc-100 pt-4">
            <h3 className="text-sm font-bold mb-2">Detalles del producto</h3>
            <ul className="text-sm text-zinc-700 space-y-1.5">
              <li>· Material: mezcla suave, transpirable</li>
              <li>· Corte regular, talla acorde</li>
              <li>· Lavable a máquina en agua fría</li>
              <li>· Despachado desde centros en LATAM</li>
            </ul>
          </div>

          <div className="mt-4 border-t border-zinc-100 pt-4">
            <h3 className="text-sm font-bold mb-2">Envíos y devoluciones</h3>
            <p className="text-sm text-zinc-700 leading-relaxed">
              Despacho en 24 horas. Entrega en 5–10 días hábiles a la mayoría de
              países de LATAM. Devolución gratuita en los primeros 30 días.
            </p>
          </div>

          <div className="mt-4 border-t border-zinc-100 pt-4 pb-4">
            <h3 className="text-sm font-bold mb-2">Reseñas recientes</h3>
            <div className="space-y-3">
              <Review name="María L." rating={5} text="Excelente calidad por el precio. Llegó en una semana." />
              <Review name="Sofía R." rating={4} text="Me quedó como esperaba, la talla es acorde." />
              <Review name="Camila P." rating={5} text="Súper bonito, ya compré otro color." />
            </div>
          </div>
        </div>

        {/* Sticky bottom action bar */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] z-30 bg-white border-t border-zinc-200 px-3 py-2.5 flex items-center gap-2 pb-[calc(env(safe-area-inset-bottom)+0.625rem)]">
          <button
            aria-label="Carrito"
            onClick={() => router.push("/m")}
            className="h-12 w-12 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-700 flex-shrink-0"
          >
            <CartIcon />
          </button>
          <button
            onClick={() => showToast(`Agregado al carrito · talla ${size}`)}
            className="flex-1 h-12 rounded-full bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 transition"
          >
            Agregar al carrito
          </button>
          <button
            onClick={() => showToast("Llevándote al checkout…")}
            className="flex-1 h-12 rounded-full bg-rose-600 text-white font-bold text-sm hover:bg-rose-700 transition"
          >
            Comprar ya
          </button>
        </div>

        {toast && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-zinc-950 text-white px-5 py-2.5 rounded-full shadow-xl text-sm font-medium z-40">
            ✓ {toast}
          </div>
        )}
      </div>
    </div>
  );
}

function Review({
  name,
  rating,
  text,
}: {
  name: string;
  rating: number;
  text: string;
}) {
  return (
    <div className="text-sm">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-zinc-900">{name}</span>
        <span className="text-amber-500 text-xs">{"★".repeat(rating)}</span>
      </div>
      <p className="text-zinc-600 mt-0.5 leading-snug">{text}</p>
    </div>
  );
}

function BackIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function HeartIcon({
  filled = false,
  className = "",
}: {
  filled?: boolean;
  className?: string;
}) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}
