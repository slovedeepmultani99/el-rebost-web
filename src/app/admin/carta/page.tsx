"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import AdminTopBar from "@/components/admin/AdminTopBar"
import { useToast } from "@/components/admin/Toast"

interface Dish {
  id: string; sectionId: string; name: string; description: string | null
  price: string | null; available: boolean; isStar: boolean; isVeg: boolean; isSg: boolean
  imageUrl: string | null; sortOrder: number
}
interface Section { id: string; title: string; subtitle: string | null; note: string | null; isSalsas: boolean; active: boolean; sortOrder: number; dishes: Dish[] }

const inp: React.CSSProperties = { border: "1.5px solid var(--line,#E4D9C8)", borderRadius: 10, padding: ".55em .8em", background: "#fff", color: "var(--ink)", fontFamily: "inherit", fontSize: ".9rem", width: "100%" }
const btnS = (on: boolean, color = "var(--olive)"): React.CSSProperties => ({
  fontSize: ".62rem", fontWeight: 800, letterSpacing: ".04em", padding: "2px 7px", borderRadius: 6, border: `1.5px solid ${on ? color : "var(--line,#E4D9C8)"}`, background: on ? color : "#fff", cursor: "pointer", color: on ? "#fff" : "var(--muted)", textTransform: "uppercase" as const,
})

