"use client";

import Link from "next/link";
import { useState } from "react";
import { Category } from "@/types";
import { useCart } from "@/components/cart/cart-provider";

type SiteHeaderProps = {
  categories: Category[];
};

export function SiteHeader({ categories }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems: cartTotalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-xl font-semibold tracking-tight text-white transition hover:text-accent"
        >
          Zona Hockey
        </Link>

        {/* Desktop Search & Nav */}
        <div className="hidden flex-1 items-center gap-3 md:flex">
          <input
            type="search"
            placeholder="Buscar palos, patines, fotos..."
            className="w-full rounded-full border border-slate-700 bg-slate-900/90 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>

        {/* Desktop Categories */}
        <nav className="hidden items-center gap-2 text-xs text-slate-300 md:flex">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-white"
            >
              {category.name}
            </Link>
          ))}
        </nav>

        {/* Cart Button */}
        <Link
          href="/cart"
          className="relative rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-accentDark active:scale-95"
        >
          🛒 Carrito
          {cartTotalItems > 0 ? (
            <span className="absolute -right-2 -top-2 flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white">
              {cartTotalItems}
            </span>
          ) : null}
        </Link>
        <Link
          href="/login"
          className="hidden rounded-full border border-white/10 px-4 py-2.5 text-sm text-slate-200 transition hover:bg-white/10 md:inline-flex"
        >
          Admin
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-full p-2 text-slate-200 transition hover:bg-white/10 md:hidden"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-slate-950/95 px-4 py-4 md:hidden">
          <nav className="space-y-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-2xl px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

