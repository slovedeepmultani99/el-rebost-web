import { NextRequest, NextResponse } from "next/server"

const SESSION_COOKIE =
  process.env.NODE_ENV === "production"
    ? "__Secure-authjs.session-token"
    : "authjs.session-token"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Pass pathname as header so server layouts can read it
  const reqHeaders = new Headers(req.headers)
  reqHeaders.set("x-pathname", pathname)

  if (pathname === "/admin/login") {
    return NextResponse.next({ request: { headers: reqHeaders } })
  }

  const hasSession = req.cookies.has(SESSION_COOKIE)
  if (!hasSession) {
    const loginUrl = new URL("/admin/login", req.url)
    loginUrl.searchParams.set("callbackUrl", req.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next({ request: { headers: reqHeaders } })
}

export const config = {
  matcher: ["/admin/:path*", "/imprimir/:path*"],
}
