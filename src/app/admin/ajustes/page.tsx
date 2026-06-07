import AdminTopBar from "@/components/admin/AdminTopBar"
import { auth } from "@/lib/auth"

export default async function AjustesPage() {
  const session = await auth()
  const user = session?.user as { name?: string; email?: string; role?: string } | undefined

  return (
    <>
      <AdminTopBar crumb="Backoffice · Sistema" title="Ajustes" />
      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        <div style={{ background: "var(--bone,#FBF7EF)", border: "1px solid var(--line,#E4D9C8)", borderRadius: 16, padding: 20, maxWidth: 480 }}>
          <h3 style={{ fontFamily: "var(--font-fraunces),serif", fontWeight: 500, fontSize: "1.2rem", marginBottom: 16 }}>
            Tu cuenta
          </h3>
          <div style={{ display: "grid", gap: 10, fontSize: ".9rem" }}>
            <div><span style={{ color: "var(--muted)", fontWeight: 600, fontSize: ".72rem", textTransform: "uppercase", letterSpacing: ".1em" }}>Nombre</span><p style={{ marginTop: 4 }}>{user?.name}</p></div>
            <div><span style={{ color: "var(--muted)", fontWeight: 600, fontSize: ".72rem", textTransform: "uppercase", letterSpacing: ".1em" }}>Email</span><p style={{ marginTop: 4 }}>{user?.email}</p></div>
            <div><span style={{ color: "var(--muted)", fontWeight: 600, fontSize: ".72rem", textTransform: "uppercase", letterSpacing: ".1em" }}>Rol</span><p style={{ marginTop: 4, textTransform: "capitalize" }}>{user?.role}</p></div>
          </div>
          <p style={{ marginTop: 20, fontSize: ".82rem", color: "var(--muted)" }}>
            Para cambiar la contraseña, contacta con el administrador del sistema.
          </p>
        </div>
      </div>
    </>
  )
}
