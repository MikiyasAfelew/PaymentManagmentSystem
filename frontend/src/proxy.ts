import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DEMO_SESSION_KEY = "paymanager-demo-session";

// Routes that require authentication
const protectedRoutes = [
  "/dashboard",
  "/dashboard/transactions",
  "/dashboard/reconciliation",
  "/dashboard/imports",
  "/dashboard/discrepancies",
  "/dashboard/customers",
  "/dashboard/invoices",
  "/dashboard/reports",
  "/dashboard/notifications",
  "/dashboard/settings",
];

// Public routes that should redirect to dashboard if already authenticated
const authRoutes = ["/signin", "/signup"];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if user has demo session
  const sessionCookie = request.cookies.get(DEMO_SESSION_KEY);
  const isAuthenticated = !!sessionCookie;

  // Redirect protected routes to sign-in if not authenticated
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      // Store the original URL for redirect after sign-in
      const redirectUrl = new URL("/signin", request.url);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Redirect auth routes to dashboard if already authenticated
  if (authRoutes.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
