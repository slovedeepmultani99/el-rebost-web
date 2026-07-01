"use client"

import { WaIcon, waTakeawayUrl, waReservaUrl } from "./WhatsAppButton"
import { useLang } from "@/i18n/context"

interface InfoData { tel?: string; email?: string; whatsapp?: string }

export default function Extras({ info }: { info?: InfoData }) {
  const { tr } = useLang()
  const tel = info?.tel ?? "934653000"
  const email = info?.email ?? ""
  const waUrl = info?.whatsapp
    ? `https://wa.me/${info.whatsapp.replace(/\D/g, "")}`
    : waReservaUrl()

  return (
    <section id="extras" style={{ padding: "96px 0", background: "var(--bone)", scrollMarginTop: 78 }}>
      <div className="wrap">
        <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24, marginBottom: 24 }}>
          {/* Events */}
          <div style={{ borderRadius: 24, padding: 42, color: "var(--cream)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", minHeight: 300, background: "linear-gradient(140deg, var(--wine), var(--wine-deep))", boxShadow: "var(--shadow)" }}>
            <div className="absolute inset-0 pointer-events-none" style={{ opacity: .12, backgroundImage: "radial-gradient(circle at 1px 1px,var(--cream) 1px,transparent 0)", backgroundSize: "22px 22px" }} />
            <div style={{ position: "relative" }}>
              <div className="eyebrow" style={{ color: "var(--ember-bright)" }}>{tr.extras.eyebrow}</div>
              <h3 style={{ fontSize: "2rem", color: "var(--cream)", margin: "10px 0 12px" }}>{tr.extras.title}</h3>
              <p style={{ color: "rgba(245,237,224,.85)", marginBottom: 20 }}>{tr.extras.desc}</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a href={`tel:+34${tel.replace(/\s/g, "")}`} className="btn btn-cream">
                  📞 {tr.extras.call}
                </a>
                {email && (
                  <a href={`mailto:${email}`} className="btn btn-outline-light">
                    ✉️ {tr.extras.email}
                  </a>
                )}
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
                  <WaIcon size={17} /> {tr.extras.whatsapp}
                </a>
              </div>
            </div>
          </div>

          {/* Takeaway */}
          <div style={{ borderRadius: 24, padding: 42, color: "var(--cream)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", minHeight: 300, background: "linear-gradient(140deg, var(--olive), #3f4a29)", boxShadow: "var(--shadow)" }}>
            <div className="absolute inset-0 pointer-events-none" style={{ opacity: .12, backgroundImage: "radial-gradient(circle at 1px 1px,var(--cream) 1px,transparent 0)", backgroundSize: "22px 22px" }} />
            <div style={{ position: "relative" }}>
              <div className="eyebrow" style={{ color: "#cfe0a0" }}>{tr.extras.takeawayEyebrow}</div>
              <h3 style={{ fontSize: "2rem", color: "var(--cream)", margin: "10px 0 12px" }}>{tr.extras.takeaway}</h3>
              <p style={{ color: "rgba(245,237,224,.85)", marginBottom: 20 }}>{tr.extras.takeawayDesc}</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a href={`tel:+34${tel.replace(/\s/g, "")}`} className="btn btn-cream">
                  📞 {tr.extras.call}
                </a>
                <a href={waTakeawayUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
                  <WaIcon size={17} /> {tr.extras.whatsapp}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
