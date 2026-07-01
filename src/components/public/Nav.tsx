"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useLang } from "@/i18n/context"
import { LOCALE_LABELS, type Locale } from "@/i18n/translations"

export default function Nav({ showResenas = true, activeLocales }: Readonly<{ showResenas?: boolean; activeLocales?: string[] }>) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { tr, locale, setLocale } = useLang()
  const close = () => setMobileOpen(false)

  const langs = ((activeLocales ?? ["es"]).filter((l): l is Locale => ["es", "ca", "en"].includes(l)))

  const navLinks: [string, string][] = [
    ["#esencia", tr.nav.casa],
    ["#menudia", tr.nav.menu],
    ["#carta", tr.nav.carta],
    ...(showResenas ? [["#resenas", tr.nav.resenas] as [string, string]] : []),
    ["#extras", tr.nav.grupos],
    ["#contacto", tr.nav.contacto],
  ]

  const langPills = langs.length > 1 && (
    <div style={{ display: "flex", gap: 3, background: "rgba(92,26,43,.08)", borderRadius: 8, padding: 3 }}>
      {langs.map((l) => (
        <button key={l} onClick={() => setLocale(l)} style={{
          fontSize: ".66rem", fontWeight: 800, letterSpacing: ".07em",
          padding: "3px 8px", borderRadius: 6, border: "none",
          background: locale === l ? "var(--wine)" : "transparent",
          color: locale === l ? "#fff" : "var(--ink-soft)",
          cursor: "pointer", transition: ".15s",
        }}>
          {LOCALE_LABELS[l]}
        </button>
      ))}
    </div>
  )

  return (
    <>
      <header
        className="sticky top-0 z-[900] border-b"
        style={{
          background: "rgba(251,247,239,.86)",
          backdropFilter: "blur(14px)",
          borderColor: "var(--line)",
          transition: "0.3s",
        }}
      >
        <div className="wrap flex items-center justify-between" style={{ height: 78 }}>
          {/* Brand */}
          <Link href="#top" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="El Rebost de Montigalà"
              width={54}
              height={54}
              className="flex-none object-contain"
              style={{ borderRadius: "50%", background: "var(--wine-deep)" }}
              priority
            />
            <span style={{ lineHeight: 1 }}>
              <b style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 600, fontSize: "1.18rem", letterSpacing: "-0.01em", display: "block", color: "var(--wine)" }}>
                El Rebost
              </b>
              <span className="nav-brand-sub" style={{ fontSize: "0.62rem", letterSpacing: "0.34em", textTransform: "uppercase", color: "var(--ink-soft)", fontWeight: 700 }}>
                de Montigalà
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden lg:flex gap-[30px] items-center">
            {navLinks.map(([href, label]) => (
              <a key={href} href={href} className="font-semibold text-[0.92rem] relative pb-[4px] group" style={{ color: "var(--ink)" }}>
                {label}
                <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 group-hover:w-full transition-all duration-300" style={{ background: "var(--ember)" }} />
              </a>
            ))}
          </nav>

          {/* CTAs + lang + burger */}
          <div className="flex gap-3 items-center">
            {langPills}
            <a href="tel:+34934653000" className="btn btn-ghost hidden lg:inline-flex">{tr.nav.llamar}</a>
            <a href="#res-form" className="btn btn-primary nav-reservar">{tr.nav.reservar}</a>
            <button
              className="lg:hidden flex flex-col gap-[5px] p-1.5 bg-none border-none cursor-pointer"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
            >
              <span className="w-6 h-0.5 block" style={{ background: "var(--wine)" }} />
              <span className="w-6 h-0.5 block" style={{ background: "var(--wine)" }} />
              <span className="w-6 h-0.5 block" style={{ background: "var(--wine)" }} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[950] flex flex-col justify-center items-center gap-2" style={{ background: "var(--wine-deep)" }}>
          <button className="absolute top-6 right-7 text-[2rem] cursor-pointer bg-none border-none" style={{ color: "var(--cream)" }} onClick={close}>✕</button>

          {/* Language switcher in mobile */}
          {langs.length > 1 && (
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {langs.map((l) => (
                <button key={l} onClick={() => { setLocale(l); close() }}
                  style={{ fontSize: ".84rem", fontWeight: 800, padding: "6px 14px", borderRadius: 8, border: "2px solid", borderColor: locale === l ? "var(--ember-bright)" : "rgba(245,237,224,.3)", background: locale === l ? "var(--ember)" : "transparent", color: "var(--cream)", cursor: "pointer" }}>
                  {LOCALE_LABELS[l]}
                </button>
              ))}
            </div>
          )}

          {navLinks.map(([href, label]) => (
            <a key={href} href={href} onClick={close} style={{ color: "var(--cream)", fontFamily: "var(--font-fraunces), serif", fontSize: "1.8rem", padding: "8px" }}>
              {label}
            </a>
          ))}
          <a href="#res-form" onClick={close} style={{ color: "var(--ember-bright)", fontFamily: "var(--font-fraunces), serif", fontSize: "1.8rem", padding: "8px" }}>
            {tr.nav.reservar} →
          </a>
        </div>
      )}
    </>
  )
}
