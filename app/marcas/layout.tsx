import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Para marcas — Merca",
  description: "Sube tu marca a Merca y vende a millones en LATAM.",
};

export default function MarcasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
