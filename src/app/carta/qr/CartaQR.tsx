"use client"

import { useState } from "react"

interface Dish {
  id: string
  name: string
  description: string | null
  price: string | null
}
interface Section {
  id: string
  title: string
  subtitle: string | null
  note: string | null
  dishes: Dish[]
}

const TRANSLATIONS = {
  es: {
    heading: "Nuestra carta",
    sub: "Brasería · Tapas · Arroces",
    iva: "Precios con IVA incluido",
    alergenos: "Carta de alérgenos disponible",
    consultar: "consultar",
    sections: {
      "Tapas": "Tapas",
      "Del Mar": "Del Mar",
      "Entrantes": "Entrantes",
      "Ensaladas": "Ensaladas",
      "Sopas y Pastas": "Sopas y Pastas",
      "Pan": "Pan",
      "Con 2 Huevos Rotos": "Con 2 Huevos Rotos",
      "Torradas": "Torradas",
      "Arroces y Fideuà": "Arroces y Fideuà",
      "Bacalao": "Bacalao",
      "Carnes": "Carnes",
      "Salsas": "Salsas",
      "Sugerencias del Chef · Entrantes": "Sugerencias del Chef · Entrantes",
      "Sugerencias del Chef · Carnes": "Sugerencias del Chef · Carnes",
      "Sugerencias del Chef · Pescados y Mariscos": "Sugerencias del Chef · Pescados y Mariscos",
    },
  },
  ca: {
    heading: "La nostra carta",
    sub: "Braseria · Tapes · Arrossos",
    iva: "Preus amb IVA inclòs",
    alergenos: "Carta d'al·lèrgens disponible",
    consultar: "consultar",
    sections: {
      "Tapas": "Tapes",
      "Del Mar": "Del Mar",
      "Entrantes": "Entrants",
      "Ensaladas": "Amanides",
      "Sopas y Pastas": "Sopes i Pastes",
      "Pan": "Pa",
      "Con 2 Huevos Rotos": "Amb 2 Ous Trencats",
      "Torradas": "Torrades",
      "Arroces y Fideuà": "Arrossos i Fideuà",
      "Bacalao": "Bacallà",
      "Carnes": "Carns",
      "Salsas": "Salses",
      "Sugerencias del Chef · Entrantes": "Suggeriments del Xef · Entrants",
      "Sugerencias del Chef · Carnes": "Suggeriments del Xef · Carns",
      "Sugerencias del Chef · Pescados y Mariscos": "Suggeriments del Xef · Peixos i Marisc",
    },
  },
  en: {
    heading: "Our menu",
    sub: "Grill · Tapas · Rice dishes",
    iva: "Prices include VAT",
    alergenos: "Allergen information available",
    consultar: "on request",
    sections: {
      "Tapas": "Tapas",
      "Del Mar": "From the Sea",
      "Entrantes": "Starters",
      "Ensaladas": "Salads",
      "Sopas y Pastas": "Soups & Pasta",
      "Pan": "Bread",
      "Con 2 Huevos Rotos": "With 2 Fried Eggs",
      "Torradas": "Toast",
      "Arroces y Fideuà": "Rice & Fideuà",
      "Bacalao": "Cod",
      "Carnes": "Meat",
      "Salsas": "Sauces",
      "Sugerencias del Chef · Entrantes": "Chef's Suggestions · Starters",
      "Sugerencias del Chef · Carnes": "Chef's Suggestions · Meat",
      "Sugerencias del Chef · Pescados y Mariscos": "Chef's Suggestions · Fish & Seafood",
    },
  },
} as const

type Lang = keyof typeof TRANSLATIONS

export default function CartaQR({ sections }: { sections: Section[] }) {
  const [lang, setLang] = useState<Lang>("es")
  const t = TRANSLATIONS[lang]

  const formatPrice = (price: string | null) => {
    if (!price) return null
    return Number(price).toFixed(2).replace(".", ",") + " €"
  }

  return (
    <div style={{ minHeight: "100dvh", background: "#F5EDE0", fontFamily: "'Karla', sans-serif" }}>
      {/* Header */}
      <header style={{ background: "#5C1A2B", color: "#F5EDE0", padding: "20px 16px 16px", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "1.35rem", fontWeight: 600, marginBottom: 2 }}>
            El Rebost de Montigalà
          </h1>
          <p style={{ fontSize: ".8rem", color: "rgba(245,237,224,.7)", marginBottom: 14 }}>{t.sub} · Badalona</p>

          {/* Language switcher */}
          <div style={{ display: "flex", gap: 6 }}>
            {(["es", "ca", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  fontFamily: "'Karla', sans-serif",
                  fontWeight: 800,
                  fontSize: ".72rem",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  padding: "5px 12px",
                  borderRadius: 100,
                  border: "1.5px solid",
                  borderColor: lang === l ? "#F5EDE0" : "rgba(245,237,224,.3)",
                  background: lang === l ? "#F5EDE0" : "transparent",
                  color: lang === l ? "#5C1A2B" : "rgba(245,237,224,.75)",
                  cursor: "pointer",
                  transition: ".15s",
                }}
              >
                {l === "es" ? "ES" : l === "ca" ? "CA" : "EN"}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: 680, margin: "0 auto", padding: "24px 16px 48px" }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "1.7rem", fontWeight: 600, color: "#5C1A2B", marginBottom: 24 }}>
          {t.heading}
        </h2>

        {sections.map((section) => (
          <div key={section.id} style={{ marginBottom: 32 }}>
            {/* Section title */}
            <div style={{ borderBottom: "2px solid #5C1A2B", paddingBottom: 8, marginBottom: 16 }}>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "1.15rem", fontWeight: 600, color: "#5C1A2B" }}>
                {(t.sections as Record<string, string>)[section.title] ?? section.title}
              </h3>
              {(section.subtitle || section.note) && (
                <p style={{ fontSize: ".8rem", color: "#6A554F", marginTop: 3, fontStyle: "italic" }}>
                  {section.subtitle}{section.note ? ` · ${section.note}` : ""}
                </p>
              )}
            </div>

            {/* Dishes */}
            {section.dishes.map((dish) => (
              <div
                key={dish.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: 12,
                  padding: "11px 0",
                  borderBottom: "1px solid #E4D9C8",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontFamily: "'Fraunces', serif", fontSize: "1rem", fontWeight: 500, color: "#1E1210" }}>
                    {dish.name}
                  </span>
                  {dish.description && (
                    <p style={{ fontSize: ".82rem", color: "#6A554F", marginTop: 2 }}>{dish.description}</p>
                  )}
                </div>
                <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "1rem", color: "#5C1A2B", whiteSpace: "nowrap", flexShrink: 0 }}>
                  {formatPrice(dish.price) ?? <span style={{ fontSize: ".78rem", color: "#a89880", fontWeight: 400 }}>{t.consultar}</span>}
                </span>
              </div>
            ))}
          </div>
        ))}

        {/* Footer note */}
        <div style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid #E4D9C8", textAlign: "center" }}>
          <p style={{ fontSize: ".78rem", color: "#6A554F" }}>{t.iva} · {t.alergenos}</p>
          <p style={{ fontSize: ".78rem", color: "#6A554F", marginTop: 4 }}>
            Carrer Manuel Moreno Mauricio, 35-37 · Badalona · 934 65 30 00
          </p>
        </div>
      </main>
    </div>
  )
}
