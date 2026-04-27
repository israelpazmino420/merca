export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  sold: number;
  badge?: string;
};

const img = (id: number) => `https://picsum.photos/seed/merca-${id}/600/750`;

export const products: Product[] = [
  // Vestidos
  { id: 1, name: "Vestido floral midi sin mangas", category: "Vestidos", price: 19.99, originalPrice: 39.99, rating: 4.6, reviews: 2341, sold: 4800, badge: "Más vendido" },
  { id: 2, name: "Vestido halter satinado negro", category: "Vestidos", price: 22.99, originalPrice: 42.99, rating: 4.5, reviews: 1843, sold: 3200 },
  { id: 3, name: "Vestido bodycon manga larga ajustado", category: "Vestidos", price: 18.99, originalPrice: 34.99, rating: 4.4, reviews: 1290, sold: 2100 },
  { id: 4, name: "Vestido camisero oversized lino crema", category: "Vestidos", price: 27.99, originalPrice: 49.99, rating: 4.7, reviews: 2790, sold: 5400 },
  { id: 5, name: "Vestido punto canalé largo otoño", category: "Vestidos", price: 24.99, originalPrice: 44.99, rating: 4.6, reviews: 1567, sold: 2900, badge: "Tendencia" },
  { id: 6, name: "Vestido boho bordado primavera", category: "Vestidos", price: 29.99, originalPrice: 54.99, rating: 4.5, reviews: 982, sold: 1700 },
  { id: 7, name: "Vestido off-shoulder elastizado", category: "Vestidos", price: 16.99, originalPrice: 29.99, rating: 4.3, reviews: 1456, sold: 2300 },
  { id: 8, name: "Vestido mini lencero ajustable tiras", category: "Vestidos", price: 14.99, originalPrice: 26.99, rating: 4.4, reviews: 2103, sold: 4200, badge: "Flash sale" },
  { id: 9, name: "Vestido maxi corte princesa floral", category: "Vestidos", price: 32.99, originalPrice: 59.99, rating: 4.7, reviews: 1820, sold: 3100 },
  { id: 10, name: "Vestido tubo cuello alto formal", category: "Vestidos", price: 25.99, originalPrice: 44.99, rating: 4.5, reviews: 743, sold: 1100 },

  // Tops y blusas
  { id: 11, name: "Blusa crop crochet beige tejida", category: "Tops", price: 14.99, originalPrice: 24.99, rating: 4.4, reviews: 892, sold: 1200 },
  { id: 12, name: "Top halter tejido satinado verde", category: "Tops", price: 11.99, originalPrice: 22.99, rating: 4.3, reviews: 1567, sold: 3300 },
  { id: 13, name: "Body manga larga cuello alto negro", category: "Tops", price: 13.99, originalPrice: 22.99, rating: 4.4, reviews: 943, sold: 1500 },
  { id: 14, name: "Camisa blanca clásica oversized", category: "Tops", price: 17.99, originalPrice: 29.99, rating: 4.6, reviews: 2341, sold: 4700, badge: "Más vendido" },
  { id: 15, name: "Top tube strapless básico ajustado", category: "Tops", price: 8.99, originalPrice: 16.99, rating: 4.3, reviews: 4128, sold: 8900 },
  { id: 16, name: "Blusa campesina manga abullonada", category: "Tops", price: 19.99, originalPrice: 34.99, rating: 4.5, reviews: 1289, sold: 2200 },
  { id: 17, name: "Crop top deportivo sin mangas", category: "Tops", price: 9.99, originalPrice: 17.99, rating: 4.4, reviews: 3421, sold: 7100 },
  { id: 18, name: "Camisola seda satén tirantes negro", category: "Tops", price: 15.99, originalPrice: 26.99, rating: 4.5, reviews: 1843, sold: 3400, badge: "-40%" },
  { id: 19, name: "Suéter punto trenzado cuello tortuga", category: "Tops", price: 28.99, originalPrice: 49.99, rating: 4.7, reviews: 1432, sold: 2300 },
  { id: 20, name: "Cardigan ligero abierto largo beige", category: "Tops", price: 24.99, originalPrice: 42.99, rating: 4.6, reviews: 967, sold: 1600 },

  // Jeans y pantalones
  { id: 21, name: "Jean wide leg azul claro tiro alto", category: "Jeans", price: 29.99, originalPrice: 49.99, rating: 4.7, reviews: 4128, sold: 9100, badge: "Más vendido" },
  { id: 22, name: "Jean skinny azul oscuro tiro medio", category: "Jeans", price: 26.99, originalPrice: 44.99, rating: 4.5, reviews: 3421, sold: 6800 },
  { id: 23, name: "Jean mom fit lavado claro vintage", category: "Jeans", price: 31.99, originalPrice: 52.99, rating: 4.6, reviews: 2890, sold: 5400 },
  { id: 24, name: "Pantalón palazzo flow elegante", category: "Pantalones", price: 22.99, originalPrice: 39.99, rating: 4.5, reviews: 1654, sold: 2900 },
  { id: 25, name: "Pantalón cargo verde militar mujer", category: "Pantalones", price: 27.99, originalPrice: 47.99, rating: 4.6, reviews: 2103, sold: 4100, badge: "Tendencia" },
  { id: 26, name: "Legging alta compresión deporte", category: "Pantalones", price: 14.99, originalPrice: 24.99, rating: 4.7, reviews: 5621, sold: 12300 },
  { id: 27, name: "Pantalón sastre slim crema oficina", category: "Pantalones", price: 25.99, originalPrice: 44.99, rating: 4.5, reviews: 1290, sold: 1800 },
  { id: 28, name: "Bermuda denim tiro alto desgastada", category: "Jeans", price: 18.99, originalPrice: 32.99, rating: 4.4, reviews: 1567, sold: 3200 },
  { id: 29, name: "Pantalón paper bag cinturón incluido", category: "Pantalones", price: 23.99, originalPrice: 41.99, rating: 4.5, reviews: 943, sold: 1500 },
  { id: 30, name: "Jogger algodón oversized beige", category: "Pantalones", price: 19.99, originalPrice: 34.99, rating: 4.6, reviews: 2341, sold: 5100 },

  // Faldas
  { id: 31, name: "Falda mini tableada plisada negra", category: "Faldas", price: 16.99, originalPrice: 28.99, rating: 4.5, reviews: 2103, sold: 4100 },
  { id: 32, name: "Falda midi satinada drapeada dorada", category: "Faldas", price: 21.99, originalPrice: 38.99, rating: 4.6, reviews: 1289, sold: 2200, badge: "Flash sale" },
  { id: 33, name: "Falda larga estampada boho fluida", category: "Faldas", price: 24.99, originalPrice: 42.99, rating: 4.5, reviews: 967, sold: 1700 },
  { id: 34, name: "Falda lápiz negra trabajo cintura alta", category: "Faldas", price: 22.99, originalPrice: 39.99, rating: 4.4, reviews: 743, sold: 1200 },
  { id: 35, name: "Mini falda denim flecos vintage", category: "Faldas", price: 17.99, originalPrice: 30.99, rating: 4.3, reviews: 1432, sold: 2700 },

  // Conjuntos y exterior
  { id: 36, name: "Conjunto deportivo dos piezas neón", category: "Conjuntos", price: 24.99, originalPrice: 44.99, rating: 4.5, reviews: 1567, sold: 3400 },
  { id: 37, name: "Set blusa y short loungewear suave", category: "Conjuntos", price: 19.99, originalPrice: 34.99, rating: 4.6, reviews: 2103, sold: 4500 },
  { id: 38, name: "Conjunto sastre blazer y pantalón", category: "Conjuntos", price: 49.99, originalPrice: 89.99, rating: 4.7, reviews: 1432, sold: 2100, badge: "Tendencia" },
  { id: 39, name: "Chaqueta jean oversized clara desgastada", category: "Exterior", price: 35.99, originalPrice: 59.99, rating: 4.6, reviews: 2890, sold: 5700, badge: "-40%" },
  { id: 40, name: "Abrigo lana largo doble botonadura", category: "Exterior", price: 59.99, originalPrice: 99.99, rating: 4.7, reviews: 1820, sold: 2800 },
  { id: 41, name: "Trench coat clásico beige cinturón", category: "Exterior", price: 54.99, originalPrice: 94.99, rating: 4.6, reviews: 1290, sold: 1900 },
  { id: 42, name: "Blazer oversized hombros marcados negro", category: "Exterior", price: 39.99, originalPrice: 69.99, rating: 4.5, reviews: 1654, sold: 2700 },
  { id: 43, name: "Chaleco acolchado puffer corto crema", category: "Exterior", price: 32.99, originalPrice: 54.99, rating: 4.6, reviews: 2103, sold: 4200, badge: "Nuevo" },

  // Lencería y pijamas
  { id: 44, name: "Pijama satén dos piezas largo", category: "Pijamas", price: 22.99, originalPrice: 39.99, rating: 4.7, reviews: 3421, sold: 7800 },
  { id: 45, name: "Set lencería encaje tres piezas", category: "Lencería", price: 18.99, originalPrice: 32.99, rating: 4.5, reviews: 1843, sold: 3600 },
  { id: 46, name: "Camisón seda satén corto tirantes", category: "Pijamas", price: 14.99, originalPrice: 26.99, rating: 4.4, reviews: 1290, sold: 2400 },
  { id: 47, name: "Bralette deportivo encaje sin aros", category: "Lencería", price: 9.99, originalPrice: 17.99, rating: 4.6, reviews: 4128, sold: 9300 },
  { id: 48, name: "Bata kimono satinada estampada flores", category: "Pijamas", price: 21.99, originalPrice: 38.99, rating: 4.5, reviews: 967, sold: 1700 },

  // Más básicos
  { id: 49, name: "Sudadera oversized cuello redondo cropped", category: "Tops", price: 23.99, originalPrice: 41.99, rating: 4.6, reviews: 2890, sold: 5800 },
  { id: 50, name: "Top bandeau strapless básico verano", category: "Tops", price: 7.99, originalPrice: 14.99, rating: 4.3, reviews: 5621, sold: 13200, badge: "Flash sale" },
];

export const productImage = img;
