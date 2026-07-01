"use client"

import { WaIcon, waReservaUrl } from "./WhatsAppButton"
import { useLang } from "@/i18n/context"

interface InfoData { tel?: string; email?: string; whatsapp?: string }

export default function CartaOculta({ info }: { info?: InfoData }) {
  const { tr } = useLang()
  const tel = info?.tel ?? "934653000"
  const email = info?.email ?? ""
  const waUrl = info?.whatsapp
    ? `https://wa.me/${info.whatsapp.replace(/\D/g, "")}`
    : waReservaUrl()

  return (
    <section id="carta" style={{ padding: "80px 0", background: "var(--bone)", scrollMarginTop: 78 }}>
      <div className="wrap" style={{ maxWidth: 680, textAlign: "center" }}>
        <div style={{ fontSize: "2.8rem", marginBottom: 16 }}>🍽</div>
        <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 500, fontSize: "clamp(1.6rem,4vw,2.4rem)", color: "var(--wine)", marginBottom: 12 }}>
          {tr.carta.hidden}
        </h2>
        <p style={{ fontSize: "1.05rem", color: "var(--ink-soft)", maxWidth: "38em", margin: "0 auto 32px" }}>
          {tr.carta.hiddenDesc}
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href={`tel:+34${tel.replace(/\s/g, "")}`} className="btn btn-primary">
            📞 {tr.carta.call}
          </a>
          {email && (
            <a href={`mailto:${email}?subject=Carta del restaurante`} className="btn btn-ghost">
              ✉️ {tr.carta.email}
            </a>
          )}
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ color: "#15803d", border: "2px solid #15803d" }}>
            <WaIcon size={18} /> {tr.carta.whatsapp}
          </a>
        </div>
      </div>
    </section>
  )
}
