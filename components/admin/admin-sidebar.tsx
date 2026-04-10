'use client';

import Link from "next/link";

export function AdminSidebar() {
  return (
    <aside className="hidden w-72 shrink-0 rounded-3xl border border-white/10 bg-slate-950/85 p-6 lg:block">
      <div className="mb-8 text-sm uppercase tracking-[0.3em] text-accent/90">Admin</div>
      <nav className="space-y-3 text-sm text-slate-200">
        <Link href="/admin" className="block rounded-2xl px-4 py-3 hover:bg-white/5">
          Dashboard
        </Link>
        <Link href="/admin/products" className="block rounded-2xl px-4 py-3 hover:bg-white/5">
          Productos
        </Link>
        <Link href="/admin/photos" className="block rounded-2xl px-4 py-3 hover:bg-white/5">
          Fotografías
        </Link>
        <Link href="/admin/orders" className="block rounded-2xl px-4 py-3 hover:bg-white/5">
          Pedidos
        </Link>
      </nav>
    </aside>
  );
}
