import { notFound } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { formatCurrency, formatOrderStatus, getOrderStatusBadgeClass } from "@/lib/utils";
import { getOrderById } from "@/lib/shop";

type PageProps = {
  params: {
    id: string;
  };
};

export default function AdminOrderDetailPage({ params }: PageProps) {
  const order = getOrderById(params.id);
  if (!order) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-slate-100">
      <main className="mx-auto flex max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:px-8">
        <AdminSidebar />
        <section className="w-full space-y-8">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-soft">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-accent/80">Pedido</p>
                <h1 className="mt-3 text-3xl font-semibold text-white">Detalle de orden {order.id}</h1>
              </div>
              <span className={`rounded-full px-4 py-2 text-sm font-semibold ${getOrderStatusBadgeClass(order.status)}`}>
                {formatOrderStatus(order.status)}
              </span>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/80 p-6">
                <p className="text-sm text-slate-400">Cliente</p>
                <p className="text-lg font-semibold text-white">{order.customerName}</p>
                <p className="text-sm text-slate-300">{order.customerEmail}</p>
                <p className="text-sm text-slate-300">{order.customerPhone}</p>

                <p className="mt-4 text-sm text-slate-400">Dirección de envío</p>
                <p className="text-sm text-slate-300">{order.shippingAddress}</p>
              </div>
              <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/80 p-6">
                <p className="text-sm text-slate-400">Método de pago</p>
                <p className="text-lg font-semibold text-white">{order.paymentMethod === "mercado-pago" ? "Mercado Pago" : "Transferencia"}</p>
                <p className="text-sm text-slate-300">Creado el {order.createdAt}</p>
              </div>
            </div>
            <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/80 p-6">
              <h2 className="text-xl font-semibold text-white">Productos</h2>
              <div className="mt-4 space-y-4">
                {order.items.map((item) => (
                  <div key={item.slug} className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                    <div>
                      <p className="font-semibold text-white">{item.name}</p>
                      <p className="text-sm text-slate-400">Cantidad: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-accent">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-white">
                <span className="text-sm text-slate-300">Total final</span>
                <span className="text-xl font-semibold">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