export default function CartaAdminPage() {
  const [sections, setSections] = useState<Section[]>([])
  const [activeId, setActiveId] = useState("")
  const { toast, el: toastEl } = useToast()

  const load = useCallback(async () => {
    const res = await fetch("/api/carta")
    const data: Section[] = await res.json()
    setSections(data)
    setActiveId(prev => prev || data[0]?.id || "")
  }, [])

  useEffect(() => { load() }, [load])

  const section = sections.find((s) => s.id === activeId)

  async function saveDish(dish: Dish) {
    const res = await fetch(`/api/carta/dishes/${dish.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: dish.name,
        description: dish.description,
        price: dish.price ? parseFloat(dish.price) : null,
        available: dish.available,
        isStar: dish.isStar,
        isVeg: dish.isVeg,
        isSg: dish.isSg,
      }),
    })
    if (res.ok) toast("✓ Plato guardado")
    else toast("Error al guardar", "error")
  }

  async function deleteDish(id: string) {
    if (!confirm("¿Eliminar este plato?")) return
    const res = await fetch(`/api/carta/dishes/${id}`, { method: "DELETE" })
    if (res.ok) { setSections((p) => p.map((s) => ({ ...s, dishes: s.dishes.filter((d) => d.id !== id) }))); toast("Plato eliminado") }
  }

  async function addDish() {
    if (!activeId) return
    const res = await fetch("/api/carta/dishes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sectionId: activeId, name: "Nuevo plato", description: "", available: true }),
    })
    if (res.ok) { await load(); toast("✓ Plato añadido") }
  }

  function updateDish(id: string, k: keyof Dish, v: unknown) {
    setSections((p) => p.map((s) => ({ ...s, dishes: s.dishes.map((d) => d.id === id ? { ...d, [k]: v } : d) })))
  }

  const panel: React.CSSProperties = { background: "var(--bone,#FBF7EF)", border: "1px solid var(--line,#E4D9C8)", borderRadius: 16, padding: 20, marginBottom: 18 }

  return (
    <>
      <AdminTopBar crumb="Backoffice · Contenido" title="Carta">
        <Link
          href="/imprimir/carta"
          target="_blank"
          style={{ display: "inline-flex", alignItems: "center", gap: ".4em", fontWeight: 700, fontSize: ".84rem", padding: ".6em 1.15em", borderRadius: 9, background: "#3A0F1B", color: "var(--cream,#F5EDE0)", border: "1.5px solid #3A0F1B", textDecoration: "none" }}
        >
          🖨 Imprimir carta
        </Link>
        <button onClick={addDish} style={{ display: "inline-flex", alignItems: "center", gap: ".4em", fontWeight: 700, fontSize: ".84rem", padding: ".6em 1.15em", borderRadius: 9, cursor: "pointer", border: "1.5px solid var(--ember)", background: "var(--ember)", color: "#fff" }}>
          + Añadir plato
        </button>
      </AdminTopBar>

      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        {/* Section tabs */}
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14, paddingBottom: 12, borderBottom: "1px solid var(--line,#E4D9C8)" }}>
          {sections.map((s) => (
            <button key={s.id} onClick={() => setActiveId(s.id)} style={{ fontWeight: 700, fontSize: ".82rem", padding: ".42em .85em", borderRadius: 9, border: "1.5px solid", cursor: "pointer", transition: ".15s", whiteSpace: "nowrap", borderColor: s.id === activeId ? "var(--wine)" : "var(--line,#E4D9C8)", background: s.id === activeId ? "var(--wine)" : "#fff", color: s.id === activeId ? "#fff" : "var(--muted)" }}>
              {s.title}
            </button>
          ))}
        </div>

        {section && (
          <div style={panel}>
            {/* Section meta */}
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 12, padding: 10, background: "#F7F2EA", borderRadius: 10 }}>
              <input defaultValue={section.title} placeholder="Nombre sección" style={{ ...inp, fontFamily: "var(--font-fraunces),serif", fontSize: ".95rem", border: "none", background: "transparent", fontWeight: 600, flex: 1 }} />
              <input defaultValue={section.subtitle ?? ""} placeholder="Subtítulo" style={{ ...inp, fontSize: ".78rem", border: "none", background: "transparent", flex: 1.2 }} />
              <span style={{ fontSize: ".72rem", color: "var(--muted)" }}>{section.dishes.length} platos</span>
            </div>

            {/* Dish cards */}
            {section.dishes.length === 0 ? (
              <p style={{ color: "var(--muted)", fontSize: ".9rem", padding: "10px 0" }}>No hay platos en esta sección.</p>
            ) : (
              section.dishes.map((d) => (
                <div key={d.id} style={{ background: "#fff", border: "1px solid var(--line,#E4D9C8)", borderRadius: 13, padding: 14, display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10 }}>
                  {/* Thumb */}
                  <div style={{ width: 60, height: 60, borderRadius: 9, background: d.imageUrl ? `url(${d.imageUrl}) center/cover` : "linear-gradient(135deg,var(--wine),var(--ember))", display: "grid", placeItems: "center", fontSize: ".62rem", color: "rgba(255,255,255,.7)", flexShrink: 0 }}>
                    {!d.imageUrl && "IMG"}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <input
                      value={d.name}
                      onChange={(e) => updateDish(d.id, "name", e.target.value)}
                      onBlur={() => saveDish(d)}
                      style={{ fontFamily: "var(--font-fraunces),serif", fontWeight: 600, fontSize: "1rem", border: "none", background: "none", width: "100%", color: "var(--ink)", borderBottom: "1px solid transparent", padding: "1px 0" }}
                    />
                    <textarea
                      value={d.description ?? ""}
                      onChange={(e) => updateDish(d.id, "description", e.target.value)}
                      onBlur={() => saveDish(d)}
                      rows={2}
                      style={{ border: "none", background: "#F7F2EA", borderRadius: 7, fontSize: ".8rem", color: "var(--muted)", resize: "none" as const, padding: "5px 7px", width: "100%", marginTop: 5, fontFamily: "inherit" }}
                    />
                    {/* Price + tags */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                      <input
                        value={d.price ?? ""}
                        onChange={(e) => updateDish(d.id, "price", e.target.value)}
                        onBlur={() => saveDish(d)}
                        placeholder="Precio €"
                        style={{ width: 80, textAlign: "right", fontFamily: "var(--font-fraunces),serif", fontWeight: 700, fontSize: ".95rem", color: "var(--wine)", border: "1.5px solid var(--line,#E4D9C8)", borderRadius: 8, padding: "3px 6px" }}
                      />
                      {(["isStar", "isVeg", "isSg", "available"] as const).map((tag) => {
                        const labels = { isStar: "★", isVeg: "VEG", isSg: "SG", available: "Disponible" }
                        const colors = { isStar: "var(--ember)", isVeg: "var(--olive)", isSg: "#8a6326", available: "var(--olive)" }
                        return (
                          <button key={tag} onClick={() => { updateDish(d.id, tag, !d[tag]); setTimeout(() => saveDish({ ...d, [tag]: !d[tag] }), 0) }}
                            style={btnS(!!d[tag], colors[tag])}>
                            {labels[tag]}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <button onClick={() => deleteDish(d.id)} style={{ background: "rgba(200,85,43,.1)", color: "var(--ember)", border: "none", borderRadius: 7, padding: "4px 8px", cursor: "pointer", fontSize: ".75rem", fontWeight: 700, flexShrink: 0 }}>
                    Eliminar
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      {toastEl}
    </>
  )
}
