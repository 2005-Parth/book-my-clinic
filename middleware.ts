import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Skip middleware for static files and API routes
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.startsWith("/api") ||
    req.nextUrl.pathname.includes(".")
  ) {
    return res
  }

  try {
    const supabase = createMiddlewareClient({ req, res })
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Protected routes that require authentication
    const protectedRoutes = ["/booking", "/my-bookings", "/booking-success"]
    const isProtectedRoute = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))

    // Redirect to login if accessing protected route without session
    if (isProtectedRoute && !session) {
      const redirectUrl = new URL("/login", req.url)
      return NextResponse.redirect(redirectUrl)
    }

    // Redirect to booking if logged in user tries to access login
    if (req.nextUrl.pathname === "/login" && session) {
      const redirectUrl = new URL("/booking", req.url)
      return NextResponse.redirect(redirectUrl)
    }

    return res
  } catch (error) {
    // If there's an error with Supabase, just continue
    return res
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
