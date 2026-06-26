import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoginPage = pathname === "/admin/login"

  if (!req.auth && !isLoginPage) {
    const loginUrl = new URL("/admin/login", req.url)
    loginUrl.searchParams.set("callbackUrl", req.url)
    return NextResponse.redirect(loginUrl)
  }
})

export const config = {
  matcher: ["/admin/:path*", "/imprimir/:path*"],
}
