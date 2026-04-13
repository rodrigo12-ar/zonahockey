import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/shop";
import { formatCurrency } from "@/lib/utils";
import { AddToCartButton } from "@/components/cart/add-to-cart";
import type { PhotoProduct, ProductBase } from "@/types";

type PageProps = {
  params: {
    slug: string;
  };
};

export default function ProductDetailPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }
  const related = getRelatedProducts(params.slug);

  const isPhoto = product.category === "fotografias";
  const imageSrc = isPhoto ? (product as PhotoProduct).imagePreview ?? product.image : product.image;

  return (
    <div className="min-h-screen bg-background text-slate-100">
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-sm text-slate-300 transition hover:text-white">
            ← Volver a la tienda
          </Link>
          <Link href="/cart" className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-accentDark">
            Ver carrito
          </Link>
        </div>
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-soft">
            <img
              src={imageSrc}
              alt={product.name}
              draggable={false}
              className="h-[500px] w-full rounded-[2rem] object-cover"
            />
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between gap-4 text-sm uppercase tracking-[0.28em] text-accent/90">
                <span>{product.category}</span>
                <span>{product.stock ? `Stock: ${product.stock}` : "Stock disponible"}</span>
              </div>
              <div>
                <h1 className="text-4xl font-semibold text-white">{product.name}</h1>
                <p className="mt-3 text-lg text-slate-300">{product.longDescription}</p>
              </div>
            </div>
          </section>
          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6">
              <span className="text-sm uppercase tracking-[0.28em] text-accent/90">Precio</span>
              <p className="mt-3 text-4xl font-semibold text-white">{formatCurrency(product.price)}</p>
              <p className="mt-4 text-sm leading-6 text-slate-300">El pago está preparado para Mercado Pago o transferencia bancaria.</p>
              <AddToCartButton
                productId={product.id}
                slug={product.slug}
                name={product.name}
                image={imageSrc}
                price={product.price}
                category={product.category}
              />
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6">
              <h2 className="text-lg font-semibold text-white">Detalles</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li>Categoria: {product.category}</li>
                <li>Stock: {product.stock ?? "Disponible"}</li>
                <li>Publicado: {product.createdAt}</li>
              </ul>
            </div>
          </aside>
        </div>

        {related.length > 0 ? (
          <section className="mt-16 rounded-[2rem] border border-white/10 bg-slate-950/80 p-6">
            <h2 className="text-2xl font-semibold text-white">Productos relacionados</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <Link key={item.slug} href={`/products/${item.slug}`} className="card-surface overflow-hidden rounded-3xl border border-white/10 p-4 transition hover:border-accent/40">
                  <img
                    src={(item.category === "fotografias" ? (item as PhotoProduct).imagePreview ?? item.image : item.image)}
                    alt={item.name}
                    draggable={false}
                    className="h-40 w-full object-cover rounded-3xl"
                  />
                  <div className="mt-4">
                    <p className="text-sm uppercase tracking-[0.24em] text-accent/80">{item.category}</p>
                    <h3 className="mt-2 text-lg font-semibold text-white">{item.name}</h3>
                    <p className="mt-2 text-sm text-slate-300">{item.shortDescription}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
