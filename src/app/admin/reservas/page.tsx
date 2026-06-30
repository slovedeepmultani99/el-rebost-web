"use client"

import { useEffect, useState, useCallback } from "react"
import AdminTopBar from "@/components/admin/AdminTopBar"
import { useToast } from "@/components/admin/Toast"

interface Reservation {
  id: string; date: string; time: string; service: string; name: string
  phone: string; guests: number; notes: string | null; status: string; createdAt: string
}

const STATUS_LABELS: Record<string, string> = { pending: "Pendiente", confirmed: "Confirmada", cancelled: "Cancelada" }
const STATUS_NEXT:   Record<string, string> = { pending: "confirmed", confirmed: "cancelled", cancelled: "pending" }
const LUNCH_SLOTS  = ["13:00", "13:30", "14:00", "14:30", "15:00", "15:30"]
const DINNER_SLOTS = ["19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"]

type View = "hoy" | "manana" | "semana" | "pendientes" | "confirmadas" | "canceladas" | "todas" | "fecha"

const VIEWS: { id: View; label: string; icon: string }[] = [
  { id: "hoy",         label: "Hoy",         icon: "📅" },
  { id: "manana",      label: "Mañana",       icon: "🌅" },
  { id: "semana",      label: "Esta semana",  icon: "📆" },
  { id: "pendientes",  label: "Pendientes",   icon: "⏳" },
  { id: "confirmadas", label: "Confirmadas",  icon: "✅" },
  { id: "canceladas",  label: "Canceladas",   icon: "🗑" },
  { id: "todas",       label: "Todas",        icon: "📋" },
  { id: "fecha",       label: "Fecha",        icon: "🗓" },
]

function todayStr() { return new Date().toLocaleDateString("sv") }
function tomorrowStr() {
  const d = new Date(); d.setDate(d.getDate() + 1); return d.toLocaleDateString("sv")
}
function weekRange(): { from: string; to: string } {
  const now = new Date()
  const day = now.getDay()
  const mon = new Date(now); mon.setDate(now.getDate() - ((day + 6) % 7))
  const sun = new Date(mon); sun.setDate(mon.getDate() + 6)
  return { from: mon.toLocaleDateString("sv"), to: sun.toLocaleDateString("sv") }
}

function buildParams(view: View, customDate: string): string {
  const p = new URLSearchParams()
  switch (view) {
    case "hoy":         p.set("date", todayStr()); p.set("status", "active"); break
    case "manana":      p.set("date", tomorrowStr()); p.set("status", "active"); break
    case "semana":      { const { from, to } = weekRange(); p.set("dateFrom", from); p.set("dateTo", to); p.set("status", "active"); break }
    case "pendientes":  p.set("status", "pending"); break
    case "confirmadas": p.set("status", "confirmed"); break
    case "canceladas":  p.set("status", "cancelled"); break
    case "todas":       break
    case "fecha":       if (customDate) p.set("date", customDate); break
  }
  return p.toString() ? `?${p}` : ""
}

function badgeStyle(s: string): React.CSSProperties {
  return {
    fontSize: ".68rem", fontWeight: 700, padding: "3px 10px", borderRadius: 100,
    display: "inline-block", cursor: "pointer", userSelect: "none",
    background: s === "confirmed" ? "rgba(78,98,54,.14)" : s === "pending" ? "rgba(188,146,85,.18)" : "rgba(200,85,43,.12)",
    color: s === "confirmed" ? "var(--olive,#4e6236)" : s === "pending" ? "#7a5c20" : "var(--ember)",
  }
}

function WaIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function waUrl(r: Reservation) {
  const fecha = new Date(r.date).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })
  const msg = `Hola ${r.name}, le confirmamos su reserva en El Rebost de Montigalà para el ${fecha} a las ${r.time} (${r.service}) para ${r.guests} persona${r.guests !== 1 ? "s" : ""}. ¡Hasta pronto! 🍽`
  const phone = r.phone.replace(/\D/g, "").replace(/^0/, "").replace(/^(?!34)/, "34")
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
}

const fmtDate = (d: string) => new Date(d).toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short" })
const inp: React.CSSProperties = { border: "1.5px solid var(--line,#E4D9C8)", borderRadius: 9, padding: ".5em .8em", background: "#fff", color: "var(--ink)", fontFamily: "inherit", fontSize: ".9rem", width: "100%" }

