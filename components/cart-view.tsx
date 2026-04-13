"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";
import { formatCurrency } from "@/lib/utils";

export function CartView() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  if (!mounted) {
    return <div className="h-96 animate-pulse rounded-3xl bg-slate-700/20" />;
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
      <div className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-950/80 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-white">Carrito</h1>
          <span className="rounded-full bg-accent/20 px-3 py-1 text-sm text-accent">
            {cartItems.length} artículos
          </span>
        </div>
        {cartItems.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-8 text-center">
            <p className="text-slate-300">Tu carrito está vacío.</p>
            <Link
              href="/"
              className="mt-4 inline-block rounded-full bg-accent px-6 py-2 text-sm font-semibold text-slate-950 transition hover:bg-accentDark"
            >
              Volver a la tienda
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.slug}
                className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/80 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-3xl object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-white">{item.name}</p>
                    <p className="text-sm text-slate-400">{item.category}</p>
                    <p className="mt-2 text-sm font-semibold text-accent">{formatCurrency(item.price)}</p>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-3 sm:items-end">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                      className="rounded-full border border-white/10 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/5"
                    >
                      −
                    </button>
                    <span className="min-w-[2rem] text-center text-sm font-semibold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                      className="rounded-full border border-white/10 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/5"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.slug)}
                    className="text-sm text-slate-400 transition hover:text-danger"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <aside className="space-y-6">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-accent/80">Resumen</p>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-700 pt-4 text-base font-semibold text-white">
              <span>Total</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            {cartItems.length > 0 ? (
              <Link
                href="/checkout"
                className="mt-6 block rounded-full bg-accent px-5 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-accentDark"
              >
                Finalizar compra
              </Link>
            ) : null}
          </div>
        </div>
      </aside>
    </div>
  );
}

