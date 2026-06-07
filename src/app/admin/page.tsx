import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import AdminTopBar from "@/components/admin/AdminTopBar"
import Link from "next/link"

export default async function AdminDashboard() {
  const session = await auth()
  if (!session) redirect("/admin/login")

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const [reservasHoy, pendientes, confirmadas, totalMes] = await Promise.all([
    prisma.reservation.count({ where: { date: { gte: today, lt: tomorrow } } }),
    prisma.reservation.count({ where: { status: "pending" } }),
    prisma.reservation.count({ where: { date: { gte: today, lt: tomorrow }, status: "confirmed" } }),
    prisma.reservation.count({
      where: {
        date: { gte: new Date(today.getFullYear(), today.getMonth(), 1) },
        status: { not: "cancelled" },
      },
    }),
  ])

  const proximas = await prisma.reservation.findMany({
    where: { date: { gte: today }, status: { not: "cancelled" } },
    orderBy: [{ date: "asc" }, { time: "asc" }],
    take: 8,
  })

  const fmtDate = (d: Date) =>
    new Date(d).toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short" })

  const badgeStyle = (status: string): React.CSSProperties => ({
    fontSize: ".68rem",
    fontWeight: 700,
    padding: "2px 9px",
    borderRadius: 100,
    display: "inline-block",
    background:
      status === "confirmed"
        ? "rgba(78,98,54,.14)"
        : status === "pending"
        ? "rgba(188,146,85,.18)"
        : "rgba(200,85,43,.12)",
    color:
      status === "confirmed"
        ? "var(--olive, #4e6236)"
        : status === "pending"
        ? "#7a5c20"
        : "var(--ember)",
  })

  const statusLabel = { pending: "Pendiente", confirmed: "Confirmada", cancelled: "Cancelada" }

  const panel: React.CSSProperties = {
    background: "var(--bone, #FBF7EF)",
    border: "1px solid var(--line, #E4D9C8)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 18,
  }

  return (
    <>
      <AdminTopBar crumb="El Rebost · Backoffice" title="Dashboard" />

      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 22 }}>
          {[
            { lbl: "Reservas hoy", num: reservasHoy, small: "" },
            { lbl: "Pendientes de confirmar", num: pendientes, small: " ⚠️" },
            { lbl: "Confirmadas hoy", num: confirmadas, small: " ✓" },
            { lbl: "Este mes (no canceladas)", num: totalMes, small: "" },
          ].map((c) => (
            <div key={c.lbl} style={{ background: "var(--bone,#FBF7EF)", border: "1px solid var(--line,#E4D9C8)", borderRadius: 14, padding: "18px 20px" }}>
              <div style={{ fontSize: ".74rem", color: "var(--muted,#6A554F)", fontWeight: 600 }}>{c.lbl}</div>
              <div style={{ fontFamily: "var(--font-fraunces),serif", fontSize: "1.95rem", color: "var(--wine,#5C1A2B)", lineHeight: 1.1, marginTop: 3 }}>
                {c.num}
                {c.small && <small style={{ fontSize: ".9rem", color: "var(--ember)" }}>{c.small}</small>}
              </div>
            </div>
          ))}
        </div>

        {/* Próximas reservas */}
        <div style={panel}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <h3 style={{ fontFamily: "var(--font-fraunces),serif", fontWeight: 500, fontSize: "1.2rem" }}>
                Próximas reservas
              </h3>
              <p style={{ fontSize: ".82rem", color: "var(--muted)", marginTop: 2 }}>A partir de hoy</p>
            </div>
            <Link href="/admin/reservas" style={{ fontSize: ".84rem", fontWeight: 700, color: "var(--wine)", border: "1.5px solid var(--line)", borderRadius: 9, padding: ".4em .9em", textDecoration: "none" }}>
              Ver todas →
            </Link>
          </div>

          {proximas.length === 0 ? (
            <p style={{ color: "var(--muted)", fontSize: ".9rem" }}>No hay reservas próximas.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".88rem" }}>
              <thead>
                <tr>
                  {["Fecha", "Hora", "Nombre", "Pax", "Servicio", "Estado"].map((h) => (
                    <th key={h} style={{ textAlign: "left", fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted)", padding: "9px 10px", borderBottom: "2px solid var(--line)" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {proximas.map((r) => (
                  <tr key={r.id}>
                    <td style={{ padding: "10px", borderBottom: "1px solid var(--line)" }}>{fmtDate(r.date)}</td>
                    <td style={{ padding: "10px", borderBottom: "1px solid var(--line)", fontFamily: "var(--font-fraunces),serif" }}>{r.time}</td>
                    <td style={{ padding: "10px", borderBottom: "1px solid var(--line)", fontWeight: 600 }}>{r.name}</td>
                    <td style={{ padding: "10px", borderBottom: "1px solid var(--line)" }}>{r.guests}</td>
                    <td style={{ padding: "10px", borderBottom: "1px solid var(--line)", textTransform: "capitalize" }}>{r.service}</td>
                    <td style={{ padding: "10px", borderBottom: "1px solid var(--line)" }}>
                      <span style={badgeStyle(r.status)}>{statusLabel[r.status as keyof typeof statusLabel]}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Quick links */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {[
            { href: "/admin/menu", icon: "🍽", title: "Editar menú del día", desc: "Actualiza los platos de hoy" },
            { href: "/admin/carta", icon: "📋", title: "Gestionar carta", desc: "Platos, precios y disponibilidad" },
            { href: "/admin/reservas", icon: "📅", title: "Ver reservas", desc: "Confirmar y gestionar reservas" },
          ].map((item) => (
            <Link key={item.href} href={item.href} style={{ background: "var(--bone,#FBF7EF)", border: "1px solid var(--line,#E4D9C8)", borderRadius: 14, padding: "16px 18px", textDecoration: "none", display: "block" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: 6 }}>{item.icon}</div>
              <b style={{ fontFamily: "var(--font-fraunces),serif", display: "block", marginBottom: 3, color: "var(--wine)" }}>{item.title}</b>
              <span style={{ fontSize: ".82rem", color: "var(--muted)" }}>{item.desc}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
