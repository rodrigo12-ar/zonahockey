import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCategories, getCategoryBySlug, getProductsByCategory } from "@/lib/shop";
import type { Product, SkateSubcategory } from "@/types";

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

const skateSections: Array<{ id: SkateSubcategory; title: string; description: string }> = [
  { id: "plancha", title: "Plancha", description: "Bases y estructuras para renovar o mejorar tus patines." },
  { id: "botas", title: "Botas", description: "Botas con soporte, comodidad y ajuste para cada nivel." },
  { id: "patin-completo", title: "PatÃ­n completo", description: "Equipos listos para usar, armados para pista y entrenamiento." },
  { id: "accesorios", title: "Accesorios", description: "Repuestos y complementos especÃ­ficos para patines." }
];

function getSkateSectionProducts(products: Product[], subcategory: SkateSubcategory) {
  return products.filter((product) => product.subcategory === subcategory);
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

        {category.slug === "patines" ? (
          <div className="space-y-8">
            <div className="flex flex-wrap gap-3">
              {skateSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-accent hover:text-white"
                >
                  {section.title}
                </a>
              ))}
            </div>
            {skateSections.map((section) => {
              const sectionProducts = getSkateSectionProducts(products as Product[], section.id);

              return (
                <section
                  key={section.id}
                  id={section.id}
                  className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8"
                >
                  <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.32em] text-accent/80">SubsecciÃ³n</p>
                      <h2 className="mt-3 text-3xl font-semibold text-white">{section.title}</h2>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">{section.description}</p>
                    </div>
                    <span className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-300">
                      {sectionProducts.length} productos
                    </span>
                  </div>

                  {sectionProducts.length > 0 ? (
                    <ProductGrid products={sectionProducts} />
                  ) : (
                    <div className="rounded-[2rem] border border-dashed border-white/10 bg-slate-900/50 p-8 text-slate-300">
                      TodavÃ­a no hay productos cargados en esta subsecciÃ³n.
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        ) : products.length > 0 ? (
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
