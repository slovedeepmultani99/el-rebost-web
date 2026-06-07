import { auth } from "@/lib/auth"
import Sidebar from "@/components/admin/Sidebar"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  // Login page: render without shell
  if (!session) return <>{children}</>

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
