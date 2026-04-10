import { CheckoutForm } from "@/components/checkout-form";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background text-slate-100">
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <CheckoutForm />
      </main>
    </div>
  );
}
