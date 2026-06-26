"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import AdminTopBar from "@/components/admin/AdminTopBar"
import { useToast } from "@/components/admin/Toast"

type CmsKey = "hero" | "casa" | "features" | "stats" | "info" | "horarios" | "marca"
type Cms = Record<CmsKey, any>

const inp: React.CSSProperties = { border: "1.5px solid var(--line,#E4D9C8)", borderRadius: 10, padding: ".55em .8em", background: "#fff", color: "var(--ink)", fontFamily: "inherit", fontSize: ".9rem", width: "100%" }
const lbl: React.CSSProperties = { display: "block", fontSize: ".7rem", fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase" as const, color: "var(--muted,#6A554F)", marginBottom: 5 }
const section: React.CSSProperties = { background: "var(--bone,#FBF7EF)", border: "1px solid var(--line,#E4D9C8)", borderRadius: 16, padding: 20, marginBottom: 18 }

export default function ContenidoPage() {
  const [cms, setCms] = useState<Cms | null>(null)
  const [saving, setSaving] = useState<CmsKey | null>(null)
  const [uploadingPlate, setUploadingPlate] = useState<"plate1" | "plate2" | null>(null)
  const plate1Ref = useRef<HTMLInputElement>(null)
  const plate2Ref = useRef<HTMLInputElement>(null)
  const { toast, el: toastEl } = useToast()

  useEffect(() => {
    fetch("/api/settings").then((r) => r.json()).then(setCms)
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
      toast(`✓ Imagen subida — guarda para aplicar`)
    } else {
      toast("Error al subir imagen", "error")
    }
    setUploadingPlate(null)
    if (plate === "plate1" && plate1Ref.current) plate1Ref.current.value = ""
    if (plate === "plate2" && plate2Ref.current) plate2Ref.current.value = ""
  }

  const saveBtn = (key: CmsKey) => (
    <button onClick={() => save(key)} disabled={saving === key}
      style={{ display: "inline-flex", alignItems: "center", gap: ".4em", fontWeight: 700, fontSize: ".78rem", padding: ".42em .85em", borderRadius: 9, border: "1.5px solid var(--ember)", background: "var(--ember)", color: "#fff", cursor: "pointer", opacity: saving === key ? .6 : 1 }}>
      {saving === key ? "Guardando…" : "💾 Guardar"}
    </button>
  )

  if (!cms) return <div style={{ flex: 1, display: "grid", placeItems: "center", color: "var(--muted)" }}>Cargando…</div>

  return (
    <>
      <AdminTopBar crumb="Backoffice · Sistema" title="Web CMS" />
      <input ref={plate1Ref} type="file" accept="image/*" onChange={(e) => uploadPlate(e, "plate1")} style={{ display: "none" }} />
      <input ref={plate2Ref} type="file" accept="image/*" onChange={(e) => uploadPlate(e, "plate2")} style={{ display: "none" }} />

      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>

        {/* Hero */}
        <div style={section}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontFamily: "var(--font-fraunces),serif", fontWeight: 500, fontSize: "1.2rem" }}>Hero</h3>
            {saveBtn("hero")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[["h1a", "Título línea 1"], ["h1b", "Título línea 2 (cursiva)"], ["cta1", "Botón primario"], ["cta2", "Botón secundario"], ["badge", "Badge (reseñas)"], ["meta1t", "Meta 1 título"], ["meta1s", "Meta 1 subtítulo"], ["meta2t", "Meta 2 título"], ["meta2s", "Meta 2 subtítulo"]].map(([k, l]) => (
              <div key={k}>
                <label style={lbl}>{l}</label>
                <input value={cms.hero[k] ?? ""} onChange={(e) => set("hero", k, e.target.value)} style={inp} />
              </div>
            ))}
            <div style={{ gridColumn: "1/-1" }}>
              <label style={lbl}>Lead (párrafo)</label>
              <textarea value={cms.hero.lead ?? ""} onChange={(e) => set("hero", "lead", e.target.value)} rows={3} style={{ ...inp, resize: "none" as const }} />
            </div>
          </div>

          {/* Plate images */}
          <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid var(--line,#E4D9C8)" }}>
            <p style={{ ...lbl, marginBottom: 12, color: "var(--ink)" }}>Imágenes del hero (fotos flotantes)</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {(["plate1", "plate2"] as const).map((p) => {
                const ref = p === "plate1" ? plate1Ref : plate2Ref
                return (
                  <div key={p} style={{ background: "#F7F2EA", borderRadius: 12, padding: 14 }}>
                    <p style={{ ...lbl, marginBottom: 10 }}>{p === "plate1" ? "Foto 1 (arriba-derecha)" : "Foto 2 (abajo-izquierda)"}</p>
                    {cms.hero[`${p}Url`] && (
                      <div style={{ width: "100%", aspectRatio: "16/9", backgroundImage: `url(${cms.hero[`${p}Url`]})`, backgroundSize: "cover", backgroundPosition: "center", borderRadius: 8, marginBottom: 10, border: "1px solid var(--line,#E4D9C8)" }} />
                    )}
                    <div style={{ display: "grid", gap: 8 }}>
                      <div>
                        <label style={lbl}>URL imagen</label>
                        <div style={{ display: "flex", gap: 6 }}>
                          <input value={cms.hero[`${p}Url`] ?? ""} onChange={(e) => set("hero", `${p}Url`, e.target.value)} style={{ ...inp, fontSize: ".8rem" }} placeholder="/fotos/ejemplo.jpg o URL Supabase" />
                          <button onClick={() => ref.current?.click()} disabled={uploadingPlate === p} style={{ flexShrink: 0, padding: ".4em .7em", borderRadius: 8, border: "1.5px solid var(--ember)", background: "var(--ember)", color: "#fff", fontWeight: 700, fontSize: ".72rem", cursor: "pointer", whiteSpace: "nowrap" }}>
                            {uploadingPlate === p ? "…" : "⬆ Subir"}
                          </button>
                        </div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <div>
                          <label style={lbl}>Badge (ej: De la brasa)</label>
                          <input value={cms.hero[`${p}Badge`] ?? ""} onChange={(e) => set("hero", `${p}Badge`, e.target.value)} style={{ ...inp, fontSize: ".84rem" }} />
                        </div>
                        <div>
                          <label style={lbl}>Nombre del plato</label>
                          <input value={cms.hero[`${p}Name`] ?? ""} onChange={(e) => set("hero", `${p}Name`, e.target.value)} style={{ ...inp, fontSize: ".84rem" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Casa */}
        <div style={section}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontFamily: "var(--font-fraunces),serif", fontWeight: 500, fontSize: "1.2rem" }}>Sección La Casa</h3>
            {saveBtn("casa")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[["eyebrow", "Eyebrow"], ["heading", "Título"]].map(([k, l]) => (
              <div key={k}>
                <label style={lbl}>{l}</label>
                <input value={cms.casa[k] ?? ""} onChange={(e) => set("casa", k, e.target.value)} style={inp} />
              </div>
            ))}
            {[["p1", "Párrafo 1"], ["p2", "Párrafo 2"]].map(([k, l]) => (
              <div key={k} style={{ gridColumn: "1/-1" }}>
                <label style={lbl}>{l}</label>
                <textarea value={cms.casa[k] ?? ""} onChange={(e) => set("casa", k, e.target.value)} rows={3} style={{ ...inp, resize: "none" as const }} />
              </div>
            ))}
          </div>
        </div>

        {/* Info + Horarios */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
          <div style={section}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontFamily: "var(--font-fraunces),serif", fontWeight: 500, fontSize: "1.2rem" }}>Contacto</h3>
              {saveBtn("info")}
            </div>
            {[["tel", "Teléfono"], ["ig", "Instagram"], ["addr", "Dirección"], ["email", "Email"]].map(([k, l]) => (
              <div key={k} style={{ marginBottom: 12 }}>
                <label style={lbl}>{l}</label>
                <input value={cms.info[k] ?? ""} onChange={(e) => set("info", k, e.target.value)} style={inp} />
              </div>
            ))}
            <div style={{ marginTop: 4, paddingTop: 14, borderTop: "1px solid var(--line,#E4D9C8)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <span style={{ ...lbl, marginBottom: 2, display: "block" }}>Sección Reseñas</span>
                <span style={{ fontSize: ".8rem", color: "var(--muted)" }}>Visible en la web pública</span>
              </div>
              <button
                onClick={() => setBool("info", "showResenas", !cms.info?.showResenas)}
                style={{
                  width: 46, height: 26, borderRadius: 13, border: "none", cursor: "pointer", position: "relative", transition: "background .25s",
                  background: cms.info?.showResenas !== false ? "var(--ember)" : "#C8C0B8",
                  flexShrink: 0,
                }}
              >
                <span style={{
                  position: "absolute", top: 3, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left .25s",
                  left: cms.info?.showResenas !== false ? 22 : 3,
                }} />
              </button>
            </div>
          </div>

          <div style={section}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontFamily: "var(--font-fraunces),serif", fontWeight: 500, fontSize: "1.2rem" }}>Horarios</h3>
              {saveBtn("horarios")}
            </div>
            {(cms.horarios as { dias: string; horas: string; nota: string }[]).map((h, i) => (
              <div key={i} style={{ marginBottom: 10, padding: 10, background: "#F7F2EA", borderRadius: 8 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <div>
                    <label style={{ ...lbl, marginBottom: 3 }}>Días</label>
                    <input value={h.dias} onChange={(e) => setArr("horarios", i, "dias", e.target.value)} style={{ ...inp, fontSize: ".84rem" }} />
                  </div>
                  <div>
                    <label style={{ ...lbl, marginBottom: 3 }}>Horas</label>
                    <input value={h.horas} onChange={(e) => setArr("horarios", i, "horas", e.target.value)} style={{ ...inp, fontSize: ".84rem" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={section}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontFamily: "var(--font-fraunces),serif", fontWeight: 500, fontSize: "1.2rem" }}>Stats (números destacados)</h3>
            {saveBtn("stats")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
            {(cms.stats as { num: string; text: string }[]).map((s, i) => (
              <div key={i} style={{ background: "#F7F2EA", borderRadius: 10, padding: 12 }}>
                <label style={lbl}>Número</label>
                <input value={s.num} onChange={(e) => setArr("stats", i, "num", e.target.value)} style={{ ...inp, fontFamily: "var(--font-fraunces),serif", fontSize: "1.4rem", color: "var(--wine)", textAlign: "center", marginBottom: 8 }} />
                <label style={lbl}>Texto</label>
                <input value={s.text} onChange={(e) => setArr("stats", i, "text", e.target.value)} style={{ ...inp, fontSize: ".84rem" }} />
              </div>
            ))}
          </div>
        </div>

      </div>
      {toastEl}
    </>
  )
}
