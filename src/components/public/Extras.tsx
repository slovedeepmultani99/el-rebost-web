import { WaIcon, waTakeawayUrl, waReservaUrl } from "./WhatsAppButton"

export default function Extras() {
  return (
    <section id="extras" style={{ padding: "96px 0", background: "var(--bone)", scrollMarginTop: 78 }}>
      <div className="wrap">
        <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24, marginBottom: 24 }}>
          {/* Events */}
          <div
            style={{
              borderRadius: 24,
              padding: 42,
              color: "var(--cream)",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              minHeight: 300,
              background: "linear-gradient(140deg, var(--wine), var(--wine-deep))",
              boxShadow: "var(--shadow)",
            }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ opacity: .12, backgroundImage: "radial-gradient(circle at 1px 1px,var(--cream) 1px,transparent 0)", backgroundSize: "22px 22px" }} />
            <div style={{ position: "relative" }}>
              <div className="eyebrow" style={{ color: "var(--ember-bright)" }}>Grupos · empresas · celebraciones</div>
              <h3 style={{ fontSize: "2rem", color: "var(--cream)", margin: "10px 0 12px" }}>Tu evento, como en casa</h3>
              <p style={{ color: "rgba(245,237,224,.85)", marginBottom: 20 }}>
                Bautizos, comidas de empresa, cumpleaños y comuniones. Salón para hasta 45 comensales y menús cerrados a tu medida con la mejor relación calidad-precio.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a href="#reservas" className="btn btn-cream">Pedir presupuesto</a>
                <a
                  href={waReservaUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-light"
                >
                  <WaIcon size={17} /> WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Takeaway */}
          <div
            style={{
              borderRadius: 24,
              padding: 42,
              color: "var(--cream)",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              minHeight: 300,
              background: "linear-gradient(140deg, var(--olive), #3f4a29)",
              boxShadow: "var(--shadow)",
            }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ opacity: .12, backgroundImage: "radial-gradient(circle at 1px 1px,var(--cream) 1px,transparent 0)", backgroundSize: "22px 22px" }} />
            <div style={{ position: "relative" }}>
              <div className="eyebrow" style={{ color: "#cfe0a0" }}>Para llevar</div>
              <h3 style={{ fontSize: "2rem", color: "var(--cream)", margin: "10px 0 12px" }}>Take away</h3>
              <p style={{ color: "rgba(245,237,224,.85)", marginBottom: 20 }}>
                ¿Te apetece nuestra cocina en casa? Pide tu arroz, tu brasa o tus tapas para recoger.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a href="tel:+34934653000" className="btn btn-cream">Llamar</a>
                <a
                  href={waTakeawayUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-light"
                >
                  <WaIcon size={17} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  )
}
