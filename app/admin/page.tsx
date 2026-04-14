import Link from "next/link";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { getAllProducts, getOrders, getPhotoProducts } from "@/lib/shop";

export default async function AdminDashboardPage() {
  const products = (await getAllProducts()).filter((item) => item.category !== "fotografias");
  const fotos = getPhotoProducts();
  const orders = getOrders();

  return (
    <div className="min-h-screen bg-background text-slate-100">
      <main className="mx-auto flex max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:px-8">
        <AdminSidebar />
        <section className="w-full space-y-8">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-accent/80">Dashboard</p>
                <h1 className="mt-3 text-3xl font-semibold text-white">Panel de administración</h1>
              </div>
              <Link
                href="/api/logout"
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-rose-500/40 hover:text-rose-200"
              >
                Cerrar sesión
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-slate-900/75 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-accent/80">Productos</p>
                <p className="mt-4 text-4xl font-semibold text-white">{products.length}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-900/75 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-accent/80">Fotografías</p>
                <p className="mt-4 text-4xl font-semibold text-white">{fotos.length}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-900/75 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-accent/80">Pedidos</p>
                <p className="mt-4 text-4xl font-semibold text-white">{orders.length}</p>
              </div>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <Link href="/admin/products" className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 transition hover:border-accent/40">
              <h2 className="text-xl font-semibold text-white">Gestión de productos</h2>
              <p className="mt-3 text-slate-300">Crea, edita y elimina palos, patines, bolsos y accesorios.</p>
            </Link>
            <Link href="/admin/photos" className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 transition hover:border-accent/40">
              <h2 className="text-xl font-semibold text-white">Gestión de fotografías</h2>
              <p className="mt-3 text-slate-300">Administra packs, fotos individuales y contenido de marketing visual.</p>
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <Link href="/admin/orders" className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 transition hover:border-accent/40">
              <h2 className="text-xl font-semibold text-white">Gestión de pedidos</h2>
              <p className="mt-3 text-slate-300">Revisá el estado, detalles y progreso de tus pedidos.</p>
            </Link>
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6">
              <h2 className="text-xl font-semibold text-white">Bienvenido</h2>
              <p className="mt-3 text-slate-300">Sección preparada para protección con login y datos reales en el futuro.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
