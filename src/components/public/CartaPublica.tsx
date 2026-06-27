"use client"

import { useState, useMemo } from "react"

interface Dish {
  id: string
  name: string
  description: string | null
  price: string | null
  isStar: boolean
  isVeg: boolean
  isSg: boolean
}

interface Section {
  id: string
  title: string
  subtitle: string | null
  note: string | null
  group: string
  isSalsas: boolean
  dishes: Dish[]
}

interface Group {
  name: string
  sections: Section[]
}

function buildGroups(sections: Section[]): Group[] {
  const map = new Map<string, Section[]>()
  for (const s of sections) {
    const g = s.group || "Otros"
    if (!map.has(g)) map.set(g, [])
    map.get(g)!.push(s)
  }
  return [...map.entries()].map(([name, secs]) => ({ name, sections: secs }))
}

export default function CartaPublica({ sections, hidePrice = false }: Readonly<{ sections: Section[]; hidePrice?: boolean }>) {
  const groups = useMemo(() => buildGroups(sections), [sections])
  const [activeGroup, setActiveGroup] = useState(groups[0]?.name ?? "")
  const current = groups.find((g) => g.name === activeGroup)

  return (
    <section
      id="carta"
      style={{ padding: "96px 0", background: "var(--bone)", scrollMarginTop: 78 }}
    >
      <div className="wrap">
        <div className="sec-head center">
          <div className="eyebrow">A la carta · todo el día</div>
          <h2>Nuestra carta</h2>
          <p>De la tapa tradicional al chuletón madurado. Producto, brasa y arroces caseros.</p>
        </div>

        {/* Parent category tabs */}
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: 42,
            paddingBottom: 20,
            borderBottom: "2px solid var(--line)",
          }}
        >
          {groups.map((g) => (
            <button
              key={g.name}
              onClick={() => setActiveGroup(g.name)}
              style={{
                fontFamily: "var(--font-karla), sans-serif",
                fontWeight: 700,
                fontSize: ".92rem",
                padding: ".55em 1.3em",
                borderRadius: 100,
                border: "2px solid",
                borderColor: g.name === activeGroup ? "var(--wine)" : "var(--line)",
                background: g.name === activeGroup ? "var(--wine)" : "#fff",
                color: g.name === activeGroup ? "var(--cream)" : "var(--ink-soft)",
                cursor: "pointer",
                transition: ".2s",
                boxShadow: g.name === activeGroup ? "0 4px 16px rgba(92,26,43,.22)" : "none",
              }}
            >
              {g.name}
            </button>
          ))}
        </div>

        {/* Sections within active group */}
        {current?.sections.map((sec, idx) => (
          <div key={sec.id} style={{ marginBottom: idx < current.sections.length - 1 ? 48 : 0 }}>
            {/* Section header */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap", marginBottom: 6 }}>
              <h3 style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 500, fontSize: "clamp(1.35rem,2.5vw,1.75rem)", color: "var(--wine)", margin: 0 }}>
                {sec.title}
              </h3>
              {sec.subtitle && (
                <span style={{ fontSize: ".85rem", color: "var(--ink-soft)", fontStyle: "italic" }}>
                  {sec.subtitle}
                </span>
              )}
            </div>
            {sec.note && (
              <p style={{ fontSize: ".82rem", color: "var(--ink-soft)", fontStyle: "italic", marginBottom: 14, marginTop: 2 }}>
                {sec.note}
              </p>
            )}

            {/* Divider */}
            <div style={{ height: 2, background: "linear-gradient(to right, var(--wine), transparent)", borderRadius: 2, marginBottom: 16, maxWidth: 120 }} />

            {/* Dishes grid */}
            <div
              className={sec.isSalsas ? "carta-salsas" : "carta-dishes"}
              style={{
                display: "grid",
                gridTemplateColumns: sec.isSalsas ? "repeat(4,1fr)" : "1fr 1fr",
                gap: sec.isSalsas ? "14px" : "0 48px",
                maxWidth: 1000,
              }}
            >
              {sec.dishes.map((d) => (
                <div
                  key={d.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    padding: "13px 0",
                    borderBottom: "1px solid var(--line)",
                    alignItems: "baseline",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
                      {d.isStar && <span style={{ color: "var(--ember)", fontSize: ".7rem" }}>★</span>}
                      <b style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 500, fontSize: "1.08rem" }}>
                        {d.name}
                      </b>
                      {d.isVeg && <span style={{ fontSize: ".62rem", fontWeight: 700, color: "var(--olive)", border: "1px solid var(--olive)", borderRadius: 4, padding: "1px 4px" }}>VG</span>}
                      {d.isSg && <span style={{ fontSize: ".62rem", fontWeight: 700, color: "var(--gold)", border: "1px solid var(--gold)", borderRadius: 4, padding: "1px 4px" }}>SG</span>}
                    </div>
                    {d.description && (
                      <p style={{ fontSize: ".84rem", color: "var(--ink-soft)", marginTop: 2, margin: 0 }}>
                        {d.description}
                      </p>
                    )}
                  </div>
                  {d.price && !hidePrice && (
                    <span style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 500, fontSize: "1rem", color: "var(--wine)", flexShrink: 0, whiteSpace: "nowrap" }}>
                      {d.price} €
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
