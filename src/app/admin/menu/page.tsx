"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import AdminTopBar from "@/components/admin/AdminTopBar"
import { useToast } from "@/components/admin/Toast"

const DAY_NAMES = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
const DAY_SHORT = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
const TAB_ORDER = [1, 2, 3, 4, 5, 6, 0]
const WEEKEND = [5, 6, 0]

interface Dish { id?: string; course: "primero" | "segundo"; name: string; description: string; isSupplement: boolean; suppPrice: string }
interface Menu { id: string; dayOfWeek: number; price: string; postre: string; inclBread: boolean; inclDrink: boolean; inclCoffee: boolean; inclDessert: boolean; active: boolean; dishes: Dish[] }

const emptyDish = (course: "primero" | "segundo"): Dish => ({ course, name: "", description: "", isSupplement: false, suppPrice: "" })

const input: React.CSSProperties = { border: "1.5px solid var(--line,#E4D9C8)", borderRadius: 10, padding: ".55em .8em", background: "#fff", color: "var(--ink)", fontFamily: "inherit", fontSize: ".95rem", width: "100%" }
const label: React.CSSProperties = { display: "block", fontSize: ".7rem", fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase" as const, color: "var(--muted,#6A554F)", marginBottom: 5 }
const btn = (variant: "primary" | "outline" | "del"): React.CSSProperties => ({
  display: "inline-flex", alignItems: "center", gap: ".4em", fontWeight: 700, fontSize: ".84rem", padding: ".6em 1.15em", borderRadius: 9, cursor: "pointer", transition: ".18s", border: "1.5px solid transparent",
  ...(variant === "primary" ? { background: "var(--ember)", color: "#fff", borderColor: "var(--ember)" }
    : variant === "del" ? { background: "rgba(200,85,43,.1)", color: "var(--ember)", border: "none" }
    : { background: "var(--bone,#FBF7EF)", borderColor: "var(--line,#E4D9C8)", color: "var(--wine)" }),
})

export default function MenuAdminPage() {
  const [menus, setMenus] = useState<Record<number, Menu>>({})
  const [day, setDay] = useState(new Date().getDay())
  const [form, setForm] = useState<Menu | null>(null)
  const [saving, setSaving] = useState(false)
  const { toast, el: toastEl } = useToast()

  const loadMenus = useCallback(async () => {
    const res = await fetch("/api/menu")
    const data: Menu[] = await res.json()
    setMenus(Object.fromEntries(data.map((m) => [m.dayOfWeek, m])))
  }, [])

  useEffect(() => { loadMenus() }, [loadMenus])
  useEffect(() => { if (menus[day]) setForm(structuredClone(menus[day])) }, [day, menus])

  async function save() {
    if (!form) return
    setSaving(true)
    try {
      const res = await fetch(`/api/menu/${day}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error()
      const updated: Menu = await res.json()
      setMenus((p) => ({ ...p, [day]: updated }))
      setForm(structuredClone(updated))
      toast("✓ Menú guardado")
    } catch { toast("Error al guardar", "error") }
    finally { setSaving(false) }
  }

  const setField = (k: keyof Menu, v: unknown) => setForm((p) => p ? { ...p, [k]: v } : p)
  const setDish = (i: number, k: keyof Dish, v: string | boolean) => {
    if (!form) return
    const dishes = [...form.dishes]; (dishes[i] as Record<string, unknown>)[k] = v; setForm({ ...form, dishes })
  }
  const addDish = (course: "primero" | "segundo") =>
    setForm((p) => p ? { ...p, dishes: [...p.dishes, emptyDish(course)] } : p)
  const removeDish = (i: number) =>
    setForm((p) => p ? { ...p, dishes: p.dishes.filter((_, idx) => idx !== i) } : p)

  const dishRow = (d: Dish, i: number) => (
    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, background: d.isSupplement ? "rgba(200,85,43,.04)" : "#fff", border: `1px solid ${d.isSupplement ? "rgba(200,85,43,.3)" : "var(--line,#E4D9C8)"}`, borderRadius: 10, padding: "8px 10px", marginBottom: 6 }}>
      <input value={d.name} onChange={(e) => setDish(i, "name", e.target.value)} placeholder="Nombre del plato" style={{ ...input, border: "none", background: "transparent", flex: 1.2, fontWeight: 600 }} />
      <input value={d.description} onChange={(e) => setDish(i, "description", e.target.value)} placeholder="Descripción" style={{ ...input, border: "none", background: "transparent", flex: 1, fontSize: ".84rem", color: "var(--muted)" }} />
      {d.isSupplement && <input value={d.suppPrice} onChange={(e) => setDish(i, "suppPrice", e.target.value)} placeholder="+3€" style={{ ...input, width: 60, textAlign: "right" }} />}
      <button onClick={() => removeDish(i)} style={btn("del")}>✕</button>
    </div>
  )

  const inclItem = (key: "inclBread" | "inclDrink" | "inclCoffee" | "inclDessert", label2: string) => (
    <div key={key} style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer" }} onClick={() => setField(key, !form?.[key])}>
      <div style={{ width: 22, height: 22, borderRadius: 6, display: "grid", placeItems: "center", fontSize: ".72rem", cursor: "pointer", transition: ".15s", background: form?.[key] ? "var(--olive,#4e6236)" : "var(--line,#E4D9C8)", color: form?.[key] ? "#fff" : "var(--muted)" }}>
        {form?.[key] ? "✓" : "✕"}
      </div>
      <label style={{ fontWeight: 600, fontSize: ".86rem", cursor: "pointer" }}>{label2}</label>
    </div>
  )

  if (!form) return <div style={{ flex: 1, display: "grid", placeItems: "center", color: "var(--muted)" }}>Cargando…</div>

  const isWe = WEEKEND.includes(day)
  const primeros = form.dishes.filter((d) => d.course === "primero")
  const segundos = form.dishes.filter((d) => d.course === "segundo")

  return (
    <>
      <AdminTopBar crumb="Backoffice · Contenido" title="Menú del día">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer" }} onClick={() => setField("active", !form.active)}>
            <div style={{ width: 22, height: 22, borderRadius: 6, display: "grid", placeItems: "center", fontSize: ".72rem", background: form.active ? "var(--olive)" : "var(--line)", color: form.active ? "#fff" : "var(--muted)" }}>
              {form.active ? "✓" : "✕"}
            </div>
            <span style={{ fontSize: ".84rem", fontWeight: 600 }}>Activo</span>
          </div>
          <Link
            href={`/imprimir/menu/${day}`}
            target="_blank"
            style={{ display: "inline-flex", alignItems: "center", gap: ".4em", fontWeight: 700, fontSize: ".84rem", padding: ".6em 1.15em", borderRadius: 9, background: "#3A0F1B", color: "var(--cream)", border: "1.5px solid #3A0F1B", textDecoration: "none" }}
          >
            🖨 Imprimir
          </Link>
          <button onClick={save} disabled={saving} style={btn("primary")}>
            {saving ? "Guardando…" : "💾 Guardar"}
          </button>
        </div>
      </AdminTopBar>

      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        {/* Day tabs */}
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 16 }}>
          {TAB_ORDER.map((d) => {
            const isActive = d === day; const isW = WEEKEND.includes(d)
            return (
              <button key={d} onClick={() => setDay(d)} style={{ fontWeight: 700, fontSize: ".8rem", padding: ".45em .9em", borderRadius: 9, border: "1.5px solid", cursor: "pointer", transition: ".15s", borderColor: isActive ? (isW ? "var(--ember)" : "var(--wine)") : "var(--line,#E4D9C8)", background: isActive ? (isW ? "var(--ember)" : "var(--wine)") : "#fff", color: isActive ? "#fff" : "var(--muted)" }}>
                {DAY_SHORT[d]}{d === new Date().getDay() ? " ·hoy" : ""}
              </button>
            )
          })}
        </div>

        {/* Menu editor panel */}
        <div style={{ background: "var(--bone,#FBF7EF)", border: "1px solid var(--line,#E4D9C8)", borderRadius: 16, padding: 20, marginBottom: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
            <div>
              <h3 style={{ fontFamily: "var(--font-fraunces),serif", fontWeight: 500, fontSize: "1.2rem" }}>
                {DAY_NAMES[day]}{isWe ? " · Fin de semana" : ""}
              </h3>
              <p style={{ fontSize: ".82rem", color: "var(--muted)", marginTop: 2 }}>Edita los platos y configuración</p>
            </div>
          </div>

          {/* Price + postre */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 12, marginBottom: 14 }}>
            <div>
              <label style={label}>Precio</label>
              <input value={form.price} onChange={(e) => setField("price", e.target.value)} style={{ ...input, fontFamily: "var(--font-fraunces),serif", fontSize: "1.4rem", color: "var(--wine)", textAlign: "center", width: 110 }} />
            </div>
            <div>
              <label style={label}>Postre</label>
              <input value={form.postre} onChange={(e) => setField("postre", e.target.value)} style={input} />
            </div>
          </div>

          {/* Inclusions */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
            {inclItem("inclBread", "Pan")}
            {inclItem("inclDrink", "Bebida")}
            {inclItem("inclCoffee", "Café")}
            {inclItem("inclDessert", "Postre")}
          </div>

          {/* Primeros */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              <div style={{ fontSize: ".68rem", fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase" as const, color: "var(--ember)", marginBottom: 7 }}>Primeros</div>
              {primeros.map((d, i) => dishRow(d, form.dishes.indexOf(d)))}
              <button onClick={() => addDish("primero")} style={{ ...btn("outline"), fontSize: ".78rem", marginTop: 4 }}>+ Añadir primero</button>
            </div>
            <div>
              <div style={{ fontSize: ".68rem", fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase" as const, color: "var(--ember)", marginBottom: 7 }}>Segundos</div>
              {segundos.map((d, i) => dishRow(d, form.dishes.indexOf(d)))}
              <button onClick={() => addDish("segundo")} style={{ ...btn("outline"), fontSize: ".78rem", marginTop: 4 }}>+ Añadir segundo</button>
            </div>
          </div>
        </div>
      </div>
      {toastEl}
    </>
  )
}
