"use client"

import { createContext, useContext, useState, useEffect } from "react"
import t, { Locale, Translations } from "./translations"

interface LangCtx {
  locale: Locale
  tr: Translations
  setLocale: (l: Locale) => void
}

const LangContext = createContext<LangCtx>({ locale: "es", tr: t.es, setLocale: () => {} })

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es")

  useEffect(() => {
    const saved = localStorage.getItem("rebost-lang") as Locale | null
    if (saved && ["es", "ca", "en"].includes(saved)) {
      setLocaleState(saved)
      document.documentElement.lang = saved
    }
  }, [])

  function setLocale(l: Locale) {
    setLocaleState(l)
    localStorage.setItem("rebost-lang", l)
    document.documentElement.lang = l
  }

  return (
    <LangContext.Provider value={{ locale, tr: t[locale], setLocale }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
