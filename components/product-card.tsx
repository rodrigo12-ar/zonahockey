import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import type { ProductBase } from "@/types";

type ProductCardProps = {
  product: ProductBase & { category: string; imagePreview?: string };
};

export function ProductCard({ product }: ProductCardProps) {
  const imageSrc = product.category === "fotografias" ? product.imagePreview ?? product.image : product.image;

  return (
    <article className="card-surface group overflow-hidden rounded-3xl border border-white/10 transition hover:-translate-y-1 hover:border-accent/40">
      <div className="relative overflow-hidden">
        <img
          src={imageSrc}
          alt={product.name}
          draggable={false}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {product.promotionText ? (
          <span className="absolute left-4 top-4 rounded-full bg-accent/95 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-950">
            {product.promotionText}
          </span>
        ) : null}
      </div>
      <div className="p-5">
        <div className="mb-3 text-xs uppercase tracking-[0.2em] text-accent/90">{product.category}</div>
        <h3 className="text-lg font-semibold text-white">{product.name}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-300">{product.shortDescription}</p>
        <div className="mt-4 flex items-center justify-between gap-4">
          <span className="text-xl font-semibold text-white">{formatCurrency(product.price)}</span>
          <Link
            href={`/products/${product.slug}`}
            className="rounded-full bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20"
          >
            Ver detalle
          </Link>
        </div>
      </div>
    </article>
  );
}
