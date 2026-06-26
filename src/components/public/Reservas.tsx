"use client"

import { useState } from "react"
import { WaIcon, waConfirmUrl, waReservaUrl } from "./WhatsAppButton"

interface InfoData { tel: string; addr: string }
interface Horario { dias: string; horas: string; nota: string }

const LUNCH_SLOTS = ["13:00", "13:30", "14:00", "14:30", "15:00", "15:30"]
const DINNER_SLOTS = ["19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"]
const DINNER_DAYS = [3, 4, 5, 6] // Miércoles, Jueves, Viernes, Sábado

const todayStr = () => new Date().toLocaleDateString("sv")
const minSlotTime = () => {
  const d = new Date(Date.now() + 30 * 60 * 1000)
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
}

type Status = "idle" | "loading" | "success" | "error"

const fieldStyle: React.CSSProperties = {
  width: "100%",
  fontFamily: "var(--font-karla), sans-serif",
  fontSize: "1rem",
  padding: ".78em .9em",
  border: "1.5px solid var(--line)",
  borderRadius: 12,
  background: "#fff",
  color: "var(--ink)",
  outline: "none",
  transition: ".2s",
}
const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: ".74rem",
  fontWeight: 800,
  letterSpacing: ".1em",
  textTransform: "uppercase" as const,
  color: "var(--ink-soft)",
  marginBottom: 6,
}

