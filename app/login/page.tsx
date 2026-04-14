"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/admin";
  const unauthorizedReason = searchParams.get("reason") === "unauthorized";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message || "No se pudo iniciar sesion.");
      return;
    }

    router.push(redirectTo);
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background text-slate-100">
      <main className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-4 py-14 sm:px-6 lg:px-8">
        <div className="w-full rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-soft sm:p-12">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.32em] text-accent/80">Acceso admin</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">Iniciar sesion</h1>
            <p className="mt-2 text-slate-300">
              Ingresa con tu usuario de Supabase para acceder al panel de administracion.
            </p>
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
              <span>Contrasena</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full rounded-3xl border border-slate-700 bg-slate-900/95 px-4 py-3 text-slate-100 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </label>

            {error || unauthorizedReason ? (
              <p className="rounded-3xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
                {error || "Tu usuario existe en Supabase, pero no esta habilitado como admin."}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-accentDark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Validando..." : "Ingresar"}
            </button>
          </form>

          <p className="mt-8 text-sm text-slate-500">
            Solo pueden entrar los emails configurados como admin en <span className="font-semibold">.env.local</span>.
          </p>
          <Link href="/" className="mt-4 inline-block text-sm text-accent hover:text-accentDark">
            Volver al inicio
          </Link>
        </div>
      </main>
    </div>
  );
}
