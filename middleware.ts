import { jwtVerify } from "jose"
import { type NextRequest, NextResponse } from "next/server"

const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith("/admin")) return NextResponse.next()
  if (pathname === "/admin/login") return NextResponse.next()

  const token = request.cookies.get("auth-token")?.value
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  try {
    const { payload } = await jwtVerify(token, secret)
    if (payload.role !== "admin") {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
    return NextResponse.next()
  } catch (error) {
    console.error("JWT verification failed:", error)
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }
}

export const config = {
  matcher: ["/admin/:path*"],
}
