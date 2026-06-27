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

  function waConfirmUrl(r: Reservation) {
    const fecha = new Date(r.date).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })
    const servicio = r.service === "cena" ? "cena" : "comida"
    const msg = `Hola ${r.name}, le confirmamos su reserva en El Rebost de Montigalà para el ${fecha} a las ${r.time} (${servicio}) para ${r.guests} persona${r.guests !== 1 ? "s" : ""}. ¡Hasta pronto! 🍽`
    const phone = r.phone.replace(/\D/g, "").replace(/^0/, "").replace(/^(?!34)/, "34")
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
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
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <a href={`tel:${r.phone}`} style={{ color: "var(--wine)" }}>{r.phone}</a>
                        <a
                          href={waConfirmUrl(r)}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Confirmar por WhatsApp"
                          style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, borderRadius: "50%", background: "#15803d", color: "#fff", flexShrink: 0, textDecoration: "none", fontSize: ".75rem" }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        </a>
                      </div>
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
