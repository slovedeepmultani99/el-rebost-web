"use client"

import { useEffect } from "react"
import Link from "next/link"

interface Dish { id: string; course: string; name: string; description: string | null; isSupplement: boolean; suppPrice: string | null }
interface Menu { dayOfWeek: number; price: string; postre: string; inclBread: boolean; inclDrink: boolean; inclCoffee: boolean; inclDessert: boolean; dishes: Dish[] }

const DAY_NAMES = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
const LOGO_SMALL = (
  <svg width="46" height="46" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="48" fill="#5C1A2B" />
    <circle cx="50" cy="50" r="44" fill="none" stroke="#F5EDE0" strokeWidth="1.6" />
    <path d="M35 44c-6 0-10-4-10-9 0-5 4-8 8-8 1-6 7-10 14-9 4-7 16-7 20 0 7-1 13 3 14 9 4 0 8 3 8 8 0 5-4 9-10 9z" fill="#F5EDE0" />
    <rect x="35" y="44" width="36" height="10" rx="2" fill="#F5EDE0" />
    <g stroke="#F5EDE0" strokeWidth="2.3" strokeLinecap="round">
      <line x1="32" y1="80" x2="58" y2="60" /><line x1="68" y1="80" x2="44" y2="62" />
    </g>
    <circle cx="32" cy="80" r="3.2" fill="#E07A33" />
  </svg>
)

