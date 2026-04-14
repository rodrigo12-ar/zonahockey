import { categories, orders, photoProducts, products } from "@/data/mock-data";
import type { Category, Order, PhotoProduct, Product, SkateSubcategory } from "@/types";
import { slugify } from "@/lib/utils";
import { createAdminClient } from "@/lib/supabase-admin";

type ProductRow = {
  id: string;
  name: string;
  slug: string;
  category: Product["category"];
  subcategory: SkateSubcategory | null;
  price: number;
  short_description: string;
  long_description: string;
  image: string;
  promotion_text: string | null;
  stock: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

let photoStore = photoProducts;
let orderStore = orders;

function mapProductRow(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: row.category,
    subcategory: row.subcategory ?? undefined,
    price: row.price,
    shortDescription: row.short_description,
    longDescription: row.long_description,
    image: row.image,
    promotionText: row.promotion_text ?? undefined,
    stock: row.stock,
    featured: row.featured,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function mapProductInput(data: Partial<Product>) {
  const category = (data.category ?? "accesorios") as Product["category"];
  const now = new Date().toISOString();

  return {
    name: data.name ?? "Nuevo producto",
    slug: data.slug ? data.slug : slugify(String(data.name ?? "producto")),
    category,
    subcategory: category === "patines" ? data.subcategory ?? "patin-completo" : null,
    price: data.price ?? 0,
    short_description: data.shortDescription ?? "Descripcion breve.",
    long_description: data.longDescription ?? "Descripcion detallada del producto.",
    image:
      data.image ??
      "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=900&q=80",
    promotion_text: data.promotionText?.trim() ? data.promotionText : null,
    stock: data.stock ?? 0,
    featured: data.featured ?? false,
    created_at: data.createdAt ?? now,
    updated_at: now
  };
}

async function getSupabaseProducts() {
  const adminClient = createAdminClient();

  if (!adminClient) {
    return products;
  }

  const { data, error } = await adminClient
    .from("products")
    .select("*")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error || !data) {
    return products;
  }

  return (data as ProductRow[]).map(mapProductRow);
}

export function getCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export async function getFeaturedProducts() {
  const productStore = await getSupabaseProducts();
  return [...productStore, ...photoStore].filter((item) => item.featured);
}

export async function getAllProducts() {
  const productStore = await getSupabaseProducts();
  return [...productStore, ...photoStore].sort((a, b) => Number(b.featured) - Number(a.featured));
}

export async function getProductsByCategory(category: string) {
  const allProducts = await getAllProducts();
  return allProducts.filter((item) => item.category === category);
}

export async function getPhysicalProducts() {
  return getSupabaseProducts();
}

export function getPhotoProducts() {
  return photoStore;
}

export function getPhotoBySlug(slug: string) {
  return photoStore.find((item) => item.slug === slug);
}

export async function getProductBySlug(slug: string) {
  const photo = getPhotoBySlug(slug);
  if (photo) {
    return photo;
  }

  const productStore = await getSupabaseProducts();
  return productStore.find((item) => item.slug === slug);
}

export async function getRelatedProducts(slug: string) {
  const allProducts = await getAllProducts();
  const product = allProducts.find((item) => item.slug === slug);
  if (!product) return [];
  return allProducts.filter((item) => item.slug !== slug).slice(0, 4);
}

export function getOrders() {
  return orderStore;
}

export function getOrderById(id: string) {
  return orderStore.find((order) => order.id === id);
}

export async function createProduct(data: Partial<Product>) {
  const adminClient = createAdminClient();

  if (!adminClient) {
    throw new Error("Falta SUPABASE_SERVICE_ROLE_KEY para crear productos");
  }

  const payload = mapProductInput(data);
  const { data: created, error } = await adminClient
    .from("products")
    .insert(payload)
    .select("*")
    .single();

  if (error || !created) {
    throw new Error(error?.message ?? "No se pudo crear el producto en Supabase");
  }

  return mapProductRow(created as ProductRow);
}

export async function updateProduct(slug: string, data: Partial<Product>) {
  const adminClient = createAdminClient();

  if (!adminClient) {
    throw new Error("Falta SUPABASE_SERVICE_ROLE_KEY para actualizar productos");
  }

  const existing = await getProductBySlug(slug);
  if (!existing || existing.category === "fotografias") {
    return null;
  }

  const category = (data.category ?? existing.category) as Product["category"];

  const payload = {
    name: data.name ?? existing.name,
    slug: data.slug ?? existing.slug,
    category,
    subcategory:
      category === "patines"
        ? data.subcategory ?? existing.subcategory ?? "patin-completo"
        : null,
    price: data.price ?? existing.price,
    short_description: data.shortDescription ?? existing.shortDescription,
    long_description: data.longDescription ?? existing.longDescription,
    image: data.image ?? existing.image,
    promotion_text: data.promotionText?.trim()
      ? data.promotionText
      : data.promotionText === ""
        ? null
        : existing.promotionText ?? null,
    stock: data.stock ?? existing.stock,
    featured: data.featured ?? existing.featured,
    updated_at: new Date().toISOString()
  };

  const { data: updated, error } = await adminClient
    .from("products")
    .update(payload)
    .eq("slug", slug)
    .select("*")
    .single();

  if (error || !updated) {
    throw new Error(error?.message ?? "No se pudo actualizar el producto en Supabase");
  }

  return mapProductRow(updated as ProductRow);
}

export async function deleteProduct(slug: string) {
  const adminClient = createAdminClient();

  if (!adminClient) {
    throw new Error("Falta SUPABASE_SERVICE_ROLE_KEY para eliminar productos");
  }

  const { error } = await adminClient.from("products").delete().eq("slug", slug);

  if (error) {
    throw new Error(error.message ?? "No se pudo eliminar el producto en Supabase");
  }
}

export function createPhoto(data: Partial<PhotoProduct>) {
  const imagePreview =
    data.imagePreview ??
    data.image ??
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80";
  const imageOriginal = data.imageOriginal ?? imagePreview;

  const newPhoto: PhotoProduct = {
    id: `photo-${Date.now()}`,
    slug: data.slug ? data.slug : slugify(String(data.name ?? "foto")),
    category: "fotografias",
    type: data.type ?? "individual",
    team: data.team ?? "Equipo",
    date: data.date ?? new Date().toISOString().slice(0, 10),
    price: data.price ?? 0,
    name: data.name ?? "Nueva fotografia",
    shortDescription: data.shortDescription ?? "Descripcion breve.",
    longDescription: data.longDescription ?? "Descripcion detallada de la fotografia.",
    image: imagePreview,
    imagePreview,
    imageOriginal,
    stock: data.stock,
    featured: data.featured ?? false,
    createdAt: new Date().toISOString().slice(0, 10),
    updatedAt: new Date().toISOString().slice(0, 10)
  };
  photoStore = [newPhoto, ...photoStore];
  return newPhoto;
}

export function updatePhoto(slug: string, data: Partial<PhotoProduct>) {
  photoStore = photoStore.map((item) =>
    item.slug === slug
      ? {
          ...item,
          ...data,
          imagePreview: data.imagePreview ?? item.imagePreview,
          imageOriginal: data.imageOriginal ?? item.imageOriginal,
          image: data.imagePreview ?? item.image ?? item.imagePreview,
          slug: data.slug ? data.slug : item.slug,
          updatedAt: new Date().toISOString().slice(0, 10)
        }
      : item
  );
  return getPhotoBySlug(slug);
}

export function deletePhoto(slug: string) {
  photoStore = photoStore.filter((item) => item.slug !== slug);
}

export function createOrder(data: Partial<Order>) {
  const newOrder: Order = {
    id: `order-${Date.now()}`,
    createdAt: new Date().toISOString().slice(0, 10),
    status: data.status ?? "pendiente",
    paymentMethod: data.paymentMethod ?? "mercado-pago",
    customerName: data.customerName ?? "Cliente",
    customerEmail: data.customerEmail ?? "cliente@correo.com",
    customerPhone: data.customerPhone ?? "",
    shippingAddress: data.shippingAddress ?? "Direccion local",
    items: data.items ?? [],
    subtotal: data.subtotal ?? 0,
    total: data.total ?? 0
  };
  orderStore = [newOrder, ...orderStore];
  return newOrder;
}

export function updateOrderStatus(id: string, status: Order["status"]) {
  orderStore = orderStore.map((order) =>
    order.id === id ? { ...order, status } : order
  );
  return getOrderById(id);
}
