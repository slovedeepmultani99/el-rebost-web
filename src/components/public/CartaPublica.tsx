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

function Tag({ type }: { type: "star" | "veg" | "sg" }) {
  const styles = {
    star: { bg: "rgba(200,85,43,.16)", color: "var(--ember)", label: "★ Estrella" },
    veg: { bg: "rgba(94,107,62,.16)", color: "var(--olive)", label: "VEG" },
    sg: { bg: "rgba(188,146,85,.18)", color: "#8a6326", label: "SG" },
  }[type]
  return (
    <span
      style={{
        fontSize: ".62rem",
        fontWeight: 800,
        letterSpacing: ".08em",
        textTransform: "uppercase",
        padding: "2px 7px",
        borderRadius: 6,
        background: styles.bg,
        color: styles.color,
        whiteSpace: "nowrap",
      }}
    >
      {styles.label}
    </span>
  )
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

        {/* Section tabs */}
        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: 42,
            borderBottom: "1px solid var(--line)",
            paddingBottom: 18,
          }}
        >
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              style={{
                fontFamily: "var(--font-karla), sans-serif",
                fontWeight: 700,
                fontSize: ".9rem",
                padding: ".5em 1.1em",
                borderRadius: 100,
                border: "none",
                background: s.id === active ? "var(--wine)" : "none",
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
                      {d.isStar && <Tag type="star" />}
                      {d.isVeg && <Tag type="veg" />}
                      {d.isSg && <Tag type="sg" />}
                    </div>
                    {d.description && (
                      <p style={{ fontSize: ".88rem", color: "var(--ink-soft)", marginTop: 2 }}>
                        {d.description}
                      </p>
                    )}
                  </div>
                  {d.price && (
                    <span style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 600, fontSize: "1.14rem", color: "var(--wine)", whiteSpace: "nowrap" }}>
                      {Number(d.price).toFixed(2).replace(".", ",")}€
                    </span>
                  )}
                </div>
              ))}
            </div>

            <p style={{ textAlign: "center", marginTop: 30, fontSize: ".84rem", color: "var(--ink-soft)" }}>
              <Tag type="star" /> Plato más pedido &nbsp;
              <Tag type="veg" /> Vegetariano &nbsp;
              <Tag type="sg" /> Sin gluten bajo petición · Consulta nuestra carta de alérgenos
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
