"use client"

import { useState } from "react"

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
  isSalsas: boolean
  dishes: Dish[]
}


export default function CartaPublica({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "")
  const current = sections.find((s) => s.id === active)

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

        {/* Section tabs — horizontal scroll on mobile */}
        <div
          className="carta-tabs"
          style={{
            marginBottom: 32,
            paddingBottom: 12,
            borderBottom: "1px solid var(--line)",
          }}
        >
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              style={{
                flexShrink: 0,
                scrollSnapAlign: "start",
                whiteSpace: "nowrap",
                fontFamily: "var(--font-karla), sans-serif",
                fontWeight: 700,
                fontSize: ".88rem",
                padding: ".5em 1.1em",
                borderRadius: 100,
                border: "1.5px solid",
                borderColor: s.id === active ? "var(--wine)" : "var(--line)",
                background: s.id === active ? "var(--wine)" : "transparent",
                color: s.id === active ? "var(--cream)" : "var(--ink-soft)",
                cursor: "pointer",
                transition: ".2s",
              }}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Dishes grid */}
        {current && (
          <div>
            {(current.subtitle || current.note) && (
              <p style={{ textAlign: "center", color: "var(--ink-soft)", fontSize: ".9rem", fontStyle: "italic", marginBottom: 24 }}>
                {current.subtitle} {current.note && `· ${current.note}`}
              </p>
            )}
            <div
              className={current.isSalsas ? "carta-salsas" : "carta-dishes"}
              style={{
                display: "grid",
                gridTemplateColumns: current.isSalsas ? "repeat(4,1fr)" : "1fr 1fr",
                gap: current.isSalsas ? "14px 14px" : "0 48px",
                maxWidth: 1000,
                margin: "0 auto",
              }}
            >
              {current.dishes.map((d) => (
                <div
                  key={d.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 16,
                    padding: "15px 0",
                    borderBottom: "1px solid var(--line)",
                    alignItems: "baseline",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                      <b style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 500, fontSize: "1.14rem" }}>
                        {d.name}
                      </b>
                    </div>
                    {d.description && (
                      <p style={{ fontSize: ".88rem", color: "var(--ink-soft)", marginTop: 2 }}>
                        {d.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    </section>
  )
}
