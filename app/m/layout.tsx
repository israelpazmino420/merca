import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merca App — moda LATAM en tu bolsillo",
  description: "La experiencia móvil de Merca. Encuentra tendencias, ofertas y los favoritos de la región.",
};

export default function MLayout({ children }: { children: React.ReactNode }) {
  return children;
}
