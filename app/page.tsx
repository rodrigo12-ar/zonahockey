import Link from "next/link";
import { ProductGrid } from "@/components/product-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getAllProducts, getCategories, getFeaturedProducts } from "@/lib/shop";

export default function HomePage() {
  const categories = getCategories();
  const featured = getFeaturedProducts();
  const products = getAllProducts();

  return (
    <div className="min-h-screen bg-background text-slate-100">
      <SiteHeader categories={categories} />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-soft sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-6">
              <span className="inline-flex rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-accent">
                Hockey performance
              </span>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Equipá tu juego con estilo y potencia.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Descubrí palos, patines, accesorios y fotografías de equipos para llevar tu pasión al próximo nivel.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#destacados" className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-accentDark">
                  Ver productos destacados
                </Link>
                <Link href="/categories/patines" className="rounded-full border border-white/10 px-6 py-3 text-sm transition hover:border-accent hover:text-accent">
                  Seguir comprando
                </Link>
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
              <div className="flex flex-col gap-6">
                <div className="rounded-3xl bg-white/5 p-5">
                  <h2 className="text-lg font-semibold text-white">Armá tu pedido</h2>
                  <p className="mt-2 text-sm text-slate-300">Explorá nuestra colección y agregá más productos, repuestos y servicios de mantenimiento para dejar tus patines listos.</p>
                </div>
                <Link href="/cart" className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-accentDark w-full text-center">
                  Ir al carrito
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="destacados" className="mt-14">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-accent/80">Selección especial</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Productos destacados</h2>
            </div>
            <p className="max-w-xl text-sm text-slate-300">
              Productos y fotos con alto impacto visual, listos para comprar y para mostrar en tu equipo.
            </p>
          </div>
          <ProductGrid products={featured} />
        </section>

        <section className="mt-16">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.32em] text-accent/80">Colección</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Catálogo completo</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="card-surface rounded-3xl border border-white/10 p-6 transition hover:border-accent/40 hover:bg-slate-900/95"
              >
                <p className="text-sm uppercase tracking-[0.24em] text-accent/90">{category.name}</p>
                <h3 className="mt-4 text-xl font-semibold text-white">{category.description}</h3>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 space-y-10">
          {categories.map((category) => {
            const items = products.filter((item) => item.category === category.slug);
            return (
              <div key={category.id} id={category.slug} className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8">
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.32em] text-accent/80">{category.name}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{category.description}</h3>
                  </div>
                  <Link href="#destacados" className="text-sm text-accent transition hover:text-accentDark">
                    Volver arriba
                  </Link>
                </div>
                <ProductGrid products={items} />
              </div>
            );
          })}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
