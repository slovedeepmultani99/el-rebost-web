"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const close = () => setMobileOpen(false)

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
              src="/logo.jpg"
              alt="El Rebost de Montigalà"
              width={46}
              height={46}
              className="flex-none rounded-full object-cover"
              priority
            />
            <span style={{ lineHeight: 1 }}>
              <b style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 600, fontSize: "1.18rem", letterSpacing: "-0.01em", display: "block", color: "var(--wine)" }}>
                El Rebost
              </b>
              <span style={{ fontSize: "0.62rem", letterSpacing: "0.34em", textTransform: "uppercase", color: "var(--ink-soft)", fontWeight: 700 }}>
                de Montigalà
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden lg:flex gap-[30px] items-center">
            {[
              ["#esencia", "La casa"],
              ["#menudia", "Menú del día"],
              ["#carta", "Carta"],
              ["#resenas", "Reseñas"],
              ["#extras", "Grupos"],
              ["#contacto", "Contacto"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="font-semibold text-[0.92rem] relative pb-[4px] group"
                style={{ color: "var(--ink)" }}
              >
                {label}
                <span
                  className="absolute left-0 bottom-[-2px] h-[2px] w-0 group-hover:w-full transition-all duration-300"
                  style={{ background: "var(--ember)" }}
                />
              </a>
            ))}
          </nav>

          {/* CTAs + burger */}
          <div className="flex gap-3 items-center">
            <a href="tel:+34934653000" className="btn btn-ghost hidden lg:inline-flex">Llamar</a>
            <a href="#reservas" className="btn btn-primary">Reservar mesa</a>
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
        <div
          className="fixed inset-0 z-[950] flex flex-col justify-center items-center gap-2"
          style={{ background: "var(--wine-deep)" }}
        >
          <button
            className="absolute top-6 right-7 text-[2rem] cursor-pointer bg-none border-none"
            style={{ color: "var(--cream)" }}
            onClick={close}
          >
            ✕
          </button>
          {[
            ["#esencia", "La casa"],
            ["#menudia", "Menú del día"],
            ["#carta", "Carta"],
            ["#resenas", "Reseñas"],
            ["#extras", "Grupos"],
            ["#contacto", "Contacto"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={close}
              style={{ color: "var(--cream)", fontFamily: "var(--font-fraunces), serif", fontSize: "1.8rem", padding: "8px" }}
            >
              {label}
            </a>
          ))}
          <a
            href="#reservas"
            onClick={close}
            style={{ color: "var(--ember-bright)", fontFamily: "var(--font-fraunces), serif", fontSize: "1.8rem", padding: "8px" }}
          >
            Reservar mesa →
          </a>
        </div>
      )}
    </>
  )
}
