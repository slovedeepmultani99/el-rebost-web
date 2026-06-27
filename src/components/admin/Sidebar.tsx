"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { useState } from "react"

const NAV = [
  {
    group: "Principal",
    items: [
      { href: "/admin", icon: "🗂", label: "Dashboard", exact: true },
      { href: "/admin/reservas", icon: "📅", label: "Reservas" },
    ],
  },
  {
    group: "Contenido",
    items: [
      { href: "/admin/menu", icon: "🍽", label: "Menú del día" },
      { href: "/admin/carta", icon: "📋", label: "Carta" },
      { href: "/admin/galeria", icon: "🖼", label: "Galería" },
      { href: "/admin/contenido", icon: "✏️", label: "Web CMS" },
    ],
  },
  {
    group: "Sistema",
    items: [
      { href: "/admin/ajustes", icon: "⚙️", label: "Ajustes" },
    ],
  },
]

const BOTTOM_NAV = [
  { href: "/admin/reservas", icon: "📅", label: "Reservas" },
  { href: "/admin/menu", icon: "🍽", label: "Menú" },
  { href: "/admin/carta", icon: "📋", label: "Carta" },
  { href: "/admin/galeria", icon: "🖼", label: "Galería" },
]

export default function Sidebar({ userName, userEmail }: Readonly<{ userName: string; userEmail: string }>) {
  const path = usePathname()
  const [moreOpen, setMoreOpen] = useState(false)

  const isActive = (href: string, exact?: boolean) =>
    exact ? path === href : path.startsWith(href)

  const initials = userName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)

  const linkStyle = (active: boolean): React.CSSProperties => ({
    display: "flex", alignItems: "center", gap: 10, padding: "9px 10px",
    borderRadius: 10, cursor: "pointer", fontWeight: 600, fontSize: ".88rem",
    color: active ? "#fff" : "rgba(245,237,224,.78)",
    background: active ? "var(--ember, #C8552B)" : "transparent",
    transition: ".15s", marginBottom: 1, textDecoration: "none",
  })

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="admin-sidebar" style={{
        width: 232, background: "var(--wine-deep, #3A0F1B)", color: "var(--cream)",
        display: "flex", flexDirection: "column", flexShrink: 0, overflowY: "auto",
      }}>
        {/* Brand */}
        <div style={{ padding: "18px 18px 14px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid rgba(245,237,224,.1)" }}>
          <svg style={{ width: 36, height: 36, flexShrink: 0 }} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="#5C1A2B" />
            <circle cx="50" cy="50" r="44" fill="none" stroke="#F5EDE0" strokeWidth="1.6" />
            <path d="M35 44c-6 0-10-4-10-9 0-5 4-8 8-8 1-6 7-10 14-9 4-7 16-7 20 0 7-1 13 3 14 9 4 0 8 3 8 8 0 5-4 9-10 9z" fill="#F5EDE0" />
            <rect x="35" y="44" width="36" height="10" rx="2" fill="#F5EDE0" />
            <g stroke="#F5EDE0" strokeWidth="2.4" strokeLinecap="round">
              <line x1="32" y1="80" x2="58" y2="60" />
              <line x1="68" y1="80" x2="44" y2="62" />
            </g>
            <circle cx="32" cy="80" r="3.2" fill="#E07A33" />
          </svg>
          <div>
            <b style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "1rem", display: "block", lineHeight: 1.1 }}>El Rebost</b>
            <span style={{ fontSize: ".58rem", letterSpacing: ".2em", textTransform: "uppercase", opacity: 0.6, fontWeight: 700 }}>Backoffice</span>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: "12px 10px", flex: 1 }}>
          {NAV.map((group) => (
            <div key={group.group}>
              <div style={{ fontSize: ".62rem", letterSpacing: ".16em", textTransform: "uppercase", opacity: 0.4, padding: "12px 10px 5px", fontWeight: 700 }}>
                {group.group}
              </div>
              {group.items.map((item) => (
                <Link key={item.href} href={item.href} style={linkStyle(isActive(item.href, item.exact))}>
                  <span style={{ fontSize: "1rem", width: 20, textAlign: "center", flexShrink: 0 }}>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        {/* User footer */}
        <div style={{ padding: "14px 18px", borderTop: "1px solid rgba(245,237,224,.1)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--ember, #C8552B)", display: "grid", placeItems: "center", fontFamily: "var(--font-fraunces), serif", fontWeight: 600, color: "#fff", fontSize: ".9rem", flexShrink: 0 }}>
            {initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: ".82rem", fontWeight: 600, lineHeight: 1.2, color: "var(--cream)" }}>{userName}</p>
            <p style={{ fontSize: ".68rem", opacity: 0.6, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{userEmail}</p>
          </div>
          <button onClick={() => signOut({ callbackUrl: "/admin/login" })} title="Cerrar sesión"
            style={{ background: "none", border: "none", color: "rgba(245,237,224,.5)", cursor: "pointer", fontSize: ".9rem", padding: 4 }}>
            ↩
          </button>
        </div>
      </aside>

      {/* ── Mobile bottom navigation bar ── */}
      <nav className="admin-bottom-bar">
        {BOTTOM_NAV.map((item) => {
          const active = isActive(item.href)
          return (
            <Link key={item.href} href={item.href} style={{
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: 3, textDecoration: "none", padding: "6px 0",
              color: active ? "var(--ember-bright, #E07A33)" : "rgba(245,237,224,.55)",
              transition: ".15s",
            }}>
              <span style={{ fontSize: "1.35rem", lineHeight: 1 }}>{item.icon}</span>
              <span style={{ fontSize: ".6rem", fontWeight: 700, letterSpacing: ".04em" }}>{item.label}</span>
            </Link>
          )
        })}
        {/* Más button */}
        <button onClick={() => setMoreOpen(true)} style={{
          flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 3, background: "none", border: "none", cursor: "pointer", padding: "6px 0",
          color: "rgba(245,237,224,.55)",
        }}>
          <span style={{ fontSize: "1.35rem", lineHeight: 1 }}>⋯</span>
          <span style={{ fontSize: ".6rem", fontWeight: 700, letterSpacing: ".04em" }}>Más</span>
        </button>
      </nav>

      {/* ── Mobile "Más" full-screen overlay ── */}
      {moreOpen && (
        <div className="admin-more-overlay" onClick={() => setMoreOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            background: "var(--wine-deep, #3A0F1B)", color: "var(--cream)",
            borderRadius: "20px 20px 0 0", padding: "8px 0 24px",
            maxHeight: "80vh", overflowY: "auto",
          }}>
            {/* Handle bar */}
            <div style={{ width: 40, height: 4, borderRadius: 2, background: "rgba(245,237,224,.2)", margin: "8px auto 18px" }} />

            {/* User info */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 20px 16px", borderBottom: "1px solid rgba(245,237,224,.1)", marginBottom: 8 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--ember)", display: "grid", placeItems: "center", fontFamily: "var(--font-fraunces), serif", fontWeight: 600, fontSize: "1rem", color: "#fff", flexShrink: 0 }}>
                {initials}
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: ".95rem" }}>{userName}</p>
                <p style={{ fontSize: ".75rem", opacity: 0.6 }}>{userEmail}</p>
              </div>
            </div>

            {/* All nav items */}
            {NAV.map((group) => (
              <div key={group.group}>
                <p style={{ fontSize: ".62rem", letterSpacing: ".16em", textTransform: "uppercase", opacity: 0.4, padding: "10px 20px 4px", fontWeight: 700 }}>
                  {group.group}
                </p>
                {group.items.map((item) => {
                  const active = isActive(item.href, item.exact)
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setMoreOpen(false)} style={{
                      display: "flex", alignItems: "center", gap: 14, padding: "13px 20px",
                      textDecoration: "none", fontWeight: 600, fontSize: "1rem",
                      color: active ? "var(--ember-bright, #E07A33)" : "rgba(245,237,224,.85)",
                      background: active ? "rgba(200,85,43,.12)" : "transparent",
                    }}>
                      <span style={{ fontSize: "1.2rem", width: 24, textAlign: "center" }}>{item.icon}</span>
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            ))}

            {/* Sign out */}
            <div style={{ borderTop: "1px solid rgba(245,237,224,.1)", margin: "8px 0 0", padding: "8px 0" }}>
              <button onClick={() => signOut({ callbackUrl: "/admin/login" })} style={{
                display: "flex", alignItems: "center", gap: 14, padding: "13px 20px", width: "100%",
                background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "1rem",
                color: "rgba(245,237,224,.6)", fontFamily: "var(--font-karla), sans-serif",
              }}>
                <span style={{ fontSize: "1.2rem", width: 24, textAlign: "center" }}>↩</span>
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
