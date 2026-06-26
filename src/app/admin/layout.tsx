import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import Sidebar from "@/components/admin/Sidebar"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const headersList = headers()
  const pathname = headersList.get("x-pathname") ?? ""

  // Login page renders without sidebar and without auth check
  if (pathname === "/admin/login") return <>{children}</>

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
      <Sidebar userName={user.name ?? "Admin"} userEmail={user.email ?? ""} />
      <main
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
