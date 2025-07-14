import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protected routes
  const protectedRoutes = ["/booking", "/my-bookings", "/booking-success"]
  const isProtectedRoute = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))

  // Redirect to login if accessing protected route without session
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Redirect to booking if logged in user tries to access login
  if (req.nextUrl.pathname === "/login" && session) {
    return NextResponse.redirect(new URL("/booking", req.url))
  }

  return res
}

export const config = {
  matcher: ["/booking/:path*", "/my-bookings/:path*", "/booking-success/:path*", "/login"],
}
