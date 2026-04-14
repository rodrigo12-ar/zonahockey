import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/components/admin/login-form";

function LoginFallback() {
  return (
    <div className="min-h-screen bg-background text-slate-100">
      <main className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-4 py-14 sm:px-6 lg:px-8">
        <div className="w-full rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-soft sm:p-12">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.32em] text-accent/80">Acceso admin</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">Iniciar sesion</h1>
            <p className="mt-2 text-slate-300">Preparando acceso al panel de administracion.</p>
          </div>
          <div className="h-48 animate-pulse rounded-3xl bg-white/5" />
          <Link href="/" className="mt-6 inline-block text-sm text-accent hover:text-accentDark">
            Volver al inicio
          </Link>
        </div>
      </main>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
}
