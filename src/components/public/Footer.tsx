"use client"

import { useLang } from "@/i18n/context"

interface InfoData { tel: string; ig?: string; fb?: string; tiktok?: string; tripadvisor?: string; addr: string; email?: string }
interface Horario { dias: string; horas: string }
interface MarcaData { nombre: string; tagline: string }

const IgIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)
const FbIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.931-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
)
const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
)

export default function Footer({ marca, info, horarios }: Readonly<{ marca: MarcaData; info: InfoData; horarios: Horario[] }>) {
  const { tr } = useLang()

  const socials = [
    info.ig && { href: info.ig.startsWith("http") ? info.ig : `https://instagram.com/${info.ig.replace("@", "")}`, icon: <IgIcon />, label: "Instagram" },
    info.tiktok && { href: info.tiktok.startsWith("http") ? info.tiktok : `https://tiktok.com/@${info.tiktok.replace("@", "")}`, icon: <TikTokIcon />, label: "TikTok" },
    info.fb && { href: info.fb.startsWith("http") ? info.fb : `https://facebook.com/${info.fb}`, icon: <FbIcon />, label: "Facebook" },
  ].filter(Boolean) as { href: string; icon: React.ReactNode; label: string }[]

  const footerLinks = [
    { title: tr.nav.menu, links: [["#menudia", tr.nav.menu], ["#carta", tr.nav.carta], ["#reservas", tr.nav.reservar], ["#resenas", tr.nav.resenas]] },
    { title: tr.nav.casa, links: [["#esencia", tr.nav.casa], ["#extras", tr.nav.grupos], ["#contacto", tr.nav.contacto]] },
    { title: tr.nav.contacto, links: [[`tel:+34${info.tel.replace(/\s/g, "")}`, info.tel], ...(info.email ? [[`mailto:${info.email}`, "Email"]] : [])] },
  ]

  return (
    <footer style={{ background: "#2a0a13", color: "rgba(245,237,224,.7)", padding: "54px 0 30px" }}>
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 30, alignItems: "flex-start", paddingBottom: 34, borderBottom: "1px solid rgba(245,237,224,.12)" }}>
          {/* Brand + socials */}
          <div>
            <b style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "1.4rem", color: "var(--cream)", display: "block", marginBottom: 8 }}>
              {marca.nombre}
            </b>
            <p style={{ maxWidth: "24em", fontSize: ".9rem", marginBottom: 18 }}>
              Restaurant · Braseria · Tapes · Cerveseria · Cafeteria. Cuina casolana a la brasa en Badalona.
            </p>
            {socials.length > 0 && (
              <div style={{ display: "flex", gap: 10 }}>
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(245,237,224,.1)", display: "grid", placeItems: "center", color: "rgba(245,237,224,.7)", transition: ".2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "var(--ember)"; e.currentTarget.style.color = "#fff" }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(245,237,224,.1)"; e.currentTarget.style.color = "rgba(245,237,224,.7)" }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: 60, flexWrap: "wrap" }}>
            {footerLinks.map((col) => (
              <div key={col.title}>
                <h5 style={{ color: "var(--cream)", fontFamily: "var(--font-karla), sans-serif", fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase", fontSize: ".74rem", marginBottom: 12 }}>
                  {col.title}
                </h5>
                {col.links.map(([href, label]) => (
                  <a key={label} href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    style={{ display: "block", fontSize: ".9rem", padding: "4px 0", color: "rgba(245,237,224,.7)", transition: ".2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ember-bright)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,237,224,.7)")}>
                    {label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, paddingTop: 24, fontSize: ".8rem" }}>
          <span>© {new Date().getFullYear()} {marca.nombre} · Badalona. {tr.footer.rights}.</span>
          <span>
            <a href="/aviso-legal" style={{ color: "rgba(245,237,224,.7)" }}>{tr.footer.legal}</a>
            {" · "}
            <a href="/privacidad" style={{ color: "rgba(245,237,224,.7)" }}>{tr.footer.privacy}</a>
            {" · "}
            <a href="#contacto" style={{ color: "rgba(245,237,224,.7)" }}>{tr.footer.allergens}</a>
          </span>
        </div>
        <div style={{ paddingTop: 12, fontSize: ".74rem", color: "rgba(245,237,224,.4)", textAlign: "center" }}>
          Diseñada y desarrollada por{" "}
          <a href="https://www.linkedin.com/in/lovedeepdev/" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(245,237,224,.6)", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3 }}>
            Lovedeep Singh
          </a>
        </div>
      </div>
    </footer>
  )
}
