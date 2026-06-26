import Link from "next/link"

interface HeroData {
  h1a: string
  h1b: string
  lead: string
  cta1: string
  cta2: string
  badge: string
  meta1t: string
  meta1s: string
  meta2t: string
  meta2s: string
  plate1Url?: string
  plate1Badge?: string
  plate1Name?: string
  plate2Url?: string
  plate2Badge?: string
  plate2Name?: string
}

export default function Hero({ data }: { data: HeroData }) {
  const p1Url = data.plate1Url || '/fotos/chuleton.jpg'
  const p1Badge = data.plate1Badge || 'De la brasa'
  const p1Name = data.plate1Name || 'Chuletón madurado'
  const p2Url = data.plate2Url || '/fotos/mariscada2.jpg'
  const p2Badge = data.plate2Badge || 'Casero'
  const p2Name = data.plate2Name || 'Arroz con bogavante'
  return (
    <section
      id="top"
      className="relative overflow-hidden"
      style={{
        background: `
          radial-gradient(120% 90% at 80% 0%, rgba(200,85,43,.30), transparent 55%),
          radial-gradient(100% 80% at 0% 100%, rgba(94,107,62,.22), transparent 55%),
          linear-gradient(160deg, #5C1A2B 0%, #3A0F1B 100%)
        `,
        color: "var(--cream)",
        padding: "clamp(56px,8vw,96px) 0 clamp(50px,7vw,90px)",
      }}
    >
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.10,
          backgroundImage: "radial-gradient(circle at 1px 1px, #F5EDE0 1px, transparent 0)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="mob-stack wrap relative" style={{ display: "grid", gridTemplateColumns: "1.15fr .85fr", gap: 48, alignItems: "center" }}>
        {/* Left: text */}
        <div>
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 mb-5 rounded-full font-bold"
            style={{
              background: "rgba(245,237,224,.12)",
              border: "1px solid rgba(245,237,224,.25)",
              padding: "6px 13px",
              letterSpacing: ".04em",
              fontSize: "clamp(.68rem,.9vw,.74rem)",
              maxWidth: "100%",
            }}
          >
            <span style={{ color: "var(--ember-bright)", letterSpacing: ".06em", flexShrink: 0 }}>★★★★☆</span>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{data.badge.replace("★★★★☆ ", "")}</span>
          </div>

          {/* H1 */}
          <h1
            style={{
              fontSize: "clamp(2.9rem, 6.2vw, 5.3rem)",
              fontWeight: 400,
              letterSpacing: "-0.025em",
              marginBottom: 22,
              lineHeight: 1.04,
            }}
          >
            {data.h1a}
            <br />
            <em style={{ fontStyle: "italic", color: "var(--ember-bright)" }}>{data.h1b}</em>
          </h1>

          {/* Lead */}
          <p
            className="mb-8"
            style={{ fontSize: "clamp(1rem,2.5vw,1.18rem)", maxWidth: "30em", color: "rgba(245,237,224,.86)" }}
          >
            {data.lead}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Link href="#res-form" className="btn btn-primary">{data.cta1}</Link>
            <Link href="#menudia" className="btn btn-cream">{data.cta2}</Link>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-8" style={{ fontSize: ".86rem", color: "rgba(245,237,224,.8)" }}>
            <div>
              <b style={{ display: "block", fontFamily: "var(--font-fraunces), serif", fontSize: "1.45rem", color: "var(--cream)", fontWeight: 500 }}>
                {data.meta1t}
              </b>
              {data.meta1s}
            </div>
            <div>
              <b style={{ display: "block", fontFamily: "var(--font-fraunces), serif", fontSize: "1.45rem", color: "var(--cream)", fontWeight: 500 }}>
                {data.meta2t}
              </b>
              {data.meta2s}
            </div>
          </div>

          {/* Mobile-only food photos — hidden on lg+ where the floating cards are shown */}
          <div className="lg:hidden" style={{ display: "flex", gap: 10, marginTop: 28 }}>
            {[
              { url: p1Url, badge: p1Badge, name: p1Name, tint: "rgba(122,46,22,.35)" },
              { url: p2Url, badge: p2Badge, name: p2Name, tint: "rgba(58,15,27,.35)" },
            ].map((pl) => (
              <div key={pl.url} style={{ flex: 1, borderRadius: 16, overflow: "hidden", position: "relative", height: 154, border: "3px solid rgba(245,237,224,.5)" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(135deg,${pl.tint},rgba(58,15,27,.2)), url('${pl.url}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(58,15,27,.82) 0%, transparent 55%)" }} />
                <div style={{ position: "absolute", bottom: 10, left: 10, right: 10 }}>
                  <span style={{ display: "inline-block", background: "var(--ember)", color: "#fff", fontSize: ".6rem", fontWeight: 700, padding: "2px 8px", borderRadius: 100, letterSpacing: ".08em", marginBottom: 3, textTransform: "uppercase" }}>
                    {pl.badge}
                  </span>
                  <p style={{ margin: 0, fontSize: ".8rem", fontFamily: "var(--font-fraunces), serif", color: "var(--cream)", lineHeight: 1.25 }}>
                    {pl.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: visual */}
        <div className="relative h-[430px] hidden lg:block">
          {/* Plate 1 — top right */}
          {/* Plate 1 — top right */}
          <div
            className="absolute rounded-[20px] overflow-hidden"
            style={{
              width: "62%",
              height: "78%",
              right: 0,
              top: 0,
              border: "6px solid rgba(245,237,224,.9)",
              boxShadow: "0 30px 60px -20px rgba(0,0,0,.6)",
              backgroundImage: `linear-gradient(135deg,rgba(122,46,22,.15),rgba(58,15,27,.4)), url('${p1Url}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{
                padding: "14px 14px 10px",
                background: "linear-gradient(transparent, rgba(58,15,27,.92))",
                color: "var(--cream)",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-karla), sans-serif",
                  fontSize: ".7rem",
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  color: "var(--ember-bright)",
                  fontWeight: 700,
                }}
              >
                {p1Badge}
              </span>
              <span style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "1.05rem" }}>
                {p1Name}
              </span>
            </div>
          </div>

          {/* Plate 2 — bottom left */}
          <div
            className="absolute rounded-[20px] overflow-hidden"
            style={{
              width: "50%",
              height: "55%",
              left: 0,
              bottom: 0,
              border: "6px solid rgba(245,237,224,.9)",
              boxShadow: "0 30px 60px -20px rgba(0,0,0,.6)",
              backgroundImage: `linear-gradient(135deg,rgba(74,90,48,.15),rgba(58,15,27,.4)), url('${p2Url}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{
                padding: "14px 14px 10px",
                background: "linear-gradient(transparent, rgba(58,15,27,.92))",
                color: "var(--cream)",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-karla), sans-serif",
                  fontSize: ".7rem",
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  color: "var(--ember-bright)",
                  fontWeight: 700,
                }}
              >
                {p2Badge}
              </span>
              <span style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "1.05rem" }}>
                {p2Name}
              </span>
            </div>
          </div>

          {/* Flame SVG between plates */}
          <svg
            className="absolute"
            style={{
              left: "46%",
              top: "42%",
              width: 90,
              height: 90,
              transform: "translate(-50%, -50%)",
              zIndex: 3,
              filter: "drop-shadow(0 8px 18px rgba(224,122,51,.6))",
            }}
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M32 4c2 10 12 14 12 26 0 9-5 16-12 16S20 39 20 30c0-5 3-8 5-11 1 4 3 5 5 5-1-7 0-14 2-20z"
              fill="#E07A33"
            />
            <path
              d="M32 22c1 5 6 7 6 13 0 5-3 9-6 9s-6-4-6-9c0-3 2-5 3-7 .5 2 1.5 3 3 3 0-3 0-6 0-9z"
              fill="#F5EDE0"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
