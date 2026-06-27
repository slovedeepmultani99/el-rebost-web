const FAQS = [
  {
    q: "¿Cuánto cuesta el menú del día en El Rebost de Montigalà?",
    a: "El menú del día cuesta 16 € (IVA incluido) e incluye primer plato, segundo plato, pan, bebida y postre o café. Cambia cada día según el mercado y está disponible de lunes a domingo a mediodía.",
  },
  {
    q: "¿Cuál es el horario de El Rebost de Montigalà?",
    a: "Abrimos de lunes a domingo para comidas de mediodía de 11:30 a 17:00 h. Las cenas están disponibles de miércoles a sábado, de 19:30 a 23:00 h (hasta las 24:00 h en viernes y sábado).",
  },
  {
    q: "¿Dónde está El Rebost de Montigalà?",
    a: "Estamos en el Carrer Manuel Moreno Mauricio 35-37, barrio de Montigalà, Badalona (08917). A 10 minutos de Barcelona, cerca de Santa Coloma de Gramenet, El Masnou y Montgat. Hay aparcamiento fácil junto al Centre Comercial Montigalà y un parking a 80 m.",
  },
  {
    q: "¿Se puede reservar mesa online en El Rebost de Montigalà?",
    a: "Sí, puedes hacer tu reserva directamente desde el formulario de nuestra web. También puedes llamarnos al 934 65 30 00. Para grupos de más de 40 personas es necesario contactar por teléfono para acordar un menú a medida.",
  },
  {
    q: "¿Hacéis menús para grupos y eventos en Badalona?",
    a: "Sí, disponemos de salón privado para hasta 45 comensales y ofrecemos menús cerrados a medida para bodas, bautizos, comuniones, cumpleaños y comidas de empresa en Badalona y alrededores.",
  },
  {
    q: "¿Hay parking cerca del restaurante?",
    a: "Sí, hay aparcamiento gratuito muy fácil junto al Centre Comercial Montigalà y un parking cubierto a 80 metros del restaurante.",
  },
]

export default function Faq() {
  return (
    <section
      id="faq"
      itemScope
      itemType="https://schema.org/FAQPage"
      style={{
        padding: "88px 0",
        background: "var(--bone, #FBF7EF)",
      }}
    >
      <div className="wrap" style={{ maxWidth: 780 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <p className="eyebrow">Preguntas frecuentes</p>
          <h2 style={{ fontSize: "clamp(2rem,4vw,2.9rem)", marginTop: 10, marginBottom: 14 }}>
            Todo lo que necesitas saber
          </h2>
          <p style={{ color: "var(--ink-soft)", fontSize: "1.05rem" }}>
            Resolvemos las dudas más habituales antes de tu visita.
          </p>
        </div>

        {/* Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAQS.map((item, i) => (
            <details
              key={i}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
              style={{
                background: "#fff",
                border: "1.5px solid var(--line, #E4D9C8)",
                borderRadius: 14,
                overflow: "hidden",
              }}
            >
              <summary
                itemProp="name"
                style={{
                  cursor: "pointer",
                  padding: "18px 22px",
                  fontFamily: "var(--font-fraunces), serif",
                  fontSize: "1.05rem",
                  fontWeight: 500,
                  listStyle: "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                  userSelect: "none",
                  color: "var(--ink)",
                }}
              >
                {item.q}
                <span className="faq-chevron" style={{
                  flexShrink: 0,
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "var(--wine)",
                  color: "#fff",
                  display: "grid",
                  placeItems: "center",
                  fontSize: ".85rem",
                  transition: "transform .25s",
                }}>
                  ▾
                </span>
              </summary>
              <div
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
                style={{ padding: "0 22px 20px" }}
              >
                <p
                  itemProp="text"
                  style={{ color: "var(--ink-soft)", fontSize: ".97rem", lineHeight: 1.65, margin: 0 }}
                >
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>

        {/* CTA */}
        <p style={{ textAlign: "center", marginTop: 40, color: "var(--ink-soft)", fontSize: ".95rem" }}>
          ¿Más dudas?{" "}
          <a href="tel:+34934653000" style={{ color: "var(--wine)", fontWeight: 700 }}>
            Llámanos al 934 65 30 00
          </a>
          {" "}o{" "}
          <a href="#res-form" style={{ color: "var(--wine)", fontWeight: 700 }}>
            reserva tu mesa online
          </a>.
        </p>
      </div>
    </section>
  )
}