export default function Reservas({ info, horarios }: { info: InfoData; horarios: Horario[] }) {
  const [form, setForm] = useState({ name: "", phone: "", date: "", service: "comida", time: "", guests: "2", notes: "" })
  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const dateDay = form.date ? new Date(form.date + "T12:00:00").getDay() : -1
  const isToday = form.date === todayStr()
  const minTime = isToday ? minSlotTime() : "00:00"
  const allSlots = form.service === "cena" ? DINNER_SLOTS : LUNCH_SLOTS
  const slots = allSlots.filter((t) => !isToday || t >= minTime)
  const dinnerDisabled = form.service === "cena" && !DINNER_DAYS.includes(dateDay)
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v, ...(k === "service" || k === "date" ? { time: "" } : {}) }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (parseInt(form.guests) > 40) {
      setErrorMsg(`Para grupos de más de 40 personas, llámenos al ${info.tel}`)
      setStatus("error"); return
    }
    setStatus("loading"); setErrorMsg("")
    try {
      const res = await fetch("/api/reservas", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || "Error al crear la reserva") }
      setStatus("success")
      setForm({ name: "", phone: "", date: "", service: "comida", time: "", guests: "2", notes: "" })
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Error inesperado")
      setStatus("error")
    }
  }

  return (
    <section
      id="reservas"
      style={{
        padding: "96px 0",
        background: "linear-gradient(160deg, var(--wine) 0%, var(--wine-deep) 100%)",
        color: "var(--cream)",
        position: "relative",
        overflow: "hidden",
        scrollMarginTop: 78,
      }}
    >
      {/* Dot overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: .09, backgroundImage: "radial-gradient(circle at 1px 1px,var(--cream) 1px,transparent 0)", backgroundSize: "26px 26px" }} />

      <div className="wrap relative">
        <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: ".85fr 1.15fr", gap: 54, alignItems: "start" }}>
          {/* Info */}
          <div>
            <div className="eyebrow" style={{ color: "var(--ember-bright)" }}>Reservas online</div>
            <h2 style={{ color: "var(--cream)", fontSize: "clamp(2rem,4vw,3rem)", marginBottom: 16 }}>Reserva tu mesa en 30 segundos</h2>
            <p style={{ color: "rgba(245,237,224,.82)", marginBottom: 26, fontSize: "1.05rem" }}>
              Confirmación inmediata. Recomendamos reservar: somos un sitio muy concurrido, sobre todo los fines de semana.
            </p>
            {[
              { ic: "🍽", title: "Comidas todos los días", sub: "De 13:00 a 16:00 h" },
              { ic: "🌙", title: "Cenas miércoles a sábado", sub: "De 19:30 a 23:00 h" },
              { ic: "🔥", title: "¿Grupos de +40?", sub: `Llámanos al ${info.tel}` },
              { ic: "🅿️", title: "Fácil aparcamiento", sub: "Junto al CC Montigalà · parking a 80 m" },
            ].map((f, i) => (
              <div key={i} style={{ display: "flex", gap: 13, alignItems: "flex-start", marginBottom: 18 }}>
                <span style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 12, background: "rgba(245,237,224,.12)", display: "grid", placeItems: "center", color: "var(--ember-bright)", fontSize: "1.1rem" }}>
                  {f.ic}
                </span>
                <div>
                  <b style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "1.05rem", display: "block" }}>{f.title}</b>
                  <span style={{ fontSize: ".88rem", color: "rgba(245,237,224,.75)" }}>{f.sub}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Form card */}
          <div id="res-form" className="res-card" style={{ background: "var(--bone)", color: "var(--ink)", borderRadius: 24, padding: 34, boxShadow: "0 30px 70px -20px rgba(0,0,0,.6)", overflow: "hidden" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: 4 }}>Haz tu reserva</h3>
            <p style={{ fontSize: ".9rem", color: "var(--ink-soft)", marginBottom: 22 }}>El Rebost de Montigalà · Badalona</p>

            {status === "success" ? (
              <div style={{ background: "var(--olive)", color: "#fff", borderRadius: 16, padding: 22 }}>
                <h4 style={{ fontSize: "1.3rem", color: "#fff", marginBottom: 6 }}>¡Reserva recibida! ✓</h4>
                <p style={{ fontSize: ".92rem" }}>Te confirmamos por teléfono en breve. ¡Hasta pronto!</p>
                <a
                  href={waConfirmUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 14, background: "#15803d", color: "#fff", borderRadius: 100, padding: "9px 16px", fontFamily: "var(--font-karla), sans-serif", fontWeight: 700, fontSize: ".88rem", textDecoration: "none" }}
                >
                  <WaIcon size={16} /> Confirmar por WhatsApp
                </a>
                <br />
                <button onClick={() => setStatus("idle")} style={{ marginTop: 12, background: "none", border: "none", color: "#fff", cursor: "pointer", textDecoration: "underline", fontSize: ".84rem" }}>
                  Hacer otra reserva
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Date + guests */}
                <div className="res-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
                  <div>
                    <label htmlFor="res-date" style={labelStyle}>Fecha</label>
                    <input id="res-date" type="date" required value={form.date} min={new Date().toLocaleDateString("sv")} onChange={(e) => set("date", e.target.value)} style={fieldStyle} />
                  </div>
                  <div>
                    <label htmlFor="res-guests" style={labelStyle}>Comensales</label>
                    <select id="res-guests" value={form.guests} onChange={(e) => set("guests", e.target.value)} style={fieldStyle}>
                      {Array.from({length: 40}, (_, i) => i + 1).map(n => <option key={n} value={n}>{n} {n===1?"persona":"personas"}</option>)}
                    </select>
                  </div>
                </div>

                {/* Service toggle */}
                <fieldset style={{ border: "none", padding: 0, margin: "0 0 16px" }}>
                  <legend style={labelStyle}>Servicio</legend>
                  <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                    {["comida", "cena"].map((s) => (
                      <button key={s} type="button" onClick={() => set("service", s)} style={{ flex: 1, fontFamily: "var(--font-karla)", fontWeight: 700, padding: ".7em", borderRadius: 12, border: "1.5px solid", borderColor: form.service===s ? "var(--wine)" : "var(--line)", background: form.service===s ? "var(--wine)" : "#fff", color: form.service===s ? "var(--cream)" : "var(--ink-soft)", cursor: "pointer", transition: ".2s" }}>
                        {s === "comida" ? "🍽 Comida" : "🌙 Cena"}
                      </button>
                    ))}
                  </div>
                  {dinnerDisabled && form.date && <p style={{ fontSize: ".8rem", color: "var(--ember)", marginTop: 4 }}>Las cenas están disponibles de miércoles a sábado.</p>}
                </fieldset>

                {/* Slots */}
                <fieldset style={{ border: "none", padding: 0, margin: "0 0 16px" }}>
                  <legend style={labelStyle}>Hora</legend>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(72px,1fr))", gap: 8, marginTop: 6 }}>
                    {slots.map((t) => (
                      <button key={t} type="button" onClick={() => set("time", t)} style={{ fontFamily: "var(--font-karla)", fontWeight: 700, fontSize: ".92rem", padding: ".55em", border: "1.5px solid", borderColor: form.time===t ? "var(--ember)" : "var(--line)", borderRadius: 10, background: form.time===t ? "var(--ember)" : "#fff", color: form.time===t ? "#fff" : "var(--ink)", cursor: "pointer", textAlign: "center", transition: ".2s" }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Name + phone */}
                <div className="res-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
                  <div>
                    <label htmlFor="res-name" style={labelStyle}>Nombre</label>
                    <input id="res-name" required value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Tu nombre" style={fieldStyle} />
                  </div>
                  <div>
                    <label htmlFor="res-phone" style={labelStyle}>Teléfono</label>
                    <input id="res-phone" required type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="6XX XXX XXX" style={fieldStyle} />
                  </div>
                </div>

                {/* Notes */}
                <div style={{ marginBottom: 16 }}>
                  <label htmlFor="res-notes" style={labelStyle}>Peticiones (opcional)</label>
                  <textarea id="res-notes" rows={2} value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Trona, terraza, celebración, alergias…" style={{ ...fieldStyle, resize: "none" }} />
                </div>

                {status === "error" && <p style={{ fontSize: ".8rem", color: "var(--ember)", marginBottom: 12 }}>{errorMsg}</p>}

                <button type="submit" disabled={status === "loading" || !form.time || dinnerDisabled}
                  className="btn btn-primary" style={{ width: "100%", justifyContent: "center", opacity: (status === "loading" || !form.time) ? .6 : 1 }}>
                  {status === "loading" ? "Enviando..." : "Confirmar reserva"}
                </button>
                <p style={{ textAlign: "center", marginTop: 14, fontSize: ".82rem", color: "var(--ink-soft)" }}>
                  ¿Prefieres hacerlo por WhatsApp?{" "}
                  <a href={waReservaUrl()} target="_blank" rel="noopener noreferrer" style={{ color: "#15803d", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4, verticalAlign: "middle" }}>
                    <WaIcon size={14} />Escríbenos
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
