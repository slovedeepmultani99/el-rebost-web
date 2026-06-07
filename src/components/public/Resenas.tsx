const REVIEWS = [
  { n: "Felipe R.", s: "Google · Local Guide", t: "Con los nuevos dueños el restaurante ha dado un cambio radical. Atención cercana, precios razonables y comida excelente. El arroz, espectacular.", av: "F" },
  { n: "Marta C.", s: "Tripadvisor", t: "De lo mejor de Montigalà. Probamos el chuletón y el arroz con bogavante: cantidad muy generosa y producto de primera. Volveremos seguro.", av: "M" },
  { n: "Jordi P.", s: "Google", t: "Comimos de menú diario y sorprende: variado, casero y muy bien de precio. El trato del personal, de diez. Cada plato tiene su historia.", av: "J" },
  { n: "Sara L.", s: "Restaurant Guru", t: "Buena variedad y porciones generosas. Las croquetas de jamón y la crema catalana, imprescindibles. Ambiente acogedor y rústico.", av: "S" },
  { n: "Raúl F.", s: "Google", t: "Algo apartado pero cerca del centro comercial. Comida genial, buena calidad de producto y servicio rápido. Ideal para ir con la familia.", av: "R" },
  { n: "Anna M.", s: "Tripadvisor", t: "Perfectos para grupos. Fuimos una comida de empresa de más de 30 personas y todo impecable: menú cerrado estupendo y muy bien atendidos.", av: "A" },
]

const BARS = [
  { lbl: "🍽 Comida", pct: 90, val: "4,5" },
  { lbl: "🤝 Servicio", pct: 88, val: "4,4" },
  { lbl: "🏡 Ambiente", pct: 84, val: "4,2" },
  { lbl: "💶 Calidad-precio", pct: 82, val: "4,1" },
]

export default function Resenas() {
  return (
    <section id="resenas" style={{ padding: "96px 0", background: "var(--bone)", scrollMarginTop: 78 }}>
      <div className="wrap">
        <div className="sec-head center">
          <div className="eyebrow">Lo que dicen nuestros clientes</div>
          <h2>Reseñas</h2>
        </div>

        {/* Score + bars */}
        <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: ".7fr 1.3fr", gap: 48, alignItems: "center", marginBottom: 48 }}>
          <div style={{ background: "var(--wine)", color: "var(--cream)", borderRadius: 24, padding: 36, textAlign: "center", boxShadow: "var(--shadow)" }}>
            <div style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "4.4rem", fontWeight: 500, lineHeight: 1, color: "var(--ember-bright)" }}>4,1</div>
            <div style={{ color: "var(--ember-bright)", fontSize: "1.3rem", letterSpacing: ".12em", margin: "6px 0" }}>★★★★☆</div>
            <div style={{ fontSize: ".88rem", color: "rgba(245,237,224,.8)" }}>Media de Google, Tripadvisor y Restaurant Guru<br />+4.000 valoraciones</div>
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            {BARS.map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: ".86rem" }}>
                <span style={{ width: 130, color: "var(--ink-soft)", fontWeight: 600, flexShrink: 0 }}>{b.lbl}</span>
                <span style={{ flex: 1, height: 9, background: "var(--cream)", borderRadius: 100, overflow: "hidden" }}>
                  <span style={{ display: "block", height: "100%", width: `${b.pct}%`, background: "linear-gradient(90deg, var(--ember), var(--gold))", borderRadius: 100 }} />
                </span>
                <span style={{ width: 40, textAlign: "right", fontWeight: 700, color: "var(--wine)" }}>{b.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Review cards */}
        <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {REVIEWS.map((r, i) => (
            <div key={i} className="rev-card-hover" style={{ background: "var(--bone)", border: "1px solid var(--line)", borderRadius: 18, padding: 24, transition: "transform .3s, box-shadow .3s" }}>
              <div style={{ color: "var(--ember)", letterSpacing: ".1em", fontSize: ".92rem", marginBottom: 10 }}>★★★★★</div>
              <p style={{ fontSize: ".96rem", color: "var(--ink)", marginBottom: 16, fontStyle: "italic" }}>&ldquo;{r.t}&rdquo;</p>
              <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--wine)", color: "var(--cream)", display: "grid", placeItems: "center", fontFamily: "var(--font-fraunces), serif", fontWeight: 600, flexShrink: 0 }}>
                  {r.av}
                </div>
                <div>
                  <b style={{ fontSize: ".92rem", display: "block" }}>{r.n}</b>
                  <span style={{ fontSize: ".76rem", color: "var(--ink-soft)" }}>{r.s}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", marginTop: 30 }}>
          <a href="https://www.google.com/maps/search/El+Rebost+de+Montigala+Badalona" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            Leer todas las reseñas en Google →
          </a>
        </p>
      </div>
    </section>
  )
}
