import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL("/login", request.url);
  const response = NextResponse.redirect(url);
  response.cookies.set({
    name: "zona_admin_session",
    value: "",
    path: "/",
    maxAge: 0,
    expires: new Date(0)
  });
  return response;
}
