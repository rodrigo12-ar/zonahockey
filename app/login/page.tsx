"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const redirectTo = "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    setLoading(false);

    if (response.ok) {
      router.push(redirectTo);
    } else {
      const data = await response.json();
      setError(data?.error ?? "No se pudo iniciar sesión.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-slate-100">
      <main className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-4 py-14 sm:px-6 lg:px-8">
        <div className="w-full rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-soft sm:p-12">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.32em] text-accent/80">Acceso admin</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">Iniciar sesión</h1>
            <p className="mt-2 text-slate-300">Ingresá con tu usuario y contraseña para acceder al panel de administración.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <label className="space-y-3 text-sm text-slate-300">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full rounded-3xl border border-slate-700 bg-slate-900/95 px-4 py-3 text-slate-100 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </label>
            <label className="space-y-3 text-sm text-slate-300">
              <span>Contraseña</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full rounded-3xl border border-slate-700 bg-slate-900/95 px-4 py-3 text-slate-100 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </label>

            {error ? <p className="rounded-3xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</p> : null}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-accentDark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Validando..." : "Ingresar"}
            </button>
          </form>

          <p className="mt-8 text-sm text-slate-500">
            Para probar el acceso admin local usa el usuario configurado en <span className="font-semibold">.env.local</span>.
          </p>
          <Link href="/" className="mt-4 inline-block text-sm text-accent hover:text-accentDark">
            Volver al inicio
          </Link>
        </div>
      </main>
    </div>
  );
}
