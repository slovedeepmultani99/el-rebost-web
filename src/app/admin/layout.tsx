import type { Metadata } from "next"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Sidebar from "@/components/admin/Sidebar"

export const metadata: Metadata = {
  title: "El Rebost — Backoffice",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Rebost Admin",
  },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect("/admin/login")

  const user = session.user as { name?: string | null; email?: string | null; role?: string }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "#EDE5D8",
        color: "var(--ink)",
        fontFamily: "var(--font-karla), sans-serif",
      }}
    >
      <link rel="manifest" href="/admin-manifest.json" />
      <link rel="apple-touch-icon" href="/logo.png" />
      <Sidebar userName={user.name ?? "Admin"} userEmail={user.email ?? ""} />
      <main
        className="admin-main"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        {children}
      </main>
    </div>
  )
}
