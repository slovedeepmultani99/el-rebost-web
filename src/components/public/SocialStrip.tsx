"use client"

import { useLang } from "@/i18n/context"

interface SocialInfo {
  ig?: string; fb?: string; tiktok?: string; tripadvisor?: string
  igFollowers?: string
}

const IgIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)
const FbIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.931-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
)
const TikTokIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
)
const TripAdvisorIcon = () => (
  <svg width="28" height="28" viewBox="0 0 512 512" fill="currentColor">
    <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 464C138.1 464 48 373.9 48 256S138.1 48 256 48s208 90.1 208 208-90.1 208-208 208zm-96-224a96 96 0 1 0 192 0 96 96 0 0 0-192 0zm96 64a64 64 0 1 1 0-128 64 64 0 0 1 0 128z"/>
  </svg>
)

type SocialCard = { href: string; label: string; handle: string; icon: React.ReactNode; color: string; textColor: string }

function buildSocials(info: SocialInfo): SocialCard[] {
  const cards: SocialCard[] = []
  if (info.ig) {
    const href = info.ig.startsWith("http") ? info.ig : `https://instagram.com/${info.ig.replace("@", "")}`
    const parts = info.ig.replace(/\/$/, "").split("/").filter(Boolean)
    const handle = info.ig.startsWith("http") ? "@" + parts.at(-1) : (info.ig.startsWith("@") ? info.ig : "@" + info.ig)
    cards.push({ href, label: "Instagram", handle, icon: <IgIcon />, color: "linear-gradient(135deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)", textColor: "#fff" })
  }
  if (info.tiktok) {
    const href = info.tiktok.startsWith("http") ? info.tiktok : `https://tiktok.com/@${info.tiktok.replace("@", "")}`
    const handle = info.tiktok.startsWith("@") ? info.tiktok : "@" + info.tiktok.replace("@", "")
    cards.push({ href, label: "TikTok", handle, icon: <TikTokIcon />, color: "#010101", textColor: "#fff" })
  }
  if (info.fb) {
    const href = info.fb.startsWith("http") ? info.fb : `https://facebook.com/${info.fb}`
    cards.push({ href, label: "Facebook", handle: info.fb.startsWith("http") ? "facebook.com" : info.fb, icon: <FbIcon />, color: "#1877F2", textColor: "#fff" })
  }
  if (info.tripadvisor) {
    cards.push({ href: info.tripadvisor, label: "TripAdvisor", handle: "El Rebost de Montigalà", icon: <TripAdvisorIcon />, color: "#00aa6c", textColor: "#fff" })
  }
  return cards
}

export default function SocialStrip({ info }: { info: SocialInfo }) {
  const { tr } = useLang()
  const socials = buildSocials(info)
  if (socials.length === 0) return null

  return (
    <section style={{ padding: "72px 0", background: "linear-gradient(160deg, #1e0810 0%, var(--wine-deep) 100%)", color: "var(--cream)" }}>
      <div className="wrap">
        <div className="sec-head center" style={{ marginBottom: 42 }}>
          <div className="eyebrow" style={{ color: "var(--ember-bright)" }}>{tr.socials.title}</div>
          <p style={{ color: "rgba(245,237,224,.75)", fontSize: "1.05rem", marginTop: 8, maxWidth: "36em", margin: "8px auto 0" }}>
            {tr.socials.subtitle}
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
                background: "rgba(245,237,224,.08)", backdropFilter: "blur(8px)",
                border: "1px solid rgba(245,237,224,.15)", borderRadius: 20, padding: "28px 32px",
                minWidth: 160, textDecoration: "none", color: "var(--cream)",
                transition: "transform .2s, border-color .2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "rgba(245,237,224,.4)" }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = "rgba(245,237,224,.15)" }}
            >
              <div style={{ width: 58, height: 58, borderRadius: 18, background: s.color, display: "grid", placeItems: "center", color: s.textColor, flexShrink: 0 }}>
                {s.icon}
              </div>
              <div style={{ textAlign: "center" }}>
                <b style={{ fontFamily: "var(--font-karla), sans-serif", fontSize: ".8rem", letterSpacing: ".12em", textTransform: "uppercase", display: "block", opacity: .7 }}>
                  {s.label}
                </b>
                <span style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "1.05rem", marginTop: 2, display: "block" }}>
                  {s.handle}
                </span>
              </div>
              <span style={{ fontSize: ".76rem", fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", background: "rgba(245,237,224,.15)", borderRadius: 100, padding: "4px 12px", color: "var(--ember-bright)" }}>
                {tr.socials.follow} →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
