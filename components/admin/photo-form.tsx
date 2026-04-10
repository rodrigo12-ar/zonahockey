"use client";

import { useState } from "react";
import type { PhotoProduct } from "@/types";

type PhotoFormProps = {
  initialData?: Partial<PhotoProduct>;
  action: "create" | "edit";
  endpoint: string;
};

type PhotoFormState = {
  name: string;
  slug: string;
  type: "individual" | "pack";
  team: string;
  date: string;
  price: string;
  shortDescription: string;
  longDescription: string;
  imagePreview: string;
  imageOriginal: string;
  stock: string;
  featured: boolean;
};

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("No se pudo leer el archivo"));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

export function PhotoForm({ initialData = {}, action, endpoint }: PhotoFormProps) {
  const [form, setForm] = useState<PhotoFormState>({
    name: initialData.name ?? "",
    slug: initialData.slug ?? "",
    type: initialData.type ?? "individual",
    team: initialData.team ?? "",
    date: initialData.date ?? "",
    price: initialData.price?.toString() ?? "",
    shortDescription: initialData.shortDescription ?? "",
    longDescription: initialData.longDescription ?? "",
    imagePreview: initialData.imagePreview ?? initialData.image ?? "",
    imageOriginal: initialData.imageOriginal ?? initialData.image ?? "",
    stock: initialData.stock?.toString() ?? "0",
    featured: initialData.featured ?? false
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleChange = (field: keyof PhotoFormState, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleFileChange = async (field: "imagePreview" | "imageOriginal", file?: File) => {
    if (!file) return;

    try {
      const dataUrl = await readFileAsDataUrl(file);
      setForm((current) => ({ ...current, [field]: dataUrl }));
    } catch {
      setStatus("error");
      setMessage("No se pudo cargar el archivo de imagen.");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim() || !form.slug.trim() || !form.price || !form.team.trim() || !form.imagePreview || !form.imageOriginal) {
      setStatus("error");
      setMessage("Completa los campos requeridos: Nombre, Slug, Precio, Equipo, Imagen previa e Imagen original.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const payload = {
        ...form,
        category: "fotografias",
        price: Number(form.price),
        stock: Number(form.stock),
        featured: form.featured
      };

      const response = await fetch(endpoint, {
        method: action === "create" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setStatus("success");
        setMessage(`Fotografía ${action === "create" ? "creada" : "actualizada"} con éxito.`);

        if (action === "create") {
          setForm({
            name: "",
            slug: "",
            type: "individual",
            team: "",
            date: "",
            price: "",
            shortDescription: "",
            longDescription: "",
            imagePreview: "",
            imageOriginal: "",
            stock: "0",
            featured: false
          });
        }
      } else {
        setStatus("error");
        setMessage("Hubo un error al guardar la fotografía.");
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
          Tipo
          <select
            value={form.type}
            onChange={(event) => handleChange("type", event.target.value as "individual" | "pack")}
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/95 px-4 py-3 text-slate-100 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          >
            <option value="individual">Individual</option>
            <option value="pack">Pack</option>
          </select>
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          Equipo <span className="text-danger">*</span>
          <input
            required
            value={form.team}
            onChange={(event) => handleChange("team", event.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/95 px-4 py-3 text-slate-100 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-300">
          Fecha
          <input
            type="date"
            value={form.date}
            onChange={(event) => handleChange("date", event.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/95 px-4 py-3 text-slate-100 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
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

      <div className="grid gap-6 lg:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-300">
          Imagen previa <span className="text-danger">*</span>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => handleFileChange("imagePreview", event.target.files?.[0])}
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/95 px-4 py-3 text-slate-100 outline-none file:cursor-pointer file:border-0 file:bg-slate-800 file:text-slate-100"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          Imagen original <span className="text-danger">*</span>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => handleFileChange("imageOriginal", event.target.files?.[0])}
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/95 px-4 py-3 text-slate-100 outline-none file:cursor-pointer file:border-0 file:bg-slate-800 file:text-slate-100"
          />
        </label>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3 rounded-3xl border border-white/10 bg-slate-900/80 p-4">
          <p className="text-sm uppercase tracking-[0.24em] text-accent/80">Previa</p>
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80">
            <img
              src={form.imagePreview || "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80"}
              alt="Vista previa con marca de agua"
              draggable={false}
              className="h-56 w-full object-cover"
            />
          </div>
          <p className="text-xs text-slate-400">Esta imagen será la vista pública con marca de agua.</p>
        </div>
        <div className="space-y-3 rounded-3xl border border-white/10 bg-slate-900/80 p-4">
          <p className="text-sm uppercase tracking-[0.24em] text-accent/80">Original</p>
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80">
            <img
              src={form.imageOriginal || "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80"}
              alt="Imagen original sin marca de agua"
              draggable={false}
              className="h-56 w-full object-cover opacity-90"
            />
          </div>
          <p className="text-xs text-slate-400">Esta imagen es la versión original pensada para entrega post-compra.</p>
        </div>
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
          <span className="text-xs text-slate-400">{form.shortDescription.length}/120</span>
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
          <span className="text-xs text-slate-400">{form.longDescription.length}/500</span>
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
        {status === "loading" ? "Guardando..." : action === "create" ? "Crear fotografía" : "Guardar cambios"}
      </button>
    </form>
  );
}
