"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"

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

const sb: React.CSSProperties = {
  width: 232,
  background: "var(--wine-deep, #3A0F1B)",
  color: "var(--cream)",
  display: "flex",
  flexDirection: "column",
  flexShrink: 0,
  overflowY: "auto",
}

export default function Sidebar({ userName, userEmail }: { userName: string; userEmail: string }) {
  const path = usePathname()

  const isActive = (href: string, exact?: boolean) =>
    exact ? path === href : path.startsWith(href)

  const initials = userName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <aside style={sb}>
      {/* Brand */}
      <div
        style={{
          padding: "18px 18px 14px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          borderBottom: "1px solid rgba(245,237,224,.1)",
        }}
      >
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
          <b style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "1rem", display: "block", lineHeight: 1.1 }}>
            El Rebost
          </b>
          <span style={{ fontSize: ".58rem", letterSpacing: ".2em", textTransform: "uppercase", opacity: 0.6, fontWeight: 700 }}>
            Backoffice
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: "12px 10px", flex: 1 }}>
        {NAV.map((group) => (
          <div key={group.group}>
            <div
              style={{
                fontSize: ".62rem",
                letterSpacing: ".16em",
                textTransform: "uppercase",
                opacity: 0.4,
                padding: "12px 10px 5px",
                fontWeight: 700,
              }}
            >
              {group.group}
            </div>
            {group.items.map((item) => {
              const active = isActive(item.href, item.exact)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "9px 10px",
                    borderRadius: 10,
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: ".88rem",
                    color: active ? "#fff" : "rgba(245,237,224,.78)",
                    background: active ? "var(--ember, #C8552B)" : "transparent",
                    transition: ".15s",
                    marginBottom: 1,
                    textDecoration: "none",
                  }}
                >
                  <span style={{ fontSize: "1rem", width: 20, textAlign: "center", flexShrink: 0 }}>
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div
        style={{
          padding: "14px 18px",
          borderTop: "1px solid rgba(245,237,224,.1)",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "var(--ember, #C8552B)",
            display: "grid",
            placeItems: "center",
            fontFamily: "var(--font-fraunces), serif",
            fontWeight: 600,
            color: "#fff",
            fontSize: ".9rem",
            flexShrink: 0,
          }}
        >
          {initials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: ".82rem", fontWeight: 600, lineHeight: 1.2, color: "var(--cream)" }}>
            {userName}
          </p>
          <p style={{ fontSize: ".68rem", opacity: 0.6, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {userEmail}
          </p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          title="Cerrar sesión"
          style={{ background: "none", border: "none", color: "rgba(245,237,224,.5)", cursor: "pointer", fontSize: ".9rem", padding: 4 }}
        >
          ↩
        </button>
      </div>
    </aside>
  )
}
