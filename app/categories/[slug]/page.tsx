import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCategories, getCategoryBySlug, getProductsByCategory } from "@/lib/shop";

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getCategories().map((category) => ({
    slug: category.slug
  }));
}

export default function CategoryPage({ params }: PageProps) {
  const category = getCategoryBySlug(params.slug);
  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(category.slug).filter(
    (item) => item.stock === undefined || item.stock > 0
  );

  return (
    <div className="min-h-screen bg-background text-slate-100">
      <SiteHeader categories={getCategories()} />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-accent/80">Categoría</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">{category.name} en stock</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">{category.description}</p>
          </div>
          <Link
            href="/"
            className="inline-flex rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
          >
            Volver a la tienda
          </Link>
        </div>

        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 text-slate-300">
            <p className="text-lg font-medium text-white">No hay productos en stock en esta categoría por el momento.</p>
            <p className="mt-3 text-sm">Podés volver a la tienda o revisar otra categoría.</p>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
