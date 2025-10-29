import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// 1. Specify protected and public routes
// const protectedRoutes = ["/dashboard", "/moderator"];
const authRoutes = ["/login", "register"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  //   const isProtectedRoute = protectedRoutes.includes(path);
  const isAuthRoutes = authRoutes.includes(path);
  const isDashboardRoute = path.startsWith("/dashboard");
  const isCheckoutRoute = path.startsWith("/checkout");

  // 3. Decrypt the session from the cookie
  const token = (await cookies()).get("token")?.value;
  if (isDashboardRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  if (isCheckoutRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  if (token && isAuthRoutes) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
