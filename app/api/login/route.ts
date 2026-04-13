import { NextResponse } from "next/server";
import { createSessionToken, verifyAdminCredentials, AUTH_COOKIE_NAME, SESSION_MAX_AGE } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");

  const user = verifyAdminCredentials(email, password);

  if (!user) {
    return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
  }

  const token = createSessionToken(user.email, user.name);
  const response = NextResponse.json({ ok: true, redirect: "/admin" });

  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: SESSION_MAX_AGE,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  });

  return response;
}
