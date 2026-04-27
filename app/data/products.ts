export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
};

const img = (id: number) => `https://picsum.photos/seed/merca-${id}/600/750`;

export const products: Product[] = [
  { id: 1, name: "Vestido floral midi sin mangas", category: "Mujer", price: 19.99, originalPrice: 39.99, rating: 4.6, reviews: 2341, badge: "Más vendido" },
  { id: 2, name: "Blusa crop crochet beige", category: "Mujer", price: 14.99, originalPrice: 24.99, rating: 4.4, reviews: 892 },
  { id: 3, name: "Jean wide leg azul claro", category: "Mujer", price: 29.99, originalPrice: 49.99, rating: 4.7, reviews: 4128, badge: "-40%" },
  { id: 4, name: "Conjunto deportivo dos piezas", category: "Mujer", price: 24.99, originalPrice: 44.99, rating: 4.5, reviews: 1567 },
  { id: 5, name: "Camisa oversized hombre cuadros", category: "Hombre", price: 22.99, originalPrice: 36.99, rating: 4.6, reviews: 1893 },
  { id: 6, name: "Sudadera con capucha oversize", category: "Hombre", price: 27.99, originalPrice: 49.99, rating: 4.8, reviews: 3204, badge: "Tendencia" },
  { id: 7, name: "Jean slim fit negro", category: "Hombre", price: 34.99, rating: 4.5, reviews: 762 },
  { id: 8, name: "Playera básica algodón pack 3", category: "Hombre", price: 19.99, originalPrice: 29.99, rating: 4.4, reviews: 5421 },
  { id: 9, name: "Bolso tote canvas grande", category: "Accesorios", price: 16.99, originalPrice: 28.99, rating: 4.3, reviews: 1102 },
  { id: 10, name: "Lentes de sol redondos vintage", category: "Accesorios", price: 9.99, originalPrice: 19.99, rating: 4.5, reviews: 2890, badge: "-50%" },
  { id: 11, name: "Reloj minimalista correa cuero", category: "Accesorios", price: 32.99, originalPrice: 59.99, rating: 4.7, reviews: 1456 },
  { id: 12, name: "Aretes argollas oro 18k baño", category: "Accesorios", price: 8.99, originalPrice: 14.99, rating: 4.6, reviews: 3782 },
  { id: 13, name: "Tenis blancos clásicos unisex", category: "Calzado", price: 39.99, originalPrice: 69.99, rating: 4.7, reviews: 6213, badge: "Más vendido" },
  { id: 14, name: "Sandalias planas trenzadas", category: "Calzado", price: 18.99, originalPrice: 32.99, rating: 4.4, reviews: 1923 },
  { id: 15, name: "Botines tacón cuadrado negros", category: "Calzado", price: 44.99, originalPrice: 79.99, rating: 4.5, reviews: 1108 },
  { id: 16, name: "Cojín decorativo boho 45×45", category: "Hogar", price: 12.99, originalPrice: 19.99, rating: 4.6, reviews: 567 },
  { id: 17, name: "Lámpara mesa LED táctil", category: "Hogar", price: 26.99, originalPrice: 44.99, rating: 4.5, reviews: 892, badge: "Nuevo" },
  { id: 18, name: "Set 4 vasos vidrio amber", category: "Hogar", price: 15.99, originalPrice: 24.99, rating: 4.7, reviews: 1245 },
];

export const productImage = img;