export default function ReservasAdminPage() {
  const [reservas, setReservas]     = useState<Reservation[]>([])
  const [view, setView]             = useState<View>("hoy")
  const [customDate, setCustomDate] = useState("")
  const [loading, setLoading]       = useState(true)
  const [editId, setEditId]         = useState<string | null>(null)
  const [editForm, setEditForm]     = useState<Partial<Reservation & { date: string }>>({})
  const [saving, setSaving]         = useState(false)
  const { toast, el: toastEl }      = useToast()

  const load = useCallback(async () => {
    setLoading(true)
    const params = buildParams(view, customDate)
    const res = await fetch(`/api/reservas${params}`)
    const data = await res.json()
    setReservas(Array.isArray(data) ? data : [])
    setLoading(false)
  }, [view, customDate])

  useEffect(() => { load() }, [load])

  // Change status with one click
  async function changeStatus(id: string, current: string) {
    const next = STATUS_NEXT[current]
    const res = await fetch(`/api/reservas/${id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    })
    if (res.ok) {
      setReservas(p => p.map(r => r.id === id ? { ...r, status: next } : r))
      toast(`✓ Estado → ${STATUS_LABELS[next]}`)
    }
  }

  // Open edit drawer
  function openEdit(r: Reservation) {
    setEditForm({
      name: r.name, phone: r.phone,
      date: new Date(r.date).toLocaleDateString("sv"),
      time: r.time, service: r.service,
      guests: r.guests, notes: r.notes ?? "", status: r.status,
    })
    setEditId(r.id)
  }

  // Save edit
  async function saveEdit() {
    if (!editId) return
    setSaving(true)
    const res = await fetch(`/api/reservas/${editId}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    })
    if (res.ok) {
      const updated = await res.json()
      setReservas(p => p.map(r => r.id === editId ? updated : r))
      toast("✓ Reserva actualizada")
      setEditId(null)
    } else {
      toast("Error al guardar", "error")
    }
    setSaving(false)
  }

  // Delete reservation
  async function deleteReserva(id: string) {
    if (!confirm("¿Eliminar esta reserva definitivamente?")) return
    const res = await fetch(`/api/reservas/${id}`, { method: "DELETE" })
    if (res.ok) {
      setReservas(p => p.filter(r => r.id !== id))
      toast("Reserva eliminada")
    }
  }

  const slots = editForm.service === "cena" ? DINNER_SLOTS : LUNCH_SLOTS
  const viewBtn = (v: View): React.CSSProperties => ({
    display: "inline-flex", alignItems: "center", gap: 5, fontWeight: 700, fontSize: ".78rem",
    padding: ".38em .75em", borderRadius: 8, border: "1.5px solid", cursor: "pointer", transition: ".15s",
    whiteSpace: "nowrap",
    borderColor: view === v ? "var(--wine)" : "var(--line,#E4D9C8)",
    background: view === v ? "var(--wine)" : "#fff",
    color: view === v ? "#fff" : "var(--muted)",
  })

  return (
    <>
      <AdminTopBar crumb="Backoffice · Principal" title="Reservas">
        <span style={{ fontSize: ".82rem", color: "var(--muted)", fontWeight: 600 }}>
          {reservas.length} reserva{reservas.length !== 1 ? "s" : ""}
        </span>
      </AdminTopBar>

      <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>

        {/* ── View tabs ── */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
          {VIEWS.map(v => (
            <button key={v.id} onClick={() => setView(v.id)} style={viewBtn(v.id)}>
              <span>{v.icon}</span>{v.label}
            </button>
          ))}
        </div>

        {/* Date picker only in "fecha" view */}
        {view === "fecha" && (
          <div style={{ marginBottom: 14 }}>
            <input type="date" value={customDate} onChange={e => setCustomDate(e.target.value)}
              style={{ ...inp, width: "auto" }} />
          </div>
        )}

        {/* ── Content ── */}
        {loading ? (
          <p style={{ color: "var(--muted)", textAlign: "center", padding: 40 }}>Cargando…</p>
        ) : reservas.length === 0 ? (
          <div style={{ textAlign: "center", padding: 48, color: "var(--muted)" }}>
            <p style={{ fontSize: "2rem", marginBottom: 8 }}>📭</p>
            <p style={{ fontWeight: 600 }}>No hay reservas para esta vista</p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="res-table-wrap" style={{ background: "var(--bone,#FBF7EF)", border: "1px solid var(--line,#E4D9C8)", borderRadius: 16, padding: 20 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".87rem" }}>
                <thead>
                  <tr>
                    {["Fecha", "Hora", "Serv.", "Nombre", "Tel.", "Pax", "Notas", "Estado", ""].map(h => (
                      <th key={h} style={{ textAlign: "left", fontSize: ".65rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted)", padding: "8px 10px", borderBottom: "2px solid var(--line,#E4D9C8)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reservas.map(r => (
                    <tr key={r.id} style={{ opacity: r.status === "cancelled" ? 0.5 : 1 }}>
                      <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line,#E4D9C8)" }}>{fmtDate(r.date)}</td>
                      <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line,#E4D9C8)", fontFamily: "var(--font-fraunces),serif" }}>{r.time}</td>
                      <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line,#E4D9C8)", textTransform: "capitalize", fontSize: ".8rem" }}>{r.service}</td>
                      <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line,#E4D9C8)", fontWeight: 600 }}>{r.name}</td>
                      <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line,#E4D9C8)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                          <a href={`tel:${r.phone}`} style={{ color: "var(--wine)" }}>{r.phone}</a>
                          <a href={waUrl(r)} target="_blank" rel="noopener noreferrer"
                            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, borderRadius: "50%", background: "#15803d", color: "#fff", textDecoration: "none" }}>
                            <WaIcon />
                          </a>
                        </div>
                      </td>
                      <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line,#E4D9C8)", textAlign: "center" }}>{r.guests}</td>
                      <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line,#E4D9C8)", maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "var(--muted)", fontSize: ".8rem" }}>{r.notes || "—"}</td>
                      <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line,#E4D9C8)" }}>
                        <span onClick={() => changeStatus(r.id, r.status)} style={badgeStyle(r.status)}>{STATUS_LABELS[r.status] ?? r.status}</span>
                      </td>
                      <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line,#E4D9C8)" }}>
                        <div style={{ display: "flex", gap: 4 }}>
                          <button onClick={() => openEdit(r)} title="Editar" style={{ background: "none", border: "1px solid var(--line,#E4D9C8)", borderRadius: 6, cursor: "pointer", padding: "3px 7px", fontSize: ".8rem" }}>✏️</button>
                          {r.status === "cancelled" && (
                            <button onClick={() => deleteReserva(r.id)} title="Eliminar" style={{ background: "none", border: "1px solid rgba(200,85,43,.3)", borderRadius: 6, cursor: "pointer", padding: "3px 7px", fontSize: ".8rem", color: "var(--ember)" }}>🗑</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="res-cards-wrap">
              {reservas.map(r => (
                <div key={r.id} style={{
                  background: "var(--bone,#FBF7EF)", border: "1px solid var(--line,#E4D9C8)",
                  borderRadius: 14, padding: 16, marginBottom: 10,
                  opacity: r.status === "cancelled" ? 0.55 : 1,
                  borderLeft: `4px solid ${r.status === "confirmed" ? "#4e6236" : r.status === "cancelled" ? "var(--ember)" : "#BC9255"}`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: "1.05rem", fontFamily: "var(--font-fraunces),serif" }}>{r.name}</p>
                      <p style={{ fontSize: ".82rem", color: "var(--muted)", marginTop: 1 }}>{r.guests} personas · {r.service}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                      <span onClick={() => changeStatus(r.id, r.status)} style={{ ...badgeStyle(r.status), fontSize: ".72rem" }}>{STATUS_LABELS[r.status] ?? r.status}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <span>📅</span>
                    <span style={{ fontWeight: 600, fontSize: ".95rem" }}>{fmtDate(r.date)}</span>
                    <span style={{ fontFamily: "var(--font-fraunces),serif", fontWeight: 500, fontSize: "1rem", color: "var(--wine)" }}>{r.time}</span>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <a href={`tel:${r.phone}`} style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--wine)", color: "#fff", borderRadius: 8, padding: "7px 12px", fontWeight: 700, fontSize: ".82rem", textDecoration: "none" }}>
                      📞 {r.phone}
                    </a>
                    <a href={waUrl(r)} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, background: "#15803d", color: "#fff", borderRadius: 8, padding: "7px 12px", fontWeight: 700, fontSize: ".82rem", textDecoration: "none" }}>
                      <WaIcon /> Confirmar
                    </a>
                    <button onClick={() => openEdit(r)} style={{ display: "flex", alignItems: "center", gap: 5, background: "var(--bone,#FBF7EF)", border: "1.5px solid var(--line,#E4D9C8)", borderRadius: 8, padding: "7px 12px", fontWeight: 700, fontSize: ".82rem", cursor: "pointer" }}>
                      ✏️ Editar
                    </button>
                    {r.status === "cancelled" && (
                      <button onClick={() => deleteReserva(r.id)} style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(200,85,43,.08)", border: "1.5px solid rgba(200,85,43,.3)", borderRadius: 8, padding: "7px 12px", fontWeight: 700, fontSize: ".82rem", cursor: "pointer", color: "var(--ember)" }}>
                        🗑 Eliminar
                      </button>
                    )}
                  </div>
                  {r.notes && <p style={{ fontSize: ".82rem", color: "var(--muted)", fontStyle: "italic", marginTop: 8, paddingTop: 8, borderTop: "1px solid var(--line,#E4D9C8)" }}>💬 {r.notes}</p>}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Edit drawer ── */}
      {editId && (
        <div onClick={() => setEditId(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.45)", zIndex: 800, backdropFilter: "blur(2px)", display: "flex", alignItems: "flex-end" }}>
          <div onClick={e => e.stopPropagation()} style={{
            width: "100%", maxWidth: 560, margin: "0 auto",
            background: "#fff", borderRadius: "20px 20px 0 0", padding: "8px 0 24px",
            maxHeight: "92vh", overflowY: "auto",
          }}>
            {/* Handle */}
            <div style={{ width: 40, height: 4, borderRadius: 2, background: "#E4D9C8", margin: "10px auto 18px" }} />
            <div style={{ padding: "0 22px" }}>
              <h3 style={{ fontFamily: "var(--font-fraunces),serif", fontSize: "1.25rem", fontWeight: 500, marginBottom: 20 }}>Editar reserva</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <div>
                  <label style={{ display: "block", fontSize: ".7rem", fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 4 }}>Nombre</label>
                  <input value={editForm.name ?? ""} onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))} style={inp} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: ".7rem", fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 4 }}>Teléfono</label>
                  <input value={editForm.phone ?? ""} onChange={e => setEditForm(p => ({ ...p, phone: e.target.value }))} style={inp} type="tel" />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: ".7rem", fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 4 }}>Fecha</label>
                  <input type="date" value={editForm.date ?? ""} onChange={e => setEditForm(p => ({ ...p, date: e.target.value, time: "" }))} style={inp} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: ".7rem", fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 4 }}>Personas</label>
                  <input type="number" min={1} max={40} value={editForm.guests ?? ""} onChange={e => setEditForm(p => ({ ...p, guests: Number(e.target.value) }))} style={inp} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: ".7rem", fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 4 }}>Servicio</label>
                  <select value={editForm.service ?? "comida"} onChange={e => setEditForm(p => ({ ...p, service: e.target.value, time: "" }))} style={inp}>
                    <option value="comida">Comida</option>
                    <option value="cena">Cena</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: ".7rem", fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 4 }}>Hora</label>
                  <select value={editForm.time ?? ""} onChange={e => setEditForm(p => ({ ...p, time: e.target.value }))} style={inp}>
                    <option value="">— Selecciona —</option>
                    {slots.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: "block", fontSize: ".7rem", fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 4 }}>Estado</label>
                <select value={editForm.status ?? "pending"} onChange={e => setEditForm(p => ({ ...p, status: e.target.value }))} style={inp}>
                  <option value="pending">Pendiente</option>
                  <option value="confirmed">Confirmada</option>
                  <option value="cancelled">Cancelada</option>
                </select>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: ".7rem", fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 4 }}>Notas</label>
                <textarea value={editForm.notes ?? ""} onChange={e => setEditForm(p => ({ ...p, notes: e.target.value }))} rows={3} style={{ ...inp, resize: "vertical" }} />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={saveEdit} disabled={saving} style={{ flex: 1, fontWeight: 700, fontSize: ".95rem", padding: ".7em", borderRadius: 10, background: saving ? "#ccc" : "var(--ember)", color: "#fff", border: "none", cursor: saving ? "default" : "pointer" }}>
                  {saving ? "Guardando…" : "✓ Guardar cambios"}
                </button>
                <button onClick={() => setEditId(null)} style={{ fontWeight: 700, fontSize: ".95rem", padding: ".7em 1.2em", borderRadius: 10, background: "none", border: "1.5px solid var(--line,#E4D9C8)", cursor: "pointer", color: "var(--muted)" }}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toastEl}
    </>
  )
}
