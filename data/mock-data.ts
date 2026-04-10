import type { Category, Order, PhotoProduct, Product } from "@/types";

export const categories: Category[] = [
  {
    id: "cat-palos",
    slug: "palos",
    name: "Palos",
    description: "Palos de hockey profesional para diferentes niveles."
  },
  {
    id: "cat-patines",
    slug: "patines",
    name: "Patines",
    description: "Patines cómodos y resistentes para pista. Vendemos repuestos de ruedas, rulemanes y frenos, y también hacemos mantenimiento de patines."
  },
  {
    id: "cat-bolsos",
    slug: "bolsos",
    name: "Bolsos",
    description: "Bolsos deportivos para equipo completo."
  },
  {
    id: "cat-accesorios",
    slug: "accesorios",
    name: "Accesorios",
    description: "Guantes, protectores y accesorios esenciales."
  },
  {
    id: "cat-fotografias",
    slug: "fotografias",
    name: "Fotografías",
    description: "Imágenes deportivas profesionales de equipos y partidos."
  }
];

export const products: Product[] = [
  {
    id: "prod-001",
    name: "Palo Titan X22",
    slug: "palo-titan-x22",
    category: "palos",
    price: 23500,
    shortDescription: "Palo de alto rendimiento con control extra.",
    longDescription: "Palo ligero con núcleo reforzado y diseño aerodinámico, ideal para jugadores que buscan potencia y precisión.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80",
    promotionText: "Oferta",
    stock: 12,
    featured: true,
    createdAt: "2026-04-01",
    updatedAt: "2026-04-02"
  },
  {
    id: "prod-002",
    name: "Patines Storm Pro",
    slug: "patines-storm-pro",
    category: "patines",
    price: 44500,
    shortDescription: "Patines de velocidad con soporte alto.",
    longDescription: "Carcasa ergonómica y ruedas diseñadas para patinaje dinámico, con amortiguación y ajuste firme.",
    image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=900&q=80",
    promotionText: "Últimas unidades",
    stock: 8,
    featured: true,
    createdAt: "2026-03-26",
    updatedAt: "2026-04-03"
  },
  {
    id: "prod-003",
    name: "Bolso Strike Elite",
    slug: "bolso-strike-elite",
    category: "bolsos",
    price: 18500,
    shortDescription: "Bolso amplio resistente al clima.",
    longDescription: "Con compartimentos para palo, casco y accesorios, y reforzamiento para transporte seguro.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
    stock: 15,
    featured: false,
    createdAt: "2026-03-20",
    updatedAt: "2026-04-01"
  },
  {
    id: "prod-004",
    name: "Guantes PowerGrip",
    slug: "guantes-powergrip",
    category: "accesorios",
    price: 8700,
    shortDescription: "Guantes con agarre superior y protección.",
    longDescription: "Material transpirable con refuerzos en palma y dedos para máximo control del stick.",
    image: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=900&q=80",
    stock: 25,
    featured: false,
    createdAt: "2026-03-15",
    updatedAt: "2026-03-30"
  }
];

export const photoProducts: PhotoProduct[] = [
  {
    id: "photo-001",
    name: "Pack Equipo Titan",
    slug: "pack-equipo-titan",
    category: "fotografias",
    type: "pack",
    team: "Titan HC",
    date: "2026-03-12",
    price: 12000,
    shortDescription: "Pack de fotografías del equipo en acción.",
    longDescription: "Incluye 10 imágenes editadas de alta resolución para impresión y redes sociales.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80",
    imagePreview: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80",
    imageOriginal: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=90",
    stock: 20,
    featured: true,
    createdAt: "2026-03-18",
    updatedAt: "2026-04-02"
  },
  {
    id: "photo-002",
    name: "Foto Individual Defensor",
    slug: "foto-individual-defensor",
    category: "fotografias",
    type: "individual",
    team: "Patriot Club",
    date: "2026-04-05",
    price: 3800,
    shortDescription: "Imagen única de jugador en movimiento.",
    longDescription: "Fotografía de alta calidad con luz de estudio y tratamiento deportivo, disponible digitalmente.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80",
    imagePreview: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80",
    imageOriginal: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=90",
    stock: 50,
    featured: false,
    createdAt: "2026-04-06",
    updatedAt: "2026-04-07"
  }
];

export const orders: Order[] = [
  {
    id: "order-1001",
    createdAt: "2026-04-07",
    status: "pendiente",
    paymentMethod: "mercado-pago",
    customerName: "Lucía García",
    customerEmail: "lucia@gmail.com",
    customerPhone: "+54 9 11 1234 5678",
    shippingAddress: "Av. Libertador 1234, CABA",
    items: [
      {
        productId: "prod-001",
        slug: "palo-titan-x22",
        name: "Palo Titan X22",
        price: 23500,
        quantity: 1
      }
    ],
    subtotal: 23500,
    total: 23500
  }
];
