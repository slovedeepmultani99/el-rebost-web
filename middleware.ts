import { NextRequest, NextResponse } from "next/server"

const SESSION_COOKIE =
  process.env.NODE_ENV === "production"
    ? "__Secure-authjs.session-token"
    : "authjs.session-token"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Login page is outside the admin layout — always allow
  if (pathname === "/admin/login") return NextResponse.next()

  const hasSession = req.cookies.has(SESSION_COOKIE)
  if (!hasSession) {
    const loginUrl = new URL("/admin/login", req.url)
    loginUrl.searchParams.set("callbackUrl", req.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/imprimir/:path*"],
}
