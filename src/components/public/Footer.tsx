"use client"

interface InfoData { tel: string; ig: string; addr: string; email: string }
interface Horario { dias: string; horas: string }
interface MarcaData { nombre: string; tagline: string }

export default function Footer({ marca, info, horarios }: { marca: MarcaData; info: InfoData; horarios: Horario[] }) {
  return (
    <footer style={{ background: "#2a0a13", color: "rgba(245,237,224,.7)", padding: "54px 0 30px" }}>
      <div className="wrap">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 30,
            alignItems: "flex-start",
            paddingBottom: 34,
            borderBottom: "1px solid rgba(245,237,224,.12)",
          }}
        >
          {/* Brand */}
          <div>
            <b style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "1.4rem", color: "var(--cream)", display: "block", marginBottom: 8 }}>
              {marca.nombre}
            </b>
            <p style={{ maxWidth: "24em", fontSize: ".9rem" }}>
              Restaurant · Braseria · Tapes · Cerveseria · Cafeteria. Cuina casolana a la brasa en Badalona.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: 60, flexWrap: "wrap" }}>
            {[
              {
                title: "Web",
                links: [["#menudia", "Menú del día"], ["#carta", "Carta"], ["#reservas", "Reservar"], ["#resenas", "Reseñas"]],
              },
              {
                title: "La casa",
                links: [["#esencia", "Quiénes somos"], ["#extras", "Grupos y eventos"], ["#extras", "Para llevar"], ["#contacto", "Contacto"]],
              },
              {
                title: "Contacto",
                links: [[`tel:+34${info.tel.replace(/\s/g,"")}`, info.tel], [`https://instagram.com/${info.ig.replace("@","")}`, "Instagram"], ["#contacto", "Cómo llegar"]],
              },
            ].map((col) => (
              <div key={col.title}>
                <h5 style={{ color: "var(--cream)", fontFamily: "var(--font-karla), sans-serif", fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase", fontSize: ".74rem", marginBottom: 12 }}>
                  {col.title}
                </h5>
                {col.links.map(([href, label]) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    style={{ display: "block", fontSize: ".9rem", padding: "4px 0", color: "rgba(245,237,224,.7)", transition: ".2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ember-bright)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,237,224,.7)")}
                  >
                    {label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, paddingTop: 24, fontSize: ".8rem" }}>
          <span>© {new Date().getFullYear()} {marca.nombre} · Badalona.</span>
          <span>
            <a href="/aviso-legal" style={{ color: "rgba(245,237,224,.7)" }}>Aviso legal</a>
            {" · "}
            <a href="/privacidad" style={{ color: "rgba(245,237,224,.7)" }}>Privacidad</a>
            {" · "}
            <a href="#contacto" style={{ color: "rgba(245,237,224,.7)" }}>Alérgenos</a>
          </span>
        </div>
      </div>
    </footer>
  )
}
