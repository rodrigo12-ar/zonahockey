"use client";

import { useState, type ChangeEvent } from "react";
import type { Order } from "@/types";
import { formatOrderStatus, getOrderStatusBadgeClass } from "@/lib/utils";

const statusOptions = [
  { value: "pendiente", label: "Pendiente" },
  { value: "entregado", label: "Entregado" },
  { value: "inconveniente", label: "Inconveniente" }
] as const;

type OrderStatusControlProps = {
  orderId: string;
  initialStatus: Order["status"];
};

export function OrderStatusControl({ orderId, initialStatus }: OrderStatusControlProps) {
  const [status, setStatus] = useState<Order["status"]>(initialStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as Order["status"];

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error("No se pudo actualizar el estado");
      }

      setStatus(newStatus);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getOrderStatusBadgeClass(status)}`}>
          {formatOrderStatus(status)}
        </span>
        <select
          value={status}
          onChange={handleChange}
          disabled={loading}
          className="rounded-2xl border border-white/10 bg-slate-900/95 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value} className="bg-slate-950 text-slate-100">
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error ? <p className="text-xs text-danger">{error}</p> : null}
    </div>
  );
}
