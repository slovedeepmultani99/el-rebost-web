"use client"

import { useEffect } from "react"
import Link from "next/link"

interface Dish { id: string; name: string; description: string | null; price: string | null; isStar: boolean; isVeg: boolean; isSg: boolean }
interface Section { id: string; title: string; subtitle: string | null; note: string | null; isSalsas: boolean; dishes: Dish[] }

// Page distribution as per CLAUDE.md
const PAGE1_LEFT = ["Tapas", "Entrantes"]
const PAGE1_RIGHT = ["Ensaladas", "Huevos", "Pan", "Torradas"]
const PAGE2_LEFT = ["Pastas y Sopas", "Bacalao"]
const PAGE2_RIGHT = ["Arroces y Fideuá", "Carnes", "Salsas"]

const LOGO = (
  <svg width="44" height="44" viewBox="0 0 100 100" style={{ position: "relative" }}>
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

function DishRow({ d }: { d: Dish }) {
  return (
    <div style={{ breakInside: "avoid", pageBreakInside: "avoid" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4, padding: "2.5px 0" }}>
        <span style={{ fontFamily: "'Fraunces',serif", fontSize: ".9rem", fontWeight: 500, flex: "0 1 auto", lineHeight: 1.22, color: "#2A1A18" }}>
          {d.name}
          {d.isStar && <span style={{ color: "#C8552B", marginLeft: 4, fontSize: ".7rem" }}>★</span>}
          {d.isVeg && <span style={{ color: "#4e6236", marginLeft: 4, fontSize: ".58rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".04em" }}>VEG</span>}
        </span>
        <span style={{ borderBottom: "1.5px dotted #E4D9C8", flex: 1, minWidth: 5, transform: "translateY(-3px)" }} />
        {d.price
          ? <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 600, fontSize: ".86rem", color: "#5C1A2B", whiteSpace: "nowrap" }}>{Number(d.price).toFixed(2).replace(".", ",")}€</span>
          : <span style={{ fontFamily: "'Fraunces',serif", fontSize: ".72rem", color: "rgba(180,168,148,.8)", fontWeight: 300, whiteSpace: "nowrap" }}>consultar</span>
        }
      </div>
      {d.description && (
        <div style={{ fontSize: ".71rem", color: "#6A554F", fontStyle: "italic", padding: "0 0 2.5px 1px", lineHeight: 1.22 }}>
          {d.description}
        </div>
      )}
    </div>
  )
}

function SectionBlock({ sec }: { sec: Section }) {
  if (!sec) return null
  const isSalsas = sec.isSalsas

  if (isSalsas) {
    return (
      <div style={{ breakInside: "avoid", pageBreakInside: "avoid" }}>
        <div style={{ background: "#5C1A2B", color: "#fff", borderRadius: 9, padding: "8px 11px" }}>
          <div style={{ fontFamily: "'Fraunces',serif", fontSize: ".96rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
            {sec.title}
            {sec.subtitle && <span style={{ fontSize: ".74rem", marginLeft: "auto", color: "rgba(255,255,255,.85)" }}>{sec.subtitle}</span>}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "3px 10px", fontSize: ".79rem", color: "rgba(255,255,255,.88)" }}>
            {sec.dishes.map((d) => <span key={d.id}>{d.name}</span>)}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ breakInside: "avoid", pageBreakInside: "avoid", marginBottom: "3.5mm" }}>
      {/* Section header */}
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: "3.5mm" }}>
        <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "1.02rem", fontWeight: 700, color: "#5C1A2B", whiteSpace: "nowrap", letterSpacing: ".01em", margin: 0 }}>
          {sec.title}
        </h2>
        <div style={{ flex: 1, height: 1, background: "#E4D9C8" }} />
        {sec.subtitle && (
          <small style={{ fontSize: ".55rem", letterSpacing: ".12em", textTransform: "uppercase", color: "#C8552B", fontWeight: 700, whiteSpace: "nowrap" }}>
            {sec.subtitle}
          </small>
        )}
      </div>
      {sec.dishes.map((d) => <DishRow key={d.id} d={d} />)}
      {sec.note && (
        <div style={{ fontSize: ".67rem", color: "#6A554F", fontStyle: "italic", marginTop: "2.5mm", padding: "2px 0 2px 5px", borderLeft: "2px solid #C8552B" }}>
          {sec.note}
        </div>
      )}
    </div>
  )
}

