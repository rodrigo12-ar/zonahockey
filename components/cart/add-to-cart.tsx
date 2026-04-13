"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import type { CategorySlug } from "@/types";

type AddToCartProps = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  category: CategorySlug;
};

export function AddToCartButton({ productId, slug, name, image, price, category }: AddToCartProps) {
  const { addToCart, cartItems } = useCart();
  const [message, setMessage] = useState("");

  const existingQuantity = cartItems.find((item) => item.slug === slug)?.quantity ?? 0;

  const handleAddToCart = () => {
    addToCart({ productId, slug, name, image, price, category });
    setMessage("Producto agregado al carrito");
  };

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(""), 2500);
    return () => window.clearTimeout(timer);
  }, [message]);

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={handleAddToCart}
        className="mt-6 w-full rounded-full bg-accent px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-accentDark"
      >
        Agregar al carrito
      </button>
      {message ? (
        <div className="rounded-3xl border border-accent/20 bg-accent/10 px-4 py-3 text-sm text-accent">
          {message}
          {existingQuantity > 0 ? ` • Ahora tienes ${existingQuantity + 1} en el carrito` : ""}
        </div>
      ) : null}
    </div>
  );
}