export default function PrintMenuClient({ menu }: { menu: Menu }) {
  useEffect(() => {
    const t = setTimeout(() => window.print(), 600)
    return () => clearTimeout(t)
  }, [])

  const primeros = menu.dishes.filter((d) => d.course === "primero" && !d.isSupplement)
  const segundos = menu.dishes.filter((d) => d.course === "segundo" && !d.isSupplement)
  const suplementos = menu.dishes.filter((d) => d.isSupplement)

  const today = new Date()
  const dayName = DAY_NAMES[menu.dayOfWeek]
  const dateStr = today.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })

  const inclusions = [
    { key: "inclBread", label: "Pan artesano", val: menu.inclBread },
    { key: "inclDrink", label: "Bebida incluida", val: menu.inclDrink },
    { key: "inclCoffee", label: "Café incluido", val: menu.inclCoffee },
    { key: "inclDessert", label: "Postre incluido", val: menu.inclDessert },
  ]

  const dishRow = (d: Dish, i: number) => (
    <div key={d.id} style={{ display: "flex", alignItems: "baseline", gap: 5, padding: "2.5px 0", borderBottom: "1px dashed #E4D9C8" }}>
      <span style={{ fontFamily: "'Fraunces',serif", fontSize: ".65rem", color: "#C8552B", fontWeight: 600, minWidth: 12, flexShrink: 0 }}>
        {i + 1}.
      </span>
      <div style={{ flex: 1 }}>
        <span style={{ fontFamily: "'Fraunces',serif", fontSize: "1rem", fontWeight: 500 }}>{d.name}</span>
        {d.description && (
          <span style={{ fontSize: ".68rem", color: "#6A554F", fontStyle: "italic", marginLeft: 6 }}>{d.description}</span>
        )}
      </div>
    </div>
  )

  return (
    <>
      <style>{`
        @media print {
          @page { size: A4; margin: 0 }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important }
          .no-print { display: none !important }
          body { margin: 0; background: #F5EDE0 }
        }
        body { font-family: 'Karla', sans-serif }
      `}</style>

      {/* Screen toolbar */}
      <div className="no-print" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "#3A0F1B", color: "#F5EDE0", padding: "10px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontFamily: "'Fraunces',serif", fontSize: "1rem" }}>🖨 Imprimir Menú — {dayName}</span>
        <button onClick={() => window.print()} style={{ marginLeft: "auto", background: "#C8552B", color: "#fff", border: "none", borderRadius: 8, padding: "6px 16px", fontWeight: 700, cursor: "pointer" }}>
          Imprimir
        </button>
        <Link href="/admin/menu" style={{ color: "rgba(245,237,224,.7)", fontSize: ".84rem" }}>← Volver</Link>
      </div>

      {/* A4 Page */}
      <div style={{ paddingTop: "3rem" }} className="no-print-padding">
        <div style={{
          width: "210mm", height: "297mm", background: "#F5EDE0",
          display: "flex", flexDirection: "column", overflow: "hidden",
          position: "relative", fontFamily: "'Karla',sans-serif", color: "#2A1A18",
        }}>
          {/* Gold decorative border */}
          <div style={{ position: "absolute", inset: "7mm", border: "1.5px solid #BC9255", pointerEvents: "none", zIndex: 1 }} />
          <div style={{ position: "absolute", inset: "10mm", border: ".7px solid rgba(188,146,85,.4)", pointerEvents: "none" }} />

          {/* Content */}
          <div style={{ position: "relative", zIndex: 2, padding: "14mm 18mm 11mm", display: "flex", flexDirection: "column", height: "100%" }}>
            {/* Header */}
            <div style={{ textAlign: "center", flexShrink: 0 }}>
              {LOGO_SMALL}
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: "1.3rem", color: "#5C1A2B", marginTop: 3, lineHeight: 1 }}>
                El Rebost de Montigalà
              </div>
              <div style={{ fontSize: ".57rem", letterSpacing: ".25em", textTransform: "uppercase", color: "#6A554F", fontWeight: 700, marginTop: 2 }}>
                Brasería · Tapas · Arroces · Badalona
              </div>
            </div>

            {/* Title */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, margin: "4mm 0 1.5mm" }}>
              <div style={{ width: 40, height: 1.5, background: "#C8552B" }} />
              <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: "2.3rem", color: "#5C1A2B", fontWeight: 500, fontStyle: "italic", margin: 0 }}>
                Menú del día
              </h1>
              <div style={{ width: 40, height: 1.5, background: "#C8552B" }} />
            </div>

            {/* Date */}
            <div style={{ textAlign: "center", fontSize: ".68rem", letterSpacing: ".2em", textTransform: "uppercase", color: "#6A554F", fontWeight: 700, marginBottom: "4mm" }}>
              <b style={{ color: "#C8552B" }}>{dayName}</b> · {dateStr}
            </div>

            {/* Courses */}
            <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12mm", flex: 1 }}>
                {/* Primeros */}
                <div>
                  <div style={{ background: "#5C1A2B", color: "#fff", fontFamily: "'Karla',sans-serif", fontWeight: 700, fontSize: ".63rem", letterSpacing: ".14em", textTransform: "uppercase", padding: "4px 14px", borderRadius: 100, display: "inline-block", marginBottom: "2mm" }}>
                    Para empezar
                  </div>
                  {primeros.map((d, i) => dishRow(d, i))}
                </div>
                {/* Segundos */}
                <div>
                  <div style={{ background: "#5C1A2B", color: "#fff", fontFamily: "'Karla',sans-serif", fontWeight: 700, fontSize: ".63rem", letterSpacing: ".14em", textTransform: "uppercase", padding: "4px 14px", borderRadius: 100, display: "inline-block", marginBottom: "2mm" }}>
                    Principal
                  </div>
                  {segundos.map((d, i) => dishRow(d, i))}
                  {suplementos.length > 0 && suplementos.map((s) => (
                    <div key={s.id} style={{ display: "flex", alignItems: "baseline", gap: 5, padding: "2px 0", borderBottom: "1px dashed rgba(200,85,43,.25)", background: "rgba(200,85,43,.04)" }}>
                      <span style={{ fontSize: ".55rem", fontWeight: 800, letterSpacing: ".04em", textTransform: "uppercase", color: "#C8552B", border: "1px solid #C8552B", borderRadius: 4, padding: "1px 4px", flexShrink: 0 }}>+</span>
                      <span style={{ fontFamily: "'Fraunces',serif", fontSize: ".96rem", fontWeight: 500, flex: 1 }}>{s.name}</span>
                      {s.suppPrice && <span style={{ fontSize: ".82rem", color: "#C8552B" }}>{s.suppPrice}</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots separator */}
              <div style={{ display: "flex", justifyContent: "center", gap: 6, margin: "1.5mm 0", flexShrink: 0 }}>
                {[0,1,2].map((i) => <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "#BC9255" }} />)}
              </div>

              {/* Postre */}
              <div style={{ flexShrink: 0 }}>
                <div style={{ background: "#5C1A2B", color: "#fff", fontFamily: "'Karla',sans-serif", fontWeight: 700, fontSize: ".63rem", letterSpacing: ".14em", textTransform: "uppercase", padding: "4px 14px", borderRadius: 100, display: "inline-block", marginBottom: "2mm" }}>
                  Postre
                </div>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: ".98rem", fontWeight: 500, padding: "2px 0" }}>
                  {menu.postre}
                </div>
              </div>
            </div>

            {/* Bottom: inclusions + price */}
            <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: "8mm", marginTop: "auto", paddingTop: "3mm" }}>
              <div style={{ flex: 1, border: "1.5px solid #E4D9C8", borderRadius: 9, padding: "6px 10px" }}>
                <div style={{ fontSize: ".57rem", fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase", color: "#C8552B", marginBottom: 4 }}>
                  Incluye
                </div>
                {inclusions.map((inc) => (
                  <div key={inc.key} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: ".76rem", marginBottom: 3 }}>
                    <div style={{ width: 18, height: 18, borderRadius: 4, display: "grid", placeItems: "center", fontSize: ".65rem", background: inc.val ? "#4e6236" : "#E4D9C8", color: inc.val ? "#fff" : "#6A554F", flexShrink: 0 }}>
                      {inc.val ? "✓" : "✕"}
                    </div>
                    {inc.label}
                  </div>
                ))}
              </div>

              <div style={{ textAlign: "center", flexShrink: 0 }}>
                <div style={{ fontSize: ".57rem", fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase", color: "#6A554F", marginBottom: 2 }}>
                  Precio por persona
                </div>
                <div style={{ background: "#C8552B", color: "#fff", borderRadius: 10, fontFamily: "'Fraunces',serif", fontSize: "2.2rem", fontWeight: 600, lineHeight: 1, padding: "5px 15px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px,rgba(255,255,255,.14) 1px,transparent 0)", backgroundSize: "12px 12px" }} />
                  <span style={{ position: "relative" }}>{menu.price}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ flexShrink: 0, textAlign: "center", fontSize: ".58rem", color: "#6A554F", marginTop: "3mm" }}>
              <div style={{ width: 28, height: 1, background: "#E4D9C8", margin: "2px auto" }} />
              Carrer Manuel Moreno Mauricio, 35-37 · 08917 Badalona · 934 65 30 00
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
