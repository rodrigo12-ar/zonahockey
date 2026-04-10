export function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  }).format(value);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatOrderStatus(status: "pendiente" | "entregado" | "inconveniente") {
  const labels: Record<string, string> = {
    pendiente: "Pendiente",
    entregado: "Entregado",
    inconveniente: "Inconveniente"
  };
  return labels[status] ?? status;
}

export function getOrderStatusBadgeClass(status: "pendiente" | "entregado" | "inconveniente") {
  const classes: Record<string, string> = {
    pendiente: "bg-amber-500/15 text-amber-300 border border-amber-500/20",
    entregado: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20",
    inconveniente: "bg-rose-500/15 text-rose-300 border border-rose-500/20"
  };
  return classes[status] ?? "bg-slate-500/15 text-slate-200 border border-slate-500/20";
}
