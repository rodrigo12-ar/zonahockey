export type CategorySlug = "palos" | "patines" | "bolsos" | "accesorios" | "fotografias";
export type SkateSubcategory = "plancha" | "botas" | "patin-completo" | "accesorios";

export type Category = {
  id: string;
  slug: CategorySlug;
  name: string;
  description: string;
};

export type ProductBase = {
  id: string;
  name: string;
  slug: string;
  price: number;
  shortDescription: string;
  longDescription: string;
  image: string;
  featured: boolean;
  promotionText?: string;
  createdAt: string;
  updatedAt: string;
};

export type Product = ProductBase & {
  category: Exclude<CategorySlug, "fotografias">;
  subcategory?: SkateSubcategory;
  stock: number;
};

export type PhotoProduct = ProductBase & {
  category: "fotografias";
  type: "individual" | "pack";
  team: string;
  date: string;
  imagePreview: string;
  imageOriginal: string;
  stock?: number;
};

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  category: CategorySlug;
};

export type OrderItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string;
  createdAt: string;
  status: "pendiente" | "entregado" | "inconveniente";
  paymentMethod: "mercado-pago" | "transferencia";
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  items: OrderItem[];
  subtotal: number;
  total: number;
};
