import Link from "next/link";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { getPhotoProducts } from "@/lib/shop";
import { formatCurrency } from "@/lib/utils";

export default function AdminPhotosPage() {
  const photos = getPhotoProducts();

  return (
    <div className="min-h-screen bg-background text-slate-100">
      <main className="mx-auto flex max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:px-8">
        <AdminSidebar />
        <section className="w-full space-y-8">
          <div className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-slate-950/80 p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-accent/80">Fotografías</p>
                <h1 className="mt-3 text-3xl font-semibold text-white">Gestión de fotografías</h1>
              </div>
              <Link href="/admin/photos/new" className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-accentDark">
                Crear nueva foto
              </Link>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80">
              <table className="min-w-full divide-y divide-white/10 text-left text-sm text-slate-300">
                <thead className="bg-slate-950/90 text-slate-400">
                  <tr>
                    <th className="px-6 py-4">Nombre</th>
                    <th className="px-6 py-4">Tipo</th>
                    <th className="px-6 py-4">Equipo</th>
                    <th className="px-6 py-4">Precio</th>
                    <th className="px-6 py-4">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {photos.map((photo) => (
                    <tr key={photo.slug} className="hover:bg-white/5">
                      <td className="px-6 py-4">{photo.name}</td>
                      <td className="px-6 py-4 text-slate-400">{photo.type}</td>
                      <td className="px-6 py-4 text-slate-300">{photo.team}</td>
                      <td className="px-6 py-4 text-slate-300">{formatCurrency(photo.price)}</td>
                      <td className="px-6 py-4">
                        <Link href={`/admin/photos/${photo.slug}`} className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-accent hover:text-white">
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
