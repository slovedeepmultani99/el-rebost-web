"use client"

import { useState } from "react"

interface DailyDish {
  id: string
  course: string
  name: string
  description: string | null
  isSupplement: boolean
  suppPrice: string | null
}

interface DailyMenu {
  id: string
  dayOfWeek: number
  price: string
  postre: string
  inclBread: boolean
  inclDrink: boolean
  inclCoffee: boolean
  inclDessert: boolean
  active: boolean
  dishes: DailyDish[]
}

const DAY_NAMES = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
const DAY_SHORT = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
const TAB_ORDER = [1, 2, 3, 4, 5, 6, 0]
const WEEKEND_DAYS = [5, 6, 0]

export default function MenuDia({ menus, today }: { menus: DailyMenu[]; today: number }) {
  const [activeDay, setActiveDay] = useState(today)

  const menuMap = Object.fromEntries(menus.map((m) => [m.dayOfWeek, m]))
  const menu = menuMap[activeDay]

  const isWeekend = WEEKEND_DAYS.includes(activeDay)
  const isToday = activeDay === today

  const primeros = menu?.dishes.filter((d) => d.course === "primero" && !d.isSupplement) ?? []
  const segundos = menu?.dishes.filter((d) => d.course === "segundo" && !d.isSupplement) ?? []
  const suplementos = menu?.dishes.filter((d) => d.isSupplement) ?? []

  const inclusions = !menu ? [] : [
    menu.inclBread && "Pan",
    menu.inclDrink && "Bebida",
    menu.inclCoffee && "Café",
    menu.inclDessert && "Postre",
  ].filter(Boolean) as string[]

  return (
    <section
      id="menudia"
      style={{
        padding: "96px 0",
        background: "linear-gradient(180deg, var(--cream), #efe4d3)",
        scrollMarginTop: 78,
      }}
    >
      <div className="wrap">
        <div className="sec-head center">
          <div className="eyebrow">Se actualiza cada día</div>
          <h2>El menú del día</h2>
          <p>Casero, variado y a un precio justo. Cambia cada jornada según el mercado.</p>
        </div>

        {/* Day tabs */}
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          {TAB_ORDER.map((d) => {
            const isWe = WEEKEND_DAYS.includes(d)
            const isActive = d === activeDay
            return (
              <button
                key={d}
                onClick={() => setActiveDay(d)}
                style={{
                  fontFamily: "var(--font-karla), sans-serif",
                  fontWeight: 700,
                  fontSize: ".82rem",
                  letterSpacing: ".04em",
                  padding: ".6em 1.1em",
                  borderRadius: 100,
                  border: `1.5px solid ${isActive ? (isWe ? "var(--ember)" : "var(--wine)") : "var(--line)"}`,
                  background: isActive ? (isWe ? "var(--ember)" : "var(--wine)") : "var(--bone)",
                  color: isActive ? "var(--cream)" : "var(--ink-soft)",
                  cursor: "pointer",
                  transition: ".25s",
                }}
              >
                {DAY_SHORT[d]}
                {d === today ? " · hoy" : ""}
              </button>
            )
          })}
        </div>

        {/* Menu card */}
        {menu && menu.active ? (
          <div
            style={{
              maxWidth: 880,
              margin: "0 auto",
              background: "var(--bone)",
              borderRadius: 26,
              boxShadow: "var(--shadow)",
              overflow: "hidden",
              border: "1px solid var(--line)",
            }}
          >
            {/* Card header */}
            <div
              style={{
                background: isWeekend
                  ? "linear-gradient(120deg, var(--ember), var(--wine-soft))"
                  : "var(--wine)",
                color: "var(--cream)",
                padding: "28px 38px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 14,
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    fontSize: ".72rem",
                    letterSpacing: ".16em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    color: isWeekend ? "var(--cream)" : "var(--ember-bright)",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: isWeekend ? "var(--cream)" : "var(--ember-bright)",
                      display: "inline-block",
                    }}
                  />
                  {isToday ? "Menú de hoy · actualizado" : `Propuesta de ${DAY_NAMES[activeDay].toLowerCase()}`}
                </div>
                <h3 style={{ fontSize: "1.9rem", fontWeight: 500, marginTop: 4 }}>
                  {DAY_NAMES[activeDay]}{isWeekend ? " · Fin de semana" : ""}
                </h3>
              </div>
              <div style={{ textAlign: "right" }}>
                <b style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "2.6rem", fontWeight: 500, lineHeight: 1, display: "block" }}>
                  {menu.price}
                </b>
                <span style={{ fontSize: ".78rem", letterSpacing: ".05em", opacity: 0.85 }}>
                  {inclusions.length > 0 ? `Incluye: ${inclusions.join(", ")}` : "IVA incluido"}
                </span>
              </div>
            </div>

            {/* Card body */}
            <div
              className="mob-stack"
              style={{
                padding: "34px 38px 40px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 34,
              }}
            >
              {/* Primeros */}
              <div>
                <h4
                  style={{
                    fontFamily: "var(--font-karla), sans-serif",
                    fontWeight: 800,
                    letterSpacing: ".16em",
                    textTransform: "uppercase",
                    fontSize: ".76rem",
                    color: "var(--ember)",
                    paddingBottom: 10,
                    borderBottom: "2px solid var(--line)",
                    marginBottom: 14,
                  }}
                >
                  Para empezar — elige uno
                </h4>
                {primeros.map((d) => (
                  <div
                    key={d.id}
                    style={{ padding: "9px 0", borderBottom: "1px dashed var(--line)" }}
                  >
                    <b style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 500, fontSize: "1.06rem" }}>
                      {d.name}
                    </b>
                    {d.description && (
                      <p style={{ fontSize: ".84rem", color: "var(--ink-soft)", marginTop: 1 }}>
                        {d.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Segundos */}
              <div>
                <h4
                  style={{
                    fontFamily: "var(--font-karla), sans-serif",
                    fontWeight: 800,
                    letterSpacing: ".16em",
                    textTransform: "uppercase",
                    fontSize: ".76rem",
                    color: "var(--ember)",
                    paddingBottom: 10,
                    borderBottom: "2px solid var(--line)",
                    marginBottom: 14,
                  }}
                >
                  Principal — elige uno
                </h4>
                {segundos.map((d) => (
                  <div
                    key={d.id}
                    style={{ padding: "9px 0", borderBottom: "1px dashed var(--line)" }}
                  >
                    <b style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 500, fontSize: "1.06rem" }}>
                      {d.name}
                    </b>
                    {d.description && (
                      <p style={{ fontSize: ".84rem", color: "var(--ink-soft)", marginTop: 1 }}>
                        {d.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer: postre + suplementos */}
              <div
                style={{
                  gridColumn: "1 / -1",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 14,
                  paddingTop: 18,
                  borderTop: "2px solid var(--line)",
                  fontSize: ".88rem",
                  color: "var(--ink-soft)",
                }}
              >
                <span>
                  🍮 <b>Postre:</b> {menu.postre}
                </span>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {suplementos.map((s) => (
                    <span
                      key={s.id}
                      style={{
                        fontSize: ".62rem",
                        fontWeight: 800,
                        letterSpacing: ".08em",
                        textTransform: "uppercase",
                        padding: "2px 7px",
                        borderRadius: 6,
                        background: "rgba(200,85,43,.16)",
                        color: "var(--ember)",
                      }}
                    >
                      + {s.name} {s.suppPrice && `(${s.suppPrice})`}
                    </span>
                  ))}
                  <span
                    style={{
                      fontSize: ".62rem",
                      fontWeight: 800,
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                      padding: "2px 7px",
                      borderRadius: 6,
                      background: "rgba(94,107,62,.16)",
                      color: "var(--olive)",
                    }}
                  >
                    VEG disponible
                  </span>
                  <span
                    style={{
                      fontSize: ".62rem",
                      fontWeight: 800,
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                      padding: "2px 7px",
                      borderRadius: 6,
                      background: "rgba(188,146,85,.18)",
                      color: "#8a6326",
                    }}
                  >
                    SG bajo petición
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "var(--ink-soft)" }}>
            No hay menú disponible para este día.
          </p>
        )}
      </div>
    </section>
  )
}
