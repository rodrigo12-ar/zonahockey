import { notFound } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { ProductForm } from "@/components/admin/product-form";
import { getProductBySlug } from "@/lib/shop";

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function AdminEditProductPage({ params }: PageProps) {
  const product = await getProductBySlug(params.slug);
  if (!product || product.category === "fotografias") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-slate-100">
      <main className="mx-auto flex max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:px-8">
        <AdminSidebar />
        <section className="w-full">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-soft">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.28em] text-accent/80">Productos</p>
              <h1 className="mt-3 text-3xl font-semibold text-white">Editar producto</h1>
            </div>
            <ProductForm action="edit" endpoint={`/api/admin/products/${product.slug}`} initialData={product} />
          </div>
        </section>
      </main>
    </div>
  );
}
