import { CartView } from "@/components/cart-view";
import { getAllProducts } from "@/lib/shop";
import type { CartItem } from "@/types";

export default function CartPage() {
  const products = getAllProducts();
  const cartItems: CartItem[] = products.slice(0, 2).map((product) => ({
    productId: product.id,
    slug: product.slug,
    name: product.name,
    image: product.image,
    price: product.price,
    quantity: 1,
    category: product.category
  }));

  return (
    <div className="min-h-screen bg-background text-slate-100">
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <CartView items={cartItems} />
      </main>
    </div>
  );
}
