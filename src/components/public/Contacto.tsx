interface InfoData { readonly tel: string; readonly ig: string; readonly addr: string; readonly email: string }
interface Horario { readonly dias: string; readonly horas: string; readonly nota: string }

// Maps JS day (0=Sun) to the horarios array index based on seed data:
// [0] Lun-Jue, [1] Vie, [2] Sáb, [3] Dom
function getHorarioIdx(day: number): number {
  if (day >= 1 && day <= 4) return 0
  if (day === 5) return 1
  if (day === 6) return 2
  return 3 // Sunday
}

function igHandle(url: string): string {
  if (!url) return url
  if (!url.startsWith("http")) return url
  const parts = url.replace(/\/$/, "").split("/").filter(Boolean)
  return "@" + (parts.at(-1) ?? url)
}

export default function Contacto({ info, horarios }: Readonly<{ info: InfoData; horarios: readonly Horario[] }>) {
  const todayIdx = getHorarioIdx(new Date().getDay())

  const igHref = info.ig.startsWith("http") ? info.ig : `https://instagram.com/${info.ig.replace("@", "")}`
  const igDisplay = igHandle(info.ig)

  return (
    <section
      id="contacto"
      style={{ padding: "96px 0", background: "var(--wine-deep)", color: "var(--cream)", scrollMarginTop: 78 }}
    >
      <div className="wrap">
        <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 54, alignItems: "center" }}>
          {/* Info */}
          <div>
            <div className="eyebrow" style={{ color: "var(--ember-bright)" }}>Encuéntranos</div>
            <h2 style={{ color: "var(--cream)", fontSize: "clamp(2rem,4vw,3rem)", marginBottom: 24 }}>
              Te esperamos en Montigalà
            </h2>

            {[
              { ic: "📍", title: "Dirección", content: info.addr },
              { ic: "📞", title: "Reservas", content: info.tel, href: `tel:+34${info.tel.replace(/\s/g,"")}` },
              { ic: "📸", title: "Síguenos", content: igDisplay, href: igHref },
            ].map((c) => (
              <div key={c.title} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 18 }}>
                <span style={{ width: 42, height: 42, flexShrink: 0, borderRadius: 12, background: "rgba(245,237,224,.1)", display: "grid", placeItems: "center", color: "var(--ember-bright)", fontSize: "1.1rem" }}>
                  {c.ic}
                </span>
                <div style={{ minWidth: 0 }}>
                  <b style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "1.05rem", display: "block" }}>{c.title}</b>
                  {c.href ? (
                    <a href={c.href} style={{ fontSize: ".92rem", color: "rgba(245,237,224,.82)", wordBreak: "break-word" }}>{c.content}</a>
                  ) : (
                    <span style={{ fontSize: ".92rem", color: "rgba(245,237,224,.82)", wordBreak: "break-word" }}>{c.content}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Horarios table */}
            <div style={{ marginTop: 26, borderTop: "1px solid rgba(245,237,224,.2)", paddingTop: 18 }}>
              {horarios.map((h, i) => (
                <div
                  key={h.dias}
                  className="horario-row"
                  style={{
                    fontSize: ".92rem",
                    color: i === todayIdx ? "var(--ember-bright)" : "var(--cream)",
                    fontWeight: i === todayIdx ? 700 : 400,
                  }}
                >
                  <b style={{ fontWeight: 600 }}>
                    {h.dias}{i === todayIdx ? " · hoy" : ""}
                  </b>
                  <span className="horario-time" style={{ opacity: i === todayIdx ? 1 : 0.82 }}>{h.horas}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div style={{ borderRadius: 24, overflow: "hidden", height: "clamp(260px, 50vw, 440px)", position: "relative", boxShadow: "var(--shadow)" }}>
            <iframe
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Carrer+Manuel+Moreno+Mauricio+35+Badalona&output=embed"
              style={{ width: "100%", height: "100%", border: 0, filter: "saturate(.9)" }}
              title="Mapa El Rebost de Montigalà"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
