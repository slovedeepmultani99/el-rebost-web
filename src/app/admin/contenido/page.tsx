"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import AdminTopBar from "@/components/admin/AdminTopBar"
import { useToast } from "@/components/admin/Toast"

type CmsKey = "hero" | "casa" | "features" | "stats" | "info" | "horarios" | "marca" | "i18n"
type Cms = Record<CmsKey, any>
type LangTab = "es" | "ca" | "en"

const LANGS: LangTab[] = ["es", "ca", "en"]
const LANG_LABELS: Record<LangTab, string> = { es: "ES · Español", ca: "CA · Català", en: "EN · English" }

const inp: React.CSSProperties = { border: "1.5px solid var(--line,#E4D9C8)", borderRadius: 10, padding: ".55em .8em", background: "#fff", color: "var(--ink)", fontFamily: "inherit", fontSize: ".9rem", width: "100%" }
const lbl: React.CSSProperties = { display: "block", fontSize: ".7rem", fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase" as const, color: "var(--muted,#6A554F)", marginBottom: 5 }
const section: React.CSSProperties = { background: "var(--bone,#FBF7EF)", border: "1px solid var(--line,#E4D9C8)", borderRadius: 16, padding: 20, marginBottom: 18 }

// ── Moved outside parent to avoid re-mount on every render ──
function LangTabBar({ current, onChange }: Readonly<{ current: LangTab; onChange: (l: LangTab) => void }>) {
  return (
    <div style={{ display: "flex", gap: 4, background: "rgba(92,26,43,.06)", borderRadius: 10, padding: 4, marginBottom: 14 }}>
      {LANGS.map((l) => (
        <button key={l} onClick={() => onChange(l)}
          style={{ flex: 1, fontWeight: 700, fontSize: ".75rem", padding: "5px 8px", borderRadius: 7, border: "none", background: current === l ? "var(--wine)" : "transparent", color: current === l ? "#fff" : "var(--muted)", cursor: "pointer", transition: ".15s" }}>
          {LANG_LABELS[l]}
        </button>
      ))}
    </div>
  )
}

function SaveBtn({ k, saving, onSave }: Readonly<{ k: CmsKey; saving: CmsKey | null; onSave: (k: CmsKey) => void }>) {
  return (
    <button onClick={() => onSave(k)} disabled={saving === k}
      style={{ display: "inline-flex", alignItems: "center", gap: ".4em", fontWeight: 700, fontSize: ".78rem", padding: ".42em .85em", borderRadius: 9, border: "1.5px solid var(--ember)", background: "var(--ember)", color: "#fff", cursor: "pointer", opacity: saving === k ? .6 : 1 }}>
      {saving === k ? "Guardando…" : "💾 Guardar"}
    </button>
  )
}

export default function ContenidoPage() {
  const [cms, setCms] = useState<Cms | null>(null)
  const [saving, setSaving] = useState<CmsKey | null>(null)
  const [uploadingPlate, setUploadingPlate] = useState<"plate1" | "plate2" | null>(null)
  const [langTab, setLangTab] = useState<LangTab>("es")
  const plate1Ref = useRef<HTMLInputElement>(null)
  const plate2Ref = useRef<HTMLInputElement>(null)
  const { toast, el: toastEl } = useToast()

  useEffect(() => {
    fetch("/api/settings").then((r) => r.json()).then((data) => {
      if (!data.i18n) data.i18n = { active: ["es"] }
      setCms(data)
    })
  }, [])

  const save = useCallback(async (key: CmsKey) => {
    if (!cms) return
    setSaving(key)
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value: cms[key] }),
    })
    if (res.ok) toast(`✓ ${key} guardado`)
    else toast("Error al guardar", "error")
    setSaving(null)
  }, [cms, toast])

  const set = (key: CmsKey, field: string, value: string) =>
    setCms((p) => p ? { ...p, [key]: { ...p[key], [field]: value } } : p)
  const setBool = (key: CmsKey, field: string, value: boolean) =>
    setCms((p) => p ? { ...p, [key]: { ...p[key], [field]: value } } : p)
  const setArr = (key: CmsKey, index: number, field: string, value: string) =>
    setCms((p) => {
      if (!p) return p
      const arr = [...(p[key] as Record<string, string>[])]
      arr[index] = { ...arr[index], [field]: value }
      return { ...p, [key]: arr }
    })

  const setL = (key: CmsKey, field: string, value: string, lang: LangTab) => {
    const realField = lang === "es" ? field : `${field}_${lang}`
    set(key, realField, value)
  }
  const getL = (key: CmsKey, field: string, lang: LangTab): string => {
    if (!cms) return ""
    const realField = lang === "es" ? field : `${field}_${lang}`
    return cms[key]?.[realField] ?? ""
  }

  async function uploadPlate(e: React.ChangeEvent<HTMLInputElement>, plate: "plate1" | "plate2") {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingPlate(plate)
    const fd = new FormData()
    fd.append("file", file)
    fd.append("bucket", "platos")
    const res = await fetch("/api/upload", { method: "POST", body: fd })
    if (res.ok) {
      const { url } = await res.json()
      set("hero", `${plate}Url`, url)
      toast("✓ Imagen subida — guarda para aplicar")
    } else {
      toast("Error al subir imagen", "error")
    }
    setUploadingPlate(null)
    if (plate === "plate1" && plate1Ref.current) plate1Ref.current.value = ""
    if (plate === "plate2" && plate2Ref.current) plate2Ref.current.value = ""
  }

  const toggleLang = (lang: LangTab) => {
    if (!cms || lang === "es") return
    const active: string[] = [...(cms.i18n?.active ?? ["es"])]
    const idx = active.indexOf(lang)
    if (idx >= 0) active.splice(idx, 1)
    else active.push(lang)
    setCms((p) => p ? { ...p, i18n: { ...p.i18n, active } } : p)
  }

  if (!cms) return <div style={{ flex: 1, display: "grid", placeItems: "center", color: "var(--muted)" }}>Cargando…</div>

  const activeLangs: string[] = cms.i18n?.active ?? ["es"]

  return (
    <>
      <AdminTopBar crumb="Backoffice · Sistema" title="Web CMS" />
      <input ref={plate1Ref} type="file" accept="image/*" onChange={(e) => uploadPlate(e, "plate1")} style={{ display: "none" }} />
      <input ref={plate2Ref} type="file" accept="image/*" onChange={(e) => uploadPlate(e, "plate2")} style={{ display: "none" }} />

      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>

        {/* ── IDIOMAS ── */}
        <div style={section}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h3 style={{ fontFamily: "var(--font-fraunces),serif", fontWeight: 500, fontSize: "1.2rem" }}>Idiomas activos</h3>
            <SaveBtn k="i18n" saving={saving} onSave={save} />
          </div>
          <p style={{ fontSize: ".82rem", color: "var(--muted)", marginBottom: 14 }}>
            Los idiomas activos aparecen como botones en la web pública. Español siempre visible.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {LANGS.map((l) => {
              const isActive = activeLangs.includes(l)
              return (
                <button key={l} onClick={() => toggleLang(l)} disabled={l === "es"}
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 12, border: "2px solid", borderColor: isActive ? "var(--wine)" : "var(--line)", background: isActive ? "rgba(92,26,43,.08)" : "#fff", cursor: l === "es" ? "default" : "pointer", fontWeight: 700, fontSize: ".9rem" }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: isActive ? "var(--ember)" : "#C8C0B8", flexShrink: 0 }} />
                  {LANG_LABELS[l]}
                  {l === "es" && <span style={{ fontSize: ".72rem", fontWeight: 600, color: "var(--muted)", marginLeft: 4 }}>· siempre</span>}
                </button>
              )
            })}
          </div>
          <p style={{ fontSize: ".78rem", color: "var(--muted)", marginTop: 12 }}>
            💡 Activa CA o EN para mostrar el selector de idioma en la web.
          </p>
        </div>

        {/* Selector de idioma para editar contenido */}
        <div style={{ ...section, background: "rgba(92,26,43,.04)", borderColor: "var(--wine)", borderStyle: "dashed" }}>
          <p style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--wine)", marginBottom: 10 }}>📝 Editando contenido en idioma:</p>
          <LangTabBar current={langTab} onChange={setLangTab} />
          {langTab !== "es" && !activeLangs.includes(langTab) && (
            <p style={{ fontSize: ".78rem", color: "var(--ember)", background: "rgba(200,85,43,.08)", borderRadius: 8, padding: "8px 12px" }}>
              ⚠️ Este idioma no está activo en la web. Actívalo arriba para que sea visible.
            </p>
          )}
        </div>

        {/* ── HERO ── */}
        <div style={section}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontFamily: "var(--font-fraunces),serif", fontWeight: 500, fontSize: "1.2rem" }}>
              Hero {langTab !== "es" && <span style={{ fontSize: ".8rem", color: "var(--ember)", fontFamily: "var(--font-karla),sans-serif" }}>· {langTab.toUpperCase()}</span>}
            </h3>
            <SaveBtn k="hero" saving={saving} onSave={save} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {(["h1a", "h1b", "cta1", "cta2", "badge", "meta1t", "meta1s", "meta2t", "meta2s"] as const).map((k) => {
              const labels: Record<string, string> = { h1a: "Título línea 1", h1b: "Título línea 2 (cursiva)", cta1: "Botón primario", cta2: "Botón secundario", badge: "Badge (reseñas)", meta1t: "Meta 1 título", meta1s: "Meta 1 subtítulo", meta2t: "Meta 2 título", meta2s: "Meta 2 subtítulo" }
              const fieldId = `hero-${k}-${langTab}`
              return (
                <div key={k}>
                  <label htmlFor={fieldId} style={lbl}>{labels[k]}</label>
                  <input id={fieldId} value={getL("hero", k, langTab)} onChange={(e) => setL("hero", k, e.target.value, langTab)} style={inp} placeholder={langTab === "es" ? undefined : (cms.hero?.[k] ?? "")} />
                </div>
              )
            })}
            <div style={{ gridColumn: "1/-1" }}>
              <label htmlFor={`hero-lead-${langTab}`} style={lbl}>Lead (párrafo)</label>
              <textarea id={`hero-lead-${langTab}`} value={getL("hero", "lead", langTab)} onChange={(e) => setL("hero", "lead", e.target.value, langTab)} rows={3} style={{ ...inp, resize: "none" as const }} placeholder={langTab === "es" ? undefined : (cms.hero?.lead ?? "")} />
            </div>
          </div>

          {/* Plate images — only in ES */}
          {langTab === "es" && (
            <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid var(--line,#E4D9C8)" }}>
              <p style={{ ...lbl, marginBottom: 12, color: "var(--ink)" }}>Imágenes del hero (fotos flotantes)</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {(["plate1", "plate2"] as const).map((p) => {
                  const ref = p === "plate1" ? plate1Ref : plate2Ref
                  const urlId = `hero-${p}Url`
                  const badgeId = `hero-${p}Badge`
                  const nameId = `hero-${p}Name`
                  return (
                    <div key={p} style={{ background: "#F7F2EA", borderRadius: 12, padding: 14 }}>
                      <p style={{ ...lbl, marginBottom: 10 }}>{p === "plate1" ? "Foto 1 (arriba-derecha)" : "Foto 2 (abajo-izquierda)"}</p>
                      {cms.hero[`${p}Url`] && (
                        <div style={{ width: "100%", aspectRatio: "16/9", backgroundImage: `url(${cms.hero[`${p}Url`]})`, backgroundSize: "cover", backgroundPosition: "center", borderRadius: 8, marginBottom: 10, border: "1px solid var(--line,#E4D9C8)" }} />
                      )}
                      <div style={{ display: "grid", gap: 8 }}>
                        <div>
                          <label htmlFor={urlId} style={lbl}>URL imagen</label>
                          <div style={{ display: "flex", gap: 6 }}>
                            <input id={urlId} value={cms.hero[`${p}Url`] ?? ""} onChange={(e) => set("hero", `${p}Url`, e.target.value)} style={{ ...inp, fontSize: ".8rem" }} placeholder="/fotos/ejemplo.jpg o URL Supabase" />
                            <button onClick={() => ref.current?.click()} disabled={uploadingPlate === p} style={{ flexShrink: 0, padding: ".4em .7em", borderRadius: 8, border: "1.5px solid var(--ember)", background: "var(--ember)", color: "#fff", fontWeight: 700, fontSize: ".72rem", cursor: "pointer", whiteSpace: "nowrap" }}>
                              {uploadingPlate === p ? "…" : "⬆ Subir"}
                            </button>
                          </div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                          <div>
                            <label htmlFor={badgeId} style={lbl}>Badge (ej: De la brasa)</label>
                            <input id={badgeId} value={cms.hero[`${p}Badge`] ?? ""} onChange={(e) => set("hero", `${p}Badge`, e.target.value)} style={{ ...inp, fontSize: ".84rem" }} />
                          </div>
                          <div>
                            <label htmlFor={nameId} style={lbl}>Nombre del plato</label>
                            <input id={nameId} value={cms.hero[`${p}Name`] ?? ""} onChange={(e) => set("hero", `${p}Name`, e.target.value)} style={{ ...inp, fontSize: ".84rem" }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* ── CASA ── */}
        <div style={section}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontFamily: "var(--font-fraunces),serif", fontWeight: 500, fontSize: "1.2rem" }}>
              Sección La Casa {langTab !== "es" && <span style={{ fontSize: ".8rem", color: "var(--ember)", fontFamily: "var(--font-karla),sans-serif" }}>· {langTab.toUpperCase()}</span>}
            </h3>
            <SaveBtn k="casa" saving={saving} onSave={save} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {(["eyebrow", "heading"] as const).map((k) => {
              const fieldId = `casa-${k}-${langTab}`
              return (
                <div key={k}>
                  <label htmlFor={fieldId} style={lbl}>{k === "eyebrow" ? "Eyebrow" : "Título"}</label>
                  <input id={fieldId} value={getL("casa", k, langTab)} onChange={(e) => setL("casa", k, e.target.value, langTab)} style={inp} placeholder={langTab === "es" ? undefined : (cms.casa?.[k] ?? "")} />
                </div>
              )
            })}
            {(["p1", "p2"] as const).map((k) => {
              const fieldId = `casa-${k}-${langTab}`
              return (
                <div key={k} style={{ gridColumn: "1/-1" }}>
                  <label htmlFor={fieldId} style={lbl}>{k === "p1" ? "Párrafo 1" : "Párrafo 2"}</label>
                  <textarea id={fieldId} value={getL("casa", k, langTab)} onChange={(e) => setL("casa", k, e.target.value, langTab)} rows={3} style={{ ...inp, resize: "none" as const }} placeholder={langTab === "es" ? undefined : (cms.casa?.[k] ?? "")} />
                </div>
              )
            })}
          </div>
        </div>

        {/* ── INFO + HORARIOS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
          <div style={section}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontFamily: "var(--font-fraunces),serif", fontWeight: 500, fontSize: "1.2rem" }}>Contacto y redes</h3>
              <SaveBtn k="info" saving={saving} onSave={save} />
            </div>
            {[
              ["tel", "Teléfono"],
              ["email", "Email"],
              ["addr", "Dirección"],
              ["whatsapp", "WhatsApp (número completo, ej: 34934653000)"],
            ].map(([k, l]) => (
              <div key={k} style={{ marginBottom: 12 }}>
                <label htmlFor={`info-${k}`} style={lbl}>{l}</label>
                <input id={`info-${k}`} value={cms.info?.[k] ?? ""} onChange={(e) => set("info", k, e.target.value)} style={inp} />
              </div>
            ))}
            <p style={{ ...lbl, marginBottom: 8, marginTop: 14, color: "var(--ink)" }}>Redes sociales</p>
            {[
              ["ig", "Instagram (handle o URL)"],
              ["tiktok", "TikTok (handle o URL)"],
              ["fb", "Facebook (nombre de página o URL)"],
              ["tripadvisor", "TripAdvisor (URL completa)"],
            ].map(([k, l]) => (
              <div key={k} style={{ marginBottom: 12 }}>
                <label htmlFor={`info-${k}`} style={lbl}>{l}</label>
                <input id={`info-${k}`} value={cms.info?.[k] ?? ""} onChange={(e) => set("info", k, e.target.value)} style={inp} />
              </div>
            ))}
            <div style={{ marginTop: 4, paddingTop: 14, borderTop: "1px solid var(--line,#E4D9C8)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <span style={{ ...lbl, marginBottom: 2, display: "block" }}>Sección Reseñas</span>
                <span style={{ fontSize: ".8rem", color: "var(--muted)" }}>Visible en la web pública</span>
              </div>
              <button
                onClick={() => setBool("info", "showResenas", cms.info?.showResenas === false)}
                style={{ width: 46, height: 26, borderRadius: 13, border: "none", cursor: "pointer", position: "relative", transition: "background .25s", background: cms.info?.showResenas !== false ? "var(--ember)" : "#C8C0B8", flexShrink: 0 }}>
                <span style={{ position: "absolute", top: 3, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left .25s", left: cms.info?.showResenas !== false ? 22 : 3 }} />
              </button>
            </div>
          </div>

          <div style={section}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontFamily: "var(--font-fraunces),serif", fontWeight: 500, fontSize: "1.2rem" }}>Horarios</h3>
              <SaveBtn k="horarios" saving={saving} onSave={save} />
            </div>
            {(cms.horarios as { dias: string; horas: string }[]).map((h, i) => (
              <div key={h.dias || i} style={{ marginBottom: 10, padding: 10, background: "#F7F2EA", borderRadius: 8 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <div>
                    <label htmlFor={`horario-dias-${i}`} style={{ ...lbl, marginBottom: 3 }}>Días</label>
                    <input id={`horario-dias-${i}`} value={h.dias} onChange={(e) => setArr("horarios", i, "dias", e.target.value)} style={{ ...inp, fontSize: ".84rem" }} />
                  </div>
                  <div>
                    <label htmlFor={`horario-horas-${i}`} style={{ ...lbl, marginBottom: 3 }}>Horas</label>
                    <input id={`horario-horas-${i}`} value={h.horas} onChange={(e) => setArr("horarios", i, "horas", e.target.value)} style={{ ...inp, fontSize: ".84rem" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── STATS ── */}
        <div style={section}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontFamily: "var(--font-fraunces),serif", fontWeight: 500, fontSize: "1.2rem" }}>Stats (números destacados)</h3>
            <SaveBtn k="stats" saving={saving} onSave={save} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
            {(cms.stats as { num: string; text: string }[]).map((s, i) => {
              const textField = langTab === "es" ? "text" : `text_${langTab}`
              const textVal: string = (s as Record<string, string>)[textField] ?? ""
              return (
                <div key={s.num || i} style={{ background: "#F7F2EA", borderRadius: 10, padding: 12 }}>
                  <label htmlFor={`stat-num-${i}`} style={lbl}>Número</label>
                  <input id={`stat-num-${i}`} value={s.num} onChange={(e) => setArr("stats", i, "num", e.target.value)} style={{ ...inp, fontFamily: "var(--font-fraunces),serif", fontSize: "1.4rem", color: "var(--wine)", textAlign: "center", marginBottom: 8 }} />
                  <label htmlFor={`stat-text-${i}`} style={lbl}>Texto ({langTab.toUpperCase()})</label>
                  <input id={`stat-text-${i}`} value={textVal} onChange={(e) => setArr("stats", i, textField, e.target.value)} style={{ ...inp, fontSize: ".84rem" }} placeholder={langTab === "es" ? undefined : s.text} />
                </div>
              )
            })}
          </div>
        </div>

      </div>
      {toastEl}
    </>
  )
}
