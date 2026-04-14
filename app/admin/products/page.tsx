import Link from "next/link";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { getPhysicalProducts } from "@/lib/shop";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types";

function formatProductCategory(product: Product) {
  if (product.category !== "patines" || !product.subcategory) {
    return product.category;
  }

  const subcategoryLabels: Record<NonNullable<Product["subcategory"]>, string> = {
    plancha: "Plancha",
    botas: "Botas",
    "patin-completo": "Patin completo",
    accesorios: "Accesorios"
  };

  return `patines / ${subcategoryLabels[product.subcategory]}`;
}

export default async function AdminProductsPage() {
  const products = await getPhysicalProducts();

  return (
    <div className="min-h-screen bg-background text-slate-100">
      <main className="mx-auto flex max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:px-8">
        <AdminSidebar />
        <section className="w-full space-y-8">
          <div className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-slate-950/80 p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-accent/80">Productos</p>
                <h1 className="mt-3 text-3xl font-semibold text-white">Gestion de productos</h1>
              </div>
              <Link
                href="/admin/products/new"
                className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-accentDark"
              >
                Crear nuevo producto
              </Link>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80">
              <table className="min-w-full divide-y divide-white/10 text-left text-sm text-slate-300">
                <thead className="bg-slate-950/90 text-slate-400">
                  <tr>
                    <th className="px-6 py-4">Nombre</th>
                    <th className="px-6 py-4">Categoria</th>
                    <th className="px-6 py-4">Precio</th>
                    <th className="px-6 py-4">Promocion</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {products.map((product) => (
                    <tr key={product.slug} className="hover:bg-white/5">
                      <td className="px-6 py-4">{product.name}</td>
                      <td className="px-6 py-4 text-slate-400">{formatProductCategory(product)}</td>
                      <td className="px-6 py-4 text-slate-300">{formatCurrency(product.price)}</td>
                      <td className="px-6 py-4 text-slate-300">{product.promotionText ?? "-"}</td>
                      <td className="px-6 py-4 text-slate-300">{product.stock}</td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/products/${product.slug}`}
                          className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-accent hover:text-white"
                        >
                          Editar
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