function PageHeader({ compact }: { compact?: boolean }) {
  if (compact) {
    return (
      <div style={{ background: "#5C1A2B", color: "#fff", padding: "8px 17mm", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexShrink: 0, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: .09, backgroundImage: "radial-gradient(circle at 1px 1px,#fff 1px,transparent 0)", backgroundSize: "12px 12px" }} />
        {LOGO}
        <div style={{ width: 2, height: 20, background: "#C8552B", opacity: .7, position: "relative" }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontFamily: "'Fraunces',serif", fontSize: "1rem", fontWeight: 500, lineHeight: 1.1 }}>El Rebost de Montigalà</div>
          <div style={{ fontSize: ".54rem", letterSpacing: ".2em", textTransform: "uppercase", opacity: .8, fontWeight: 700 }}>Brasería · Tapas · Arroces · Badalona</div>
        </div>
      </div>
    )
  }
  return (
    <div style={{ background: "#5C1A2B", color: "#fff", padding: "9mm 17mm 7mm", textAlign: "center", position: "relative", overflow: "hidden", flexShrink: 0 }}>
      <div style={{ position: "absolute", inset: 0, opacity: .09, backgroundImage: "radial-gradient(circle at 1px 1px,#fff 1px,transparent 0)", backgroundSize: "16px 16px" }} />
      <div style={{ position: "relative" }}>
        {LOGO}
        <div style={{ fontFamily: "'Fraunces',serif", fontSize: "1.82rem", fontWeight: 500, marginTop: 4 }}>El Rebost de Montigalà</div>
        <div style={{ fontSize: ".6rem", letterSpacing: ".24em", textTransform: "uppercase", opacity: .82, fontWeight: 700, marginTop: 2 }}>Brasería · Tapas · Arroces · Badalona</div>
        <div style={{ width: 40, height: 2, background: "#C8552B", margin: "7px auto 0" }} />
      </div>
    </div>
  )
}

export default function PrintCartaClient({ sections }: { sections: Section[] }) {
  useEffect(() => {
    const t = setTimeout(() => window.print(), 600)
    return () => clearTimeout(t)
  }, [])

  const getS = (title: string) => sections.find((s) => s.title === title) as Section

  const pageStyle: React.CSSProperties = {
    width: "210mm",
    height: "297mm",
    background: "#F5EDE0",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    pageBreakAfter: "always",
    breakAfter: "page",
  }

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
        <span style={{ fontFamily: "'Fraunces',serif", fontSize: "1rem" }}>🖨 Imprimir Carta — El Rebost de Montigalà</span>
        <button onClick={() => window.print()} style={{ marginLeft: "auto", background: "#C8552B", color: "#fff", border: "none", borderRadius: 8, padding: "6px 16px", fontWeight: 700, cursor: "pointer" }}>
          Imprimir
        </button>
        <Link href="/admin/carta" style={{ color: "rgba(245,237,224,.7)", fontSize: ".84rem" }}>← Volver</Link>
      </div>

      {/* Pages container */}
      <div style={{ paddingTop: "3rem" }} className="no-print-padding">
        {/* PAGE 1 */}
        <div style={pageStyle}>
          <PageHeader />
          <div style={{ flex: 1, display: "flex", minHeight: 0, padding: "7mm 13mm 0" }}>
            {/* Left */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              {PAGE1_LEFT.map((t) => <SectionBlock key={t} sec={getS(t)} />)}
            </div>
            <div style={{ width: 1, background: "#E4D9C8", margin: "0 7mm", flexShrink: 0 }} />
            {/* Right */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              {PAGE1_RIGHT.map((t) => <SectionBlock key={t} sec={getS(t)} />)}
            </div>
          </div>
          <div style={{ borderTop: "1px solid #E4D9C8", margin: "4mm 13mm 7mm", paddingTop: 4, display: "flex", justifyContent: "space-between", fontSize: ".58rem", color: "#6A554F", flexShrink: 0 }}>
            <span>Carrer Manuel Moreno Mauricio, 35-37 · 08917 Badalona</span>
            <span style={{ fontWeight: 700, color: "#C8552B" }}>934 65 30 00</span>
          </div>
        </div>

        {/* PAGE 2 */}
        <div style={{ ...pageStyle, pageBreakAfter: "auto", breakAfter: "auto" }}>
          <PageHeader compact />
          <div style={{ flex: 1, display: "flex", minHeight: 0, padding: "7mm 13mm 0" }}>
            {/* Left */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              {PAGE2_LEFT.map((t) => <SectionBlock key={t} sec={getS(t)} />)}
            </div>
            <div style={{ width: 1, background: "#E4D9C8", margin: "0 7mm", flexShrink: 0 }} />
            {/* Right */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              {PAGE2_RIGHT.map((t) => <SectionBlock key={t} sec={getS(t)} />)}
            </div>
          </div>
          <div style={{ borderTop: "1px solid #E4D9C8", margin: "4mm 13mm 7mm", paddingTop: 4, display: "flex", justifyContent: "space-between", fontSize: ".58rem", color: "#6A554F", flexShrink: 0 }}>
            <span>Consulta nuestra carta de alérgenos · Precios IVA incluido</span>
            <span style={{ fontWeight: 700, color: "#C8552B" }}>instagram.com/rebostdemontigala</span>
          </div>
        </div>
      </div>
    </>
  )
}
