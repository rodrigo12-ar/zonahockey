"use client";

import { useState } from "react";

export function CheckoutForm() {
  const [method, setMethod] = useState<"mercado-pago" | "transferencia">("mercado-pago");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-950/80 p-6">
      <h1 className="text-3xl font-semibold text-white">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-300">
            Nombre completo
            <input className="w-full rounded-3xl border border-slate-700 bg-slate-900/95 px-4 py-3 text-slate-100 outline-none" required />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            Email
            <input type="email" className="w-full rounded-3xl border border-slate-700 bg-slate-900/95 px-4 py-3 text-slate-100 outline-none" required />
          </label>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-300">
            Teléfono
            <input className="w-full rounded-3xl border border-slate-700 bg-slate-900/95 px-4 py-3 text-slate-100 outline-none" required />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            Dirección de envío
            <input className="w-full rounded-3xl border border-slate-700 bg-slate-900/95 px-4 py-3 text-slate-100 outline-none" required />
          </label>
        </div>
        <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/80 p-4">
          <p className="text-sm uppercase tracking-[0.24em] text-accent/80">Forma de pago</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="inline-flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-200 transition hover:border-accent">
              <input type="radio" name="payment" checked={method === "mercado-pago"} onChange={() => setMethod("mercado-pago")} />
              Mercado Pago
            </label>
            <label className="inline-flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-200 transition hover:border-accent">
              <input type="radio" name="payment" checked={method === "transferencia"} onChange={() => setMethod("transferencia")} />
              Transferencia bancaria
            </label>
          </div>
        </div>
        <button className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-accentDark">
          Confirmar compra
        </button>
      </form>
      {submitted ? (
        <div className="rounded-3xl border border-accent/20 bg-accent/10 p-4 text-sm text-accent">
          Compra simulada realizada. Próximo paso: integración real con Mercado Pago y procesamiento de pedidos.
        </div>
      ) : null}
    </div>
  );
}
