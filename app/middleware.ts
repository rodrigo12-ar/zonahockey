import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession, AUTH_COOKIE_NAME } from "@/lib/auth";

const ADMIN_PATH = "/admin";
const LOGIN_PATH = "/login";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith(ADMIN_PATH)) {
    const cookieValue = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    const session = getSession(cookieValue);

    if (!session) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = LOGIN_PATH;
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname === LOGIN_PATH) {
    const cookieValue = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    const session = getSession(cookieValue);
    if (session) {
      return NextResponse.redirect(new URL(ADMIN_PATH, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"]
};
