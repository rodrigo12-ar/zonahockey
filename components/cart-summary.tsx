import { formatCurrency } from "@/lib/utils";
import type { CartItem } from "@/types";

type CartSummaryProps = {
  items: CartItem[];
};

export function CartSummary({ items }: CartSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxes = Math.round(subtotal * 0.1);
  const total = subtotal + taxes;

  return (
    <div className="card-surface rounded-3xl border border-white/10 p-6">
      <h2 className="text-xl font-semibold text-white">Resumen de compra</h2>
      <div className="mt-4 space-y-3 text-sm text-slate-300">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>IVA estimado</span>
          <span>{formatCurrency(taxes)}</span>
        </div>
        <div className="flex items-center justify-between border-t border-slate-700 pt-4 text-base font-semibold text-white">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}
