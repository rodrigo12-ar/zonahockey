import { CartView } from "@/components/cart-view";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background text-slate-100">
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <CartView />
      </main>
    </div>
  );
}
