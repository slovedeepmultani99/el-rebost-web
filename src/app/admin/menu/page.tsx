"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import AdminTopBar from "@/components/admin/AdminTopBar"
import { useToast } from "@/components/admin/Toast"

const DAY_NAMES = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
const DAY_SHORT = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
const TAB_ORDER = [1, 2, 3, 4, 5, 6, 0]
const WEEKEND = new Set([5, 6, 0])

interface Dish {
  id?: string; course: "primero" | "segundo"
  name: string; name_ca: string
  description: string; description_ca: string
  isSupplement: boolean; suppPrice: string
}
interface Menu {
  id: string; dayOfWeek: number; price: string; postre: string
  inclBread: boolean; inclDrink: boolean; inclCoffee: boolean; inclDessert: boolean
  active: boolean; dishes: Dish[]
}

const emptyDish = (course: "primero" | "segundo"): Dish => ({
  course, name: "", name_ca: "", description: "", description_ca: "", isSupplement: false, suppPrice: "",
})

const input: React.CSSProperties = { border: "1.5px solid var(--line,#E4D9C8)", borderRadius: 10, padding: ".55em .8em", background: "#fff", color: "var(--ink)", fontFamily: "inherit", fontSize: ".95rem", width: "100%" }
const labelSt: React.CSSProperties = { display: "block", fontSize: ".7rem", fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase" as const, color: "var(--muted,#6A554F)", marginBottom: 5 }
const langBtn = (active: boolean): React.CSSProperties => ({
  fontWeight: 800, fontSize: ".68rem", letterSpacing: ".1em", padding: "3px 11px", borderRadius: 6, border: "1.5px solid",
  borderColor: active ? "var(--wine)" : "var(--line,#E4D9C8)",
  background: active ? "var(--wine)" : "#fff",
  color: active ? "#fff" : "var(--muted)",
  cursor: "pointer", textTransform: "uppercase" as const,
})

function getBtnStyles(variant: "primary" | "outline" | "del"): React.CSSProperties {
  if (variant === "primary") return { background: "var(--ember)", color: "#fff", borderColor: "var(--ember)" }
  if (variant === "del") return { background: "rgba(200,85,43,.1)", color: "var(--ember)", border: "none" }
  return { background: "var(--bone,#FBF7EF)", borderColor: "var(--line,#E4D9C8)", color: "var(--wine)" }
}
const btn = (variant: "primary" | "outline" | "del"): React.CSSProperties => ({
  display: "inline-flex", alignItems: "center", gap: ".4em", fontWeight: 700, fontSize: ".84rem",
  padding: ".6em 1.15em", borderRadius: 9, cursor: "pointer", transition: ".18s", border: "1.5px solid transparent",
  ...getBtnStyles(variant),
})

function getDishRowBg(isSupplement: boolean, isCA: boolean): string {
  if (isSupplement) return "rgba(200,85,43,.04)"
  if (isCA) return "rgba(255,250,235,.7)"
  return "#fff"
}

type ApiDish = Omit<Dish, "name_ca" | "description_ca"> & { name_ca?: string | null; description_ca?: string | null }
type ApiMenu = Omit<Menu, "dishes"> & { dishes: ApiDish[] }

function normalizeDish(d: ApiDish): Dish {
  return {
    ...d,
    course: d.course as "primero" | "segundo",
    description: d.description ?? "",
    suppPrice: d.suppPrice ?? "",
    name_ca: d.name_ca ?? "",
    description_ca: d.description_ca ?? "",
  }
}

export default function MenuAdminPage() {
  const [menus, setMenus] = useState<Record<number, Menu>>({})
  const [day, setDay] = useState(new Date().getDay())
  const [form, setForm] = useState<Menu | null>(null)
  const [lang, setLang] = useState<"es" | "ca">("es")
  const [saving, setSaving] = useState(false)
  const { toast, el: toastEl } = useToast()

  const loadMenus = useCallback(async () => {
    const res = await fetch("/api/menu")
    const raw: ApiMenu[] = await res.json()
    setMenus(Object.fromEntries(raw.map(m => [m.dayOfWeek, { ...m, dishes: m.dishes.map(normalizeDish) }])))
  }, [])

  useEffect(() => { loadMenus() }, [loadMenus])
  useEffect(() => { if (menus[day]) setForm(structuredClone(menus[day])) }, [day, menus])

  async function save() {
    if (!form) return
    setSaving(true)
    try {
      const res = await fetch(`/api/menu/${day}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error("Save failed")
      const raw: ApiMenu = await res.json()
      const updated: Menu = { ...raw, dishes: raw.dishes.map(normalizeDish) }
      setMenus(p => ({ ...p, [day]: updated }))
      setForm(structuredClone(updated))
      toast("✓ Menú guardado")
    } catch { toast("Error al guardar", "error") }
    finally { setSaving(false) }
  }

  const setField = (k: keyof Menu, v: unknown) => setForm(p => p ? { ...p, [k]: v } : p)
  const setDish = (i: number, k: keyof Dish, v: string | boolean) => {
    if (!form) return
    const dishes = form.dishes.map((d, idx) => idx === i ? { ...d, [k]: v } : d) as Dish[]
    setForm({ ...form, dishes })
  }
  const addDish = (course: "primero" | "segundo") =>
    setForm(p => p ? { ...p, dishes: [...p.dishes, emptyDish(course)] } : p)
  const removeDish = (i: number) =>
    setForm(p => p ? { ...p, dishes: p.dishes.filter((_, idx) => idx !== i) } : p)

  const dishRow = (d: Dish, i: number) => (
    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, background: getDishRowBg(d.isSupplement, lang === "ca"), border: `1px solid ${d.isSupplement ? "rgba(200,85,43,.3)" : "var(--line,#E4D9C8)"}`, borderRadius: 10, padding: "8px 10px", marginBottom: 6 }}>
      {lang === "ca" ? (
        <>
          <input value={d.name_ca} onChange={e => setDish(i, "name_ca", e.target.value)} placeholder="Nom (català)" style={{ ...input, border: "none", background: "transparent", flex: 1.2, fontWeight: 600 }} />
          <input value={d.description_ca} onChange={e => setDish(i, "description_ca", e.target.value)} placeholder="Descripció (català)" style={{ ...input, border: "none", background: "transparent", flex: 1, fontSize: ".84rem", color: "var(--muted)" }} />
        </>
      ) : (
        <>
          <input value={d.name} onChange={e => setDish(i, "name", e.target.value)} placeholder="Nombre del plato" style={{ ...input, border: "none", background: "transparent", flex: 1.2, fontWeight: 600 }} />
          <input value={d.description} onChange={e => setDish(i, "description", e.target.value)} placeholder="Descripción" style={{ ...input, border: "none", background: "transparent", flex: 1, fontSize: ".84rem", color: "var(--muted)" }} />
        </>
      )}
      {d.isSupplement && <input value={d.suppPrice} onChange={e => setDish(i, "suppPrice", e.target.value)} placeholder="+3€" style={{ ...input, width: 60, textAlign: "right" }} />}
      <button type="button" onClick={() => removeDish(i)} style={btn("del")}>✕</button>
    </div>
  )

  const inclItem = (key: "inclBread" | "inclDrink" | "inclCoffee" | "inclDessert", label2: string) => (
    <button key={key} type="button" onClick={() => setField(key, !form?.[key])}
      style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer", background: "none", border: "none", padding: 0 }}>
      <div style={{ width: 22, height: 22, borderRadius: 6, display: "grid", placeItems: "center", fontSize: ".72rem", transition: ".15s", background: form?.[key] ? "var(--olive,#4e6236)" : "var(--line,#E4D9C8)", color: form?.[key] ? "#fff" : "var(--muted)" }}>
        {form?.[key] ? "✓" : "✕"}
      </div>
      <span style={{ fontWeight: 600, fontSize: ".86rem" }}>{label2}</span>
    </button>
  )

  if (!form) return <div style={{ flex: 1, display: "grid", placeItems: "center", color: "var(--muted)" }}>Cargando…</div>

  const isWe = WEEKEND.has(day)
  const primeros = form.dishes.filter(d => d.course === "primero")
  const segundos = form.dishes.filter(d => d.course === "segundo")

  return (
    <>
      <AdminTopBar crumb="Backoffice · Contenido" title="Menú del día">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Language tabs */}
          <div style={{ display: "flex", gap: 3, background: "var(--bone,#FBF7EF)", borderRadius: 8, padding: 3, border: "1px solid var(--line,#E4D9C8)" }}>
            {(["es", "ca"] as const).map(l => (
              <button key={l} type="button" onClick={() => setLang(l)} style={langBtn(l === lang)}>
                {l === "es" ? "🇪🇸 ES" : "🟡 CA"}
              </button>
            ))}
          </div>
          {/* Active toggle */}
          <button type="button" onClick={() => setField("active", !form.active)}
            style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer", background: "none", border: "none", padding: 0 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, display: "grid", placeItems: "center", fontSize: ".72rem", background: form.active ? "var(--olive)" : "var(--line)", color: form.active ? "#fff" : "var(--muted)" }}>
              {form.active ? "✓" : "✕"}
            </div>
            <span style={{ fontSize: ".84rem", fontWeight: 600 }}>Activo</span>
          </button>
          <Link
            href={`/imprimir/menu/${day}`} target="_blank"
            style={{ display: "inline-flex", alignItems: "center", gap: ".4em", fontWeight: 700, fontSize: ".84rem", padding: ".6em 1.15em", borderRadius: 9, background: "#3A0F1B", color: "var(--cream)", border: "1.5px solid #3A0F1B", textDecoration: "none" }}
          >
            🖨 Imprimir
          </Link>
          <button type="button" onClick={save} disabled={saving} style={btn("primary")}>
            {saving ? "Guardando…" : "💾 Guardar"}
          </button>
        </div>
      </AdminTopBar>

      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        {/* Day tabs */}
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 16 }}>
          {TAB_ORDER.map(d => {
            const isActive = d === day
            const isW = WEEKEND.has(d)
            const activeTabColor = isW ? "var(--ember)" : "var(--wine)"
            return (
              <button key={d} type="button" onClick={() => setDay(d)}
                style={{ fontWeight: 700, fontSize: ".8rem", padding: ".45em .9em", borderRadius: 9, border: "1.5px solid", cursor: "pointer", transition: ".15s", borderColor: isActive ? activeTabColor : "var(--line,#E4D9C8)", background: isActive ? activeTabColor : "#fff", color: isActive ? "#fff" : "var(--muted)" }}>
                {DAY_SHORT[d]}{d === new Date().getDay() ? " · hoy" : ""}
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
              <p style={{ fontSize: ".82rem", color: "var(--muted)", marginTop: 2 }}>
                {lang === "ca" ? "Editant en català — recorda guardar" : "Edita los platos y configuración"}
              </p>
            </div>
          </div>

          {/* Price + postre — only in ES mode */}
          {lang === "es" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 12, marginBottom: 14 }}>
              <div>
                <label htmlFor="menu-precio" style={labelSt}>Precio</label>
                <input id="menu-precio" value={form.price} onChange={e => setField("price", e.target.value)} style={{ ...input, fontFamily: "var(--font-fraunces),serif", fontSize: "1.4rem", color: "var(--wine)", textAlign: "center", width: 110 }} />
              </div>
              <div>
                <label htmlFor="menu-postre" style={labelSt}>Postre</label>
                <input id="menu-postre" value={form.postre} onChange={e => setField("postre", e.target.value)} style={input} />
              </div>
            </div>
          )}

          {/* Inclusions — only in ES mode */}
          {lang === "es" && (
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
              {inclItem("inclBread", "Pan")}
              {inclItem("inclDrink", "Bebida")}
              {inclItem("inclCoffee", "Café")}
              {inclItem("inclDessert", "Postre")}
            </div>
          )}

          {/* Dishes — two column layout */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              <div style={{ fontSize: ".68rem", fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase" as const, color: "var(--ember)", marginBottom: 7 }}>
                {lang === "ca" ? "Primers" : "Primeros"}
              </div>
              {primeros.map(d => dishRow(d, form.dishes.indexOf(d)))}
              <button type="button" onClick={() => addDish("primero")} style={{ ...btn("outline"), fontSize: ".78rem", marginTop: 4 }}>
                + {lang === "ca" ? "Afegir primer" : "Añadir primero"}
              </button>
            </div>
            <div>
              <div style={{ fontSize: ".68rem", fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase" as const, color: "var(--ember)", marginBottom: 7 }}>
                {lang === "ca" ? "Segons" : "Segundos"}
              </div>
              {segundos.map(d => dishRow(d, form.dishes.indexOf(d)))}
              <button type="button" onClick={() => addDish("segundo")} style={{ ...btn("outline"), fontSize: ".78rem", marginTop: 4 }}>
                + {lang === "ca" ? "Afegir segon" : "Añadir segundo"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {toastEl}
    </>
  )
}
