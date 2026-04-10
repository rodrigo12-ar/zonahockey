'use client';

import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/90 px-4 py-8 text-sm text-slate-400 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p>Zona Hockey Store © 2026. Diseñado para tienda deportiva moderna.</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/" className="hover:text-white">
            Inicio
          </Link>
          <Link href="/admin" className="hover:text-white">
            Panel Admin
          </Link>
          <a href="#" className="hover:text-white">
            Términos
          </a>
        </div>
      </div>
    </footer>
  );
}
