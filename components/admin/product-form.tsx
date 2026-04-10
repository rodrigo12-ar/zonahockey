"use client";

import { useState } from "react";
import type { Product } from "@/types";

type ProductFormProps = {
  initialData?: Partial<Product>;
  action: "create" | "edit";
  endpoint: string;
};

export function ProductForm({ initialData = {}, action, endpoint }: ProductFormProps) {
  const [form, setForm] = useState({
    name: initialData.name ?? "",
    slug: initialData.slug ?? "",
    category: initialData.category ?? "palos",
    price: initialData.price?.toString() ?? "",
    shortDescription: initialData.shortDescription ?? "",
    longDescription: initialData.longDescription ?? "",
    image: initialData.image ?? "",
    promotionText: initialData.promotionText ?? "",
    stock: initialData.stock?.toString() ?? "0",
    featured: initialData.featured ?? false
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleChange = (field: string, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!form.name.trim() || !form.price || !form.slug.trim()) {
      setStatus("error");
      setMessage("Por favor completa los campos requeridos: Nombre, Precio y Slug");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        featured: form.featured,
        promotionText: form.promotionText?.trim() ? form.promotionText : undefined
      };

      const response = await fetch(endpoint, {
        method: action === "create" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setStatus("success");
        setMessage(`Producto ${action === "create" ? "creado" : "actualizado"} con éxito.`);
        if (action === "create") {
          setForm({
            name: "",
            slug: "",
            category: "palos",
            price: "",
            shortDescription: "",
            longDescription: "",
            image: "",
            promotionText: "",
            stock: "0",
            featured: false
          });
        }
      } else {
        setStatus("error");
        setMessage("Hubo un error al guardar el producto.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Error de conexión: " + (error instanceof Error ? error.message : "desconocido"));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-white/10 bg-slate-950/85 p-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-300">
          Nombre <span className="text-danger">*</span>
          <input
            required
            value={form.name}
            onChange={(event) => handleChange("name", event.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/95 px-4 py-3 text-slate-100 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          Slug <span className="text-danger">*</span>
          <input
            required
            value={form.slug}
            onChange={(event) => handleChange("slug", event.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/95 px-4 py-3 text-slate-100 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </label>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-300">
          Categoría
          <select
            value={form.category}
            onChange={(event) => handleChange("category", event.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/95 px-4 py-3 text-slate-100 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          >
            <option value="palos">Palos</option>
            <option value="patines">Patines</option>
            <option value="bolsos">Bolsos</option>
            <option value="accesorios">Accesorios</option>
          </select>
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          Precio <span className="text-danger">*</span>
          <input
            required
            type="number"
            step="100"
            min="0"
            value={form.price}
            onChange={(event) => handleChange("price", event.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/95 px-4 py-3 text-slate-100 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </label>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-300">
          Stock
          <input
            type="number"
            min="0"
            value={form.stock}
            onChange={(event) => handleChange("stock", event.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/95 px-4 py-3 text-slate-100 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          Imagen (URL)
          <input
            type="url"
            value={form.image}
            onChange={(event) => handleChange("image", event.target.value)}
            placeholder="https://..."
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/95 px-4 py-3 text-slate-100 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </label>
      </div>
      <div className="space-y-2 text-sm text-slate-300">
        <label className="space-y-2 text-sm text-slate-300">
          Texto de promoción
          <input
            type="text"
            value={form.promotionText}
            onChange={(event) => handleChange("promotionText", event.target.value)}
            placeholder="Oferta, Promo de la semana, Últimas unidades"
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/95 px-4 py-3 text-slate-100 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </label>
      </div>
      <div className="space-y-4">
        <label className="space-y-2 text-sm text-slate-300">
          Descripción corta
          <input
            value={form.shortDescription}
            onChange={(event) => handleChange("shortDescription", event.target.value)}
            maxLength={120}
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/95 px-4 py-3 text-slate-100 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
          <span className="text-xs text-slate-400">
            {form.shortDescription.length}/120
          </span>
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          Descripción larga
          <textarea
            value={form.longDescription}
            onChange={(event) => handleChange("longDescription", event.target.value)}
            rows={5}
            maxLength={500}
            className="w-full rounded-3xl border border-slate-700 bg-slate-900/95 px-4 py-3 text-slate-100 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
          <span className="text-xs text-slate-400">
            {form.longDescription.length}/500
          </span>
        </label>
      </div>
      <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/5 p-4">
        <label className="inline-flex items-center gap-3 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(event) => handleChange("featured", event.target.checked)}
            className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-accent accent-accent"
          />
          Destacado en home
        </label>
      </div>
      {message && (
        <div
          className={`rounded-3xl p-4 text-sm ${
            status === "success"
              ? "border border-accent/20 bg-accent/10 text-accent"
              : "border border-danger/20 bg-danger/10 text-danger"
          }`}
        >
          {message}
        </div>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-accentDark disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
      >
        {status === "loading"
          ? "Guardando..."
          : action === "create"
          ? "Crear producto"
          : "Guardar cambios"}
      </button>
    </form>
  );
}
