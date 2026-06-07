"use client"

import { useEffect, useState, useCallback } from "react"
import AdminTopBar from "@/components/admin/AdminTopBar"
import { useToast } from "@/components/admin/Toast"

interface Reservation {
  id: string; date: string; time: string; service: string; name: string
  phone: string; guests: number; notes: string | null; status: string; createdAt: string
}

const STATUS_LABELS: Record<string, string> = { pending: "Pendiente", confirmed: "Confirmada", cancelled: "Cancelada" }
const STATUS_NEXT: Record<string, string> = { pending: "confirmed", confirmed: "cancelled", cancelled: "pending" }

function badgeStyle(s: string): React.CSSProperties {
  return {
    fontSize: ".68rem", fontWeight: 700, padding: "2px 9px", borderRadius: 100, display: "inline-block", cursor: "pointer",
    background: s === "confirmed" ? "rgba(78,98,54,.14)" : s === "pending" ? "rgba(188,146,85,.18)" : "rgba(200,85,43,.12)",
    color: s === "confirmed" ? "var(--olive,#4e6236)" : s === "pending" ? "#7a5c20" : "var(--ember)",
  }
}

export default function ReservasAdminPage() {
  const [reservas, setReservas] = useState<Reservation[]>([])
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "cancelled">("all")
  const [dateFilter, setDateFilter] = useState("")
  const [loading, setLoading] = useState(true)
  const { toast, el: toastEl } = useToast()

  const load = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (filter !== "all") params.set("status", filter)
    if (dateFilter) params.set("date", dateFilter)
    const res = await fetch(`/api/reservas?${params}`)
    const data = await res.json()
    setReservas(Array.isArray(data) ? data : [])
    setLoading(false)
  }, [filter, dateFilter])

  useEffect(() => { load() }, [load])

  async function changeStatus(id: string, current: string) {
    const next = STATUS_NEXT[current]
    const res = await fetch(`/api/reservas/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: next }) })
    if (res.ok) {
      setReservas((p) => p.map((r) => r.id === id ? { ...r, status: next } : r))
      toast(`✓ Estado → ${STATUS_LABELS[next]}`)
    }
  }

  const fmtDate = (d: string) => new Date(d).toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short" })

  const inp: React.CSSProperties = { border: "1.5px solid var(--line,#E4D9C8)", borderRadius: 9, padding: ".45em .8em", background: "#fff", color: "var(--ink)", fontFamily: "inherit", fontSize: ".84rem" }
  const filterBtn = (f: typeof filter): React.CSSProperties => ({
    fontWeight: 700, fontSize: ".8rem", padding: ".42em .85em", borderRadius: 9, border: "1.5px solid",
    cursor: "pointer", transition: ".15s",
    borderColor: filter === f ? "var(--wine)" : "var(--line,#E4D9C8)",
    background: filter === f ? "var(--wine)" : "#fff",
    color: filter === f ? "#fff" : "var(--muted)",
  })

  return (
    <>
      <AdminTopBar crumb="Backoffice · Principal" title="Reservas" />

      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        {/* Filters */}
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 16 }}>
          <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} style={inp} />
          {(["all", "pending", "confirmed", "cancelled"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={filterBtn(f)}>
              {f === "all" ? "Todas" : STATUS_LABELS[f]}
            </button>
          ))}
          <button onClick={() => { setFilter("all"); setDateFilter("") }} style={{ ...filterBtn("all"), background: "none", borderColor: "transparent", color: "var(--muted)", fontSize: ".78rem" }}>
            Limpiar filtros
          </button>
          <span style={{ marginLeft: "auto", fontSize: ".8rem", color: "var(--muted)", fontWeight: 600 }}>
            {reservas.length} reserva{reservas.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div style={{ background: "var(--bone,#FBF7EF)", border: "1px solid var(--line,#E4D9C8)", borderRadius: 16, padding: 20 }}>
          {loading ? (
            <p style={{ color: "var(--muted)", textAlign: "center", padding: 20 }}>Cargando…</p>
          ) : reservas.length === 0 ? (
            <p style={{ color: "var(--muted)", textAlign: "center", padding: 20 }}>No hay reservas con estos filtros.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".88rem" }}>
              <thead>
                <tr>
                  {["Fecha", "Hora", "Servicio", "Nombre", "Tel.", "Pax", "Notas", "Estado"].map((h) => (
                    <th key={h} style={{ textAlign: "left", fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted)", padding: "9px 10px", borderBottom: "2px solid var(--line,#E4D9C8)" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reservas.map((r) => (
                  <tr key={r.id} style={{ opacity: r.status === "cancelled" ? 0.5 : 1 }}>
                    <td style={{ padding: "10px", borderBottom: "1px solid var(--line,#E4D9C8)" }}>{fmtDate(r.date)}</td>
                    <td style={{ padding: "10px", borderBottom: "1px solid var(--line,#E4D9C8)", fontFamily: "var(--font-fraunces),serif" }}>{r.time}</td>
                    <td style={{ padding: "10px", borderBottom: "1px solid var(--line,#E4D9C8)", textTransform: "capitalize" }}>{r.service}</td>
                    <td style={{ padding: "10px", borderBottom: "1px solid var(--line,#E4D9C8)", fontWeight: 600 }}>{r.name}</td>
                    <td style={{ padding: "10px", borderBottom: "1px solid var(--line,#E4D9C8)" }}>
                      <a href={`tel:${r.phone}`} style={{ color: "var(--wine)" }}>{r.phone}</a>
                    </td>
                    <td style={{ padding: "10px", borderBottom: "1px solid var(--line,#E4D9C8)", textAlign: "center" }}>{r.guests}</td>
                    <td style={{ padding: "10px", borderBottom: "1px solid var(--line,#E4D9C8)", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "var(--muted)", fontSize: ".82rem" }}>
                      {r.notes || "—"}
                    </td>
                    <td style={{ padding: "10px", borderBottom: "1px solid var(--line,#E4D9C8)" }}>
                      <span
                        onClick={() => changeStatus(r.id, r.status)}
                        style={badgeStyle(r.status)}
                        title="Clic para cambiar estado"
                      >
                        {STATUS_LABELS[r.status] ?? r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {toastEl}
    </>
  )
}
