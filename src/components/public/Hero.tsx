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
}

export default function Hero({ data }: { data: HeroData }) {
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
        padding: "96px 0 90px",
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

      <div className="wrap relative" style={{ display: "grid", gridTemplateColumns: "1.15fr .85fr", gap: 48, alignItems: "center" }}>
        {/* Left: text */}
        <div>
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 mb-6 rounded-full text-xs font-bold"
            style={{
              background: "rgba(245,237,224,.12)",
              border: "1px solid rgba(245,237,224,.25)",
              padding: "7px 15px",
              letterSpacing: ".05em",
            }}
          >
            <span style={{ color: "var(--ember-bright)", letterSpacing: ".08em" }}>★★★★☆</span>
            {data.badge.replace("★★★★☆ ", "")}
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
            style={{ fontSize: "1.18rem", maxWidth: "30em", color: "rgba(245,237,224,.86)" }}
          >
            {data.lead}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Link href="#reservas" className="btn btn-primary">{data.cta1}</Link>
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
        </div>

        {/* Right: visual */}
        <div className="relative h-[430px] hidden lg:block">
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
              backgroundImage:
                "linear-gradient(135deg,rgba(122,46,22,.2),rgba(58,15,27,.5)), url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=70')",
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
                De la brasa
              </span>
              <span style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "1.05rem" }}>
                Chuletón madurado
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
              backgroundImage:
                "linear-gradient(135deg,rgba(74,90,48,.2),rgba(58,15,27,.45)), url('https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=600&q=70')",
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
                Casero
              </span>
              <span style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "1.05rem" }}>
                Arroz con bogavante
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
