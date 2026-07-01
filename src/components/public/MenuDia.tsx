"use client"

import { useLang } from "@/i18n/context"

interface DailyDish {
  id: string; course: string
  name: string; name_ca?: string | null
  description: string | null; description_ca?: string | null
  isSupplement: boolean; suppPrice: string | null
}
interface DailyMenu {
  id: string; dayOfWeek: number; price: string; postre: string
  inclBread: boolean; inclDrink: boolean; inclCoffee: boolean; inclDessert: boolean
  active: boolean; dishes: DailyDish[]
}

const DAY_NAMES_ES = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
const DAY_NAMES_CA = ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"]
const DAY_NAMES_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const WEEKEND_DAYS = new Set([5, 6, 0])

function dayName(day: number, locale: string): string {
  if (locale === "ca") return DAY_NAMES_CA[day]
  if (locale === "en") return DAY_NAMES_EN[day]
  return DAY_NAMES_ES[day]
}

function weekendLabel(locale: string): string {
  if (locale === "ca") return " · Cap de setmana"
  if (locale === "en") return " · Weekend"
  return " · Fin de semana"
}

function dishName(d: DailyDish, locale: string): string {
  return locale === "ca" && d.name_ca ? d.name_ca : d.name
}

function dishDesc(d: DailyDish, locale: string): string | null {
  return locale === "ca" && d.description_ca ? d.description_ca : d.description
}

function buildInclusions(m: DailyMenu, labels: { pan: string; bebida: string; cafe: string; postre: string }): string[] {
  return ([
    m.inclBread && labels.pan,
    m.inclDrink && labels.bebida,
    m.inclCoffee && labels.cafe,
    m.inclDessert && labels.postre,
  ] as Array<string | false>).filter(Boolean) as string[]
}

function DishRow({ d, locale }: Readonly<{ d: DailyDish; locale: string }>) {
  const desc = dishDesc(d, locale)
  return (
    <div style={{ padding: "9px 0", borderBottom: "1px dashed var(--line)" }}>
      <b style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 500, fontSize: "1.06rem" }}>
        {dishName(d, locale)}
      </b>
      {desc && <p style={{ fontSize: ".84rem", color: "var(--ink-soft)", marginTop: 1 }}>{desc}</p>}
    </div>
  )
}

function SuplRow({ d, locale }: Readonly<{ d: DailyDish; locale: string }>) {
  const desc = dishDesc(d, locale)
  return (
    <div style={{ padding: "8px 10px", margin: "6px 0 0", borderRadius: 8, background: "rgba(200,85,43,.07)", border: "1px dashed rgba(200,85,43,.3)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
        <b style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 500, fontSize: "1rem", color: "var(--ember)" }}>
          + {dishName(d, locale)}
        </b>
        {d.suppPrice && <span style={{ fontSize: ".78rem", fontWeight: 800, color: "var(--ember)", whiteSpace: "nowrap" }}>{d.suppPrice}</span>}
      </div>
      {desc && <p style={{ fontSize: ".82rem", color: "var(--ink-soft)", marginTop: 1 }}>{desc}</p>}
    </div>
  )
}

export default function MenuDia({ menus, today, isNextDay = false }: Readonly<{ menus: DailyMenu[]; today: number; isNextDay?: boolean }>) {
  const { locale, tr } = useLang()
  const menuMap = Object.fromEntries(menus.map((m) => [m.dayOfWeek, m]))
  const menu = menuMap[today]
  const isWeekend = WEEKEND_DAYS.has(today)

  const dishes       = menu?.dishes ?? []
  const primeros     = dishes.filter((d) => d.course === "primero" && !d.isSupplement)
  const suplPrimeros = dishes.filter((d) => d.course === "primero" && d.isSupplement)
  const segundos     = dishes.filter((d) => d.course === "segundo" && !d.isSupplement)
  const suplSegundos = dishes.filter((d) => d.course === "segundo" && d.isSupplement)

  const inclusions = menu ? buildInclusions(menu, tr.menu) : []

  return (
    <section id="menudia" style={{ padding: "96px 0", background: "linear-gradient(180deg, var(--cream), #efe4d3)", scrollMarginTop: 78 }}>
      <div className="wrap">
        <div className="sec-head center">
          <div className="eyebrow">{tr.menu.eyebrow}</div>
          <h2>{tr.menu.title}</h2>
          <p>{tr.menu.notAvailable.replace("para este día", "—").replace("per a aquest dia", "—").replace("for today", "—")}</p>
        </div>

        {menu?.active ? (
          <div style={{ maxWidth: 880, margin: "0 auto", background: "var(--bone)", borderRadius: 26, boxShadow: "var(--shadow)", overflow: "hidden", border: "1px solid var(--line)" }}>
            {/* Header */}
            <div style={{ background: isWeekend ? "linear-gradient(120deg, var(--ember), var(--wine-soft))" : "var(--wine)", color: "var(--cream)", padding: "28px 38px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: ".72rem", letterSpacing: ".16em", textTransform: "uppercase", fontWeight: 700, color: isWeekend ? "var(--cream)" : "var(--ember-bright)" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: isWeekend ? "var(--cream)" : "var(--ember-bright)", display: "inline-block" }} />
                  {isNextDay ? tr.menu.tomorrow : tr.menu.today}
                </div>
                <h3 style={{ fontSize: "1.9rem", fontWeight: 500, marginTop: 4 }}>
                  {dayName(today, locale)}{isWeekend && weekendLabel(locale)}
                </h3>
              </div>
              <div style={{ textAlign: "right" }}>
                <b style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "2.6rem", fontWeight: 500, lineHeight: 1, display: "block" }}>{menu.price}</b>
                <span style={{ fontSize: ".78rem", letterSpacing: ".05em", opacity: 0.85 }}>
                  {inclusions.length > 0 ? `${tr.menu.includes}: ${inclusions.join(", ")}` : "IVA incl."}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="mob-stack" style={{ padding: "34px 38px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 34 }}>
              <div>
                <h4 style={{ fontFamily: "var(--font-karla), sans-serif", fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase", fontSize: ".76rem", color: "var(--ember)", paddingBottom: 10, borderBottom: "2px solid var(--line)", marginBottom: 14 }}>
                  {tr.menu.choosePrimero}
                </h4>
                {primeros.map((d) => <DishRow key={d.id} d={d} locale={locale} />)}
                {suplPrimeros.map((d) => <SuplRow key={d.id} d={d} locale={locale} />)}
              </div>

              <div>
                <h4 style={{ fontFamily: "var(--font-karla), sans-serif", fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase", fontSize: ".76rem", color: "var(--ember)", paddingBottom: 10, borderBottom: "2px solid var(--line)", marginBottom: 14 }}>
                  {tr.menu.chooseSegundo}
                </h4>
                {segundos.map((d) => <DishRow key={d.id} d={d} locale={locale} />)}
                {suplSegundos.map((d) => <SuplRow key={d.id} d={d} locale={locale} />)}
              </div>

              <div style={{ gridColumn: "1 / -1", paddingTop: 18, borderTop: "2px solid var(--line)", fontSize: ".88rem", color: "var(--ink-soft)" }}>
                🍮 <b>{tr.menu.dessert}:</b> {menu.postre}
              </div>
            </div>
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "var(--ink-soft)" }}>{tr.menu.notAvailable}</p>
        )}
      </div>
    </section>
  )
}
