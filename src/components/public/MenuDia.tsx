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
const WEEKEND_DAYS = [5, 6, 0]

export default function MenuDia({ menus, today, isNextDay = false }: Readonly<{ menus: DailyMenu[]; today: number; isNextDay?: boolean }>) {
  const menuMap = Object.fromEntries(menus.map((m) => [m.dayOfWeek, m]))
  const menu = menuMap[today]

  const isWeekend = WEEKEND_DAYS.includes(today)

  const primeros = menu?.dishes.filter((d) => d.course === "primero" && !d.isSupplement) ?? []
  const suplPrimeros = menu?.dishes.filter((d) => d.course === "primero" && d.isSupplement) ?? []
  const segundos = menu?.dishes.filter((d) => d.course === "segundo" && !d.isSupplement) ?? []
  const suplSegundos = menu?.dishes.filter((d) => d.course === "segundo" && d.isSupplement) ?? []

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
                  {isNextDay ? "Menú de mañana · avance" : "Menú de hoy · actualizado"}
                </div>
                <h3 style={{ fontSize: "1.9rem", fontWeight: 500, marginTop: 4 }}>
                  {DAY_NAMES[today]}{isWeekend ? " · Fin de semana" : ""}
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
                  <div key={d.id} style={{ padding: "9px 0", borderBottom: "1px dashed var(--line)" }}>
                    <b style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 500, fontSize: "1.06rem" }}>{d.name}</b>
                    {d.description && <p style={{ fontSize: ".84rem", color: "var(--ink-soft)", marginTop: 1 }}>{d.description}</p>}
                  </div>
                ))}
                {suplPrimeros.map((d) => (
                  <div key={d.id} style={{ padding: "8px 10px", margin: "6px 0 0", borderRadius: 8, background: "rgba(200,85,43,.07)", border: "1px dashed rgba(200,85,43,.3)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                      <b style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 500, fontSize: "1rem", color: "var(--ember)" }}>+ {d.name}</b>
                      {d.suppPrice && <span style={{ fontSize: ".78rem", fontWeight: 800, color: "var(--ember)", whiteSpace: "nowrap" }}>{d.suppPrice}</span>}
                    </div>
                    {d.description && <p style={{ fontSize: ".82rem", color: "var(--ink-soft)", marginTop: 1 }}>{d.description}</p>}
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
                  <div key={d.id} style={{ padding: "9px 0", borderBottom: "1px dashed var(--line)" }}>
                    <b style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 500, fontSize: "1.06rem" }}>{d.name}</b>
                    {d.description && <p style={{ fontSize: ".84rem", color: "var(--ink-soft)", marginTop: 1 }}>{d.description}</p>}
                  </div>
                ))}
                {suplSegundos.map((d) => (
                  <div key={d.id} style={{ padding: "8px 10px", margin: "6px 0 0", borderRadius: 8, background: "rgba(200,85,43,.07)", border: "1px dashed rgba(200,85,43,.3)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                      <b style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 500, fontSize: "1rem", color: "var(--ember)" }}>+ {d.name}</b>
                      {d.suppPrice && <span style={{ fontSize: ".78rem", fontWeight: 800, color: "var(--ember)", whiteSpace: "nowrap" }}>{d.suppPrice}</span>}
                    </div>
                    {d.description && <p style={{ fontSize: ".82rem", color: "var(--ink-soft)", marginTop: 1 }}>{d.description}</p>}
                  </div>
                ))}
              </div>

              {/* Footer: postre */}
              <div
                style={{
                  gridColumn: "1 / -1",
                  paddingTop: 18,
                  borderTop: "2px solid var(--line)",
                  fontSize: ".88rem",
                  color: "var(--ink-soft)",
                }}
              >
                🍮 <b>Postre:</b> {menu.postre}
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
