import { categories, orders, photoProducts, products } from "@/data/mock-data";
import type { Category, Order, OrderItem, PhotoProduct, Product } from "@/types";
import { slugify } from "@/lib/utils";

let productStore = products;
let photoStore = photoProducts;
let orderStore = orders;

export function getCategories(): Category[] {
  return categories;
}

export function getFeaturedProducts() {
  return [...productStore, ...photoStore].filter((item) => item.featured);
}

export function getAllProducts() {
  return [...productStore, ...photoStore].sort((a, b) => Number(b.featured) - Number(a.featured));
}

export function getProductsByCategory(category: string) {
  return getAllProducts().filter((item) => item.category === category);
}

export function getPhysicalProducts() {
  return productStore;
}

export function getPhotoProducts() {
  return photoStore;
}

export function getProductBySlug(slug: string) {
  return getAllProducts().find((item) => item.slug === slug);
}

export function getRelatedProducts(slug: string) {
  const product = getProductBySlug(slug);
  if (!product) return [];
  return getAllProducts().filter((item) => item.slug !== slug).slice(0, 4);
}

export function getCartItems() {
  return [];
}

export function getOrders() {
  return orderStore;
}

export function getOrderById(id: string) {
  return orderStore.find((order) => order.id === id);
}

export function createProduct(data: Partial<Product>) {
  const newProduct: Product = {
    id: `prod-${Date.now()}`,
    slug: data.slug ? data.slug : slugify(String(data.name ?? "producto")),
    category: (data.category ?? "accesorios") as Product["category"],
    price: data.price ?? 0,
    name: data.name ?? "Nuevo producto",
    shortDescription: data.shortDescription ?? "Descripción breve.",
    longDescription: data.longDescription ?? "Descripción detallada del producto.",
    image: data.image ?? "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=900&q=80",
    promotionText: data.promotionText ?? "",
    stock: data.stock ?? 0,
    featured: data.featured ?? false,
    createdAt: new Date().toISOString().slice(0, 10),
    updatedAt: new Date().toISOString().slice(0, 10)
  };
  productStore = [newProduct, ...productStore];
  return newProduct;
}

export function updateProduct(slug: string, data: Partial<Product>) {
  productStore = productStore.map((item) =>
    item.slug === slug
      ? {
          ...item,
          ...data,
          slug: data.slug ? data.slug : item.slug,
          promotionText: data.promotionText ?? item.promotionText,
          updatedAt: new Date().toISOString().slice(0, 10)
        }
      : item
  );
  return getProductBySlug(slug);
}

export function deleteProduct(slug: string) {
  productStore = productStore.filter((item) => item.slug !== slug);
}

export function createPhoto(data: Partial<PhotoProduct>) {
  const imagePreview = data.imagePreview ?? data.image ?? "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80";
  const imageOriginal = data.imageOriginal ?? imagePreview;

  const newPhoto: PhotoProduct = {
    id: `photo-${Date.now()}`,
    slug: data.slug ? data.slug : slugify(String(data.name ?? "foto")),
    category: "fotografias",
    type: data.type ?? "individual",
    team: data.team ?? "Equipo",
    date: data.date ?? new Date().toISOString().slice(0, 10),
    price: data.price ?? 0,
    name: data.name ?? "Nueva fotografía",
    shortDescription: data.shortDescription ?? "Descripción breve.",
    longDescription: data.longDescription ?? "Descripción detallada de la fotografía.",
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
  return getProductBySlug(slug);
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
    shippingAddress: data.shippingAddress ?? "Dirección local",
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
