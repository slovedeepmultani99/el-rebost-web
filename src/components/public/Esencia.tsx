interface CasaData { eyebrow: string; heading: string; p1: string; p2: string }
interface Feature { icon: string; title: string; desc: string }
interface Stat { num: string; text: string }

export default function Esencia({
  casa,
  features,
  stats,
}: {
  casa: CasaData
  features: Feature[]
  stats: Stat[]
}) {
  return (
    <section id="esencia" style={{ padding: "96px 0", background: "var(--bone)", scrollMarginTop: 78 }}>
      <div className="wrap">
        <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          {/* Left: text + features */}
          <div>
            <div className="eyebrow mb-3">{casa.eyebrow}</div>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 400, margin: "14px 0 20px" }}>
              {casa.heading}
            </h2>
            <p style={{ color: "var(--ink-soft)", marginBottom: 16, fontSize: "1.05rem" }}>{casa.p1}</p>
            <p style={{ color: "var(--ink-soft)", marginBottom: 26, fontSize: "1.05rem" }}>{casa.p2}</p>

            {/* Features 2×2 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              {features.map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span
                    style={{
                      width: 38,
                      height: 38,
                      flexShrink: 0,
                      borderRadius: 11,
                      background: "var(--cream)",
                      display: "grid",
                      placeItems: "center",
                      color: "var(--ember)",
                      fontSize: "1.2rem",
                    }}
                  >
                    {f.icon}
                  </span>
                  <div>
                    <b style={{ display: "block", fontFamily: "var(--font-fraunces), serif", fontWeight: 600, fontSize: "1.02rem" }}>
                      {f.title}
                    </b>
                    <span style={{ fontSize: ".88rem", color: "var(--ink-soft)" }}>{f.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: stats card */}
          <div
            style={{
              background: "var(--wine)",
              color: "var(--cream)",
              borderRadius: 24,
              padding: "44px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 34,
              boxShadow: "var(--shadow)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: 0.12,
                backgroundImage: "radial-gradient(circle at 1px 1px, var(--cream) 1px, transparent 0)",
                backgroundSize: "22px 22px",
              }}
            />
            {stats.map((s, i) => (
              <div key={i} style={{ position: "relative" }}>
                <b
                  style={{
                    fontFamily: "var(--font-fraunces), serif",
                    fontSize: "2.8rem",
                    fontWeight: 500,
                    display: "block",
                    color: "var(--ember-bright)",
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </b>
                <span style={{ fontSize: ".92rem", color: "rgba(245,237,224,.82)" }}>{s.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
