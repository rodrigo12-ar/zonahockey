import Link from "next/link";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { OrderStatusControl } from "@/components/admin/order-status-control";
import { getOrders } from "@/lib/shop";
import { formatCurrency } from "@/lib/utils";

export default function AdminOrdersPage() {
  const orders = getOrders();

  return (
    <div className="min-h-screen bg-background text-slate-100">
      <main className="mx-auto flex max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:px-8">
        <AdminSidebar />
        <section className="w-full space-y-8">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-accent/80">Pedidos</p>
                <h1 className="mt-3 text-3xl font-semibold text-white">Gestión de pedidos</h1>
              </div>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80">
              <table className="min-w-full divide-y divide-white/10 text-left text-sm text-slate-300">
                <thead className="bg-slate-950/90 text-slate-400">
                  <tr>
                    <th className="px-6 py-4">Orden</th>
                    <th className="px-6 py-4">Cliente</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4">Estado</th>
                    <th className="px-6 py-4">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-white/5">
                      <td className="px-6 py-4">{order.id}</td>
                      <td className="px-6 py-4">{order.customerName}</td>
                      <td className="px-6 py-4">{formatCurrency(order.total)}</td>
                      <td className="px-6 py-4">
                        <OrderStatusControl orderId={order.id} initialStatus={order.status} />
                      </td>
                      <td className="px-6 py-4">
                        <Link href={`/admin/orders/${order.id}`} className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-accent hover:text-white">
                          Ver
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
