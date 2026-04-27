"use client";

import Link from "next/link";
import { useState } from "react";

type FormData = {
  brandName: string;
  country: string;
  socialOrSite: string;
  categories: string[];
  priceRange: string;
  catalogSize: string;
  production: string;
  shipping: string;
  contactName: string;
  contactEmail: string;
  contactWhatsapp: string;
};

const initialData: FormData = {
  brandName: "",
  country: "",
  socialOrSite: "",
  categories: [],
  priceRange: "",
  catalogSize: "",
  production: "",
  shipping: "",
  contactName: "",
  contactEmail: "",
  contactWhatsapp: "",
};

const STEPS = ["Marca", "Productos", "Operación", "Contacto"];
const COUNTRIES = [
  "México",
  "Colombia",
  "Argentina",
  "Chile",
  "Perú",
  "Brasil",
  "Ecuador",
  "Uruguay",
  "Costa Rica",
  "República Dominicana",
  "Otro",
];
const CATEGORIES = [
  "Mujer",
  "Hombre",
  "Accesorios",
  "Calzado",
  "Niños",
  "Joyería",
  "Belleza",
  "Hogar",
];
const CATALOG_SIZES = ["1–10", "11–50", "51–200", "Más de 200"];

export default function MarcasPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleCategory = (cat: string) => {
    setData((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }));
  };

  const canAdvance = () => {
    if (step === 0) return data.brandName.trim() && data.country;
    if (step === 1) return data.categories.length > 0 && data.catalogSize;
    if (step === 2) return data.production && data.shipping;
    if (step === 3)
      return data.contactName.trim() && data.contactEmail.trim();
    return false;
  };

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const mailtoLink = () => {
    const body = `Hola Merca,

Me interesa subir mi marca a la plataforma. Aquí van mis datos:

Marca: ${data.brandName}
País: ${data.country}
Instagram / sitio: ${data.socialOrSite || "—"}

Categorías: ${data.categories.join(", ")}
Tamaño del catálogo: ${data.catalogSize}
Rango de precios: ${data.priceRange || "—"}

Producción: ${data.production}
Envíos: ${data.shipping}

Contacto:
${data.contactName}
${data.contactEmail}${data.contactWhatsapp ? "\nWhatsApp: " + data.contactWhatsapp : ""}
`;
    return `mailto:hola@merca.lat?subject=${encodeURIComponent(
      "Quiero vender en Merca: " + data.brandName,
    )}&body=${encodeURIComponent(body)}`;
  };

  if (submitted) {
    const firstName = data.contactName.trim().split(" ")[0];
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-xl flex flex-col items-center gap-6 py-24">
          <div className="text-6xl">🎉</div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Gracias, {firstName}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md">
            Recibimos tu solicitud para subir{" "}
            <span className="font-medium text-zinc-950 dark:text-zinc-50">
              {data.brandName}
            </span>{" "}
            a Merca. Te contactamos en menos de 48 horas.
          </p>
          <a
            href={mailtoLink()}
            className="h-12 px-8 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 flex items-center justify-center font-medium hover:opacity-90 transition"
          >
            Enviar por correo ahora
          </a>
          <Link
            href="/"
            className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center px-6 py-12">
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            ← merca
          </Link>
          <span className="text-xs uppercase tracking-widest text-zinc-500">
            Paso {step + 1} de {STEPS.length}
          </span>
        </div>

        <div className="flex gap-2 mb-12">
          {STEPS.map((label, i) => (
            <div
              key={label}
              className={`flex-1 h-1 rounded-full transition ${
                i <= step
                  ? "bg-zinc-950 dark:bg-white"
                  : "bg-zinc-200 dark:bg-zinc-800"
              }`}
            />
          ))}
        </div>

        {step === 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold tracking-tight">
              Cuéntanos de tu marca
            </h2>

            <Field label="¿Cómo se llama tu marca?">
              <input
                type="text"
                value={data.brandName}
                onChange={(e) => update("brandName", e.target.value)}
                placeholder="Ej: Madre Tierra"
                className={inputCls}
              />
            </Field>

            <Field label="¿Desde qué país operas?">
              <select
                value={data.country}
                onChange={(e) => update("country", e.target.value)}
                className={inputCls}
              >
                <option value="">Selecciona…</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Instagram o sitio web (opcional)">
              <input
                type="text"
                value={data.socialOrSite}
                onChange={(e) => update("socialOrSite", e.target.value)}
                placeholder="@madretierra o madretierra.com"
                className={inputCls}
              />
            </Field>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold tracking-tight">
              Sobre tus productos
            </h2>

            <Field label="¿Qué categorías vendes? (puedes elegir varias)">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => {
                  const selected = data.categories.includes(cat);
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm border transition ${
                        selected
                          ? "bg-zinc-950 text-white border-zinc-950 dark:bg-white dark:text-zinc-950 dark:border-white"
                          : "border-zinc-300 dark:border-zinc-700 hover:border-zinc-500"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </Field>

            <Field label="¿Cuántos productos diferentes tienes en catálogo?">
              <div className="grid grid-cols-2 gap-2">
                {CATALOG_SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => update("catalogSize", size)}
                    className={`px-4 py-3 rounded-lg text-sm border transition ${
                      data.catalogSize === size
                        ? "bg-zinc-950 text-white border-zinc-950 dark:bg-white dark:text-zinc-950 dark:border-white"
                        : "border-zinc-300 dark:border-zinc-700 hover:border-zinc-500"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Rango de precios típico (opcional)">
              <input
                type="text"
                value={data.priceRange}
                onChange={(e) => update("priceRange", e.target.value)}
                placeholder="Ej: USD 20–80"
                className={inputCls}
              />
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold tracking-tight">
              Producción y envíos
            </h2>

            <Field label="¿Cómo es tu producción?">
              <RadioGroup
                value={data.production}
                onChange={(v) => update("production", v)}
                options={[
                  "Producción propia",
                  "Producción tercerizada",
                  "Mixto",
                  "Reventa / curaduría",
                ]}
              />
            </Field>

            <Field label="¿Manejas envíos a otros países de LATAM?">
              <RadioGroup
                value={data.shipping}
                onChange={(v) => update("shipping", v)}
                options={[
                  "Sí, ya envío a otros países",
                  "No, pero me interesa",
                  "Solo nacional por ahora",
                ]}
              />
            </Field>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold tracking-tight">
              ¿Cómo te contactamos?
            </h2>

            <Field label="Tu nombre">
              <input
                type="text"
                value={data.contactName}
                onChange={(e) => update("contactName", e.target.value)}
                placeholder="Nombre y apellido"
                className={inputCls}
              />
            </Field>

            <Field label="Correo electrónico">
              <input
                type="email"
                value={data.contactEmail}
                onChange={(e) => update("contactEmail", e.target.value)}
                placeholder="tu@marca.com"
                className={inputCls}
              />
            </Field>

            <Field label="WhatsApp (opcional)">
              <input
                type="tel"
                value={data.contactWhatsapp}
                onChange={(e) => update("contactWhatsapp", e.target.value)}
                placeholder="+52 55 1234 5678"
                className={inputCls}
              />
            </Field>
          </div>
        )}

        <div className="flex justify-between items-center mt-12">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="h-12 px-6 rounded-full text-sm font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            ← Atrás
          </button>

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={next}
              disabled={!canAdvance()}
              className="h-12 px-8 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-medium hover:opacity-90 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              disabled={!canAdvance()}
              className="h-12 px-8 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-medium hover:opacity-90 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Enviar solicitud
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full h-12 px-4 rounded-lg border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 focus:border-zinc-950 dark:focus:border-white focus:outline-none transition";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </span>
      {children}
    </div>
  );
}

function RadioGroup({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-4 py-3 rounded-lg text-sm border text-left transition ${
            value === opt
              ? "bg-zinc-950 text-white border-zinc-950 dark:bg-white dark:text-zinc-950 dark:border-white"
              : "border-zinc-300 dark:border-zinc-700 hover:border-zinc-500"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
