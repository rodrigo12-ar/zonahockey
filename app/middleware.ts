import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { isAllowedAdminEmail } from "@/lib/admin";

const ADMIN_PATH = "/admin";
const ADMIN_API_PATH = "/api/admin";
const LOGIN_PATH = "/login";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let response = NextResponse.next({
    request: {
      headers: request.headers
    }
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers
            }
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options) {
          request.cookies.set({ name, value: "", ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers
            }
          });
          response.cookies.set({ name, value: "", ...options });
        }
      }
    }
  );

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const isAdminUser = isAllowedAdminEmail(user?.email);
  const wantsAdminPage = pathname.startsWith(ADMIN_PATH);
  const wantsAdminApi = pathname.startsWith(ADMIN_API_PATH);

  if (wantsAdminPage || wantsAdminApi) {
    if (!user || !isAdminUser) {
      if (wantsAdminApi) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
      }

      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = LOGIN_PATH;
      loginUrl.searchParams.set("redirect", pathname);
      if (user && !isAdminUser) {
        loginUrl.searchParams.set("reason", "unauthorized");
      }
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname === LOGIN_PATH && user && isAdminUser) {
    return NextResponse.redirect(new URL(ADMIN_PATH, request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/login"]
};
