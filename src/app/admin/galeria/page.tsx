"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import AdminTopBar from "@/components/admin/AdminTopBar"
import { useToast } from "@/components/admin/Toast"

interface GalleryImage { id: string; imageUrl: string; title: string | null; sortOrder: number }

export default function GaleriaAdminPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [uploading, setUploading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [replacingId, setReplacingId] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const replaceRef = useRef<HTMLInputElement>(null)
  const { toast, el: toastEl } = useToast()

  const load = useCallback(async () => {
    const res = await fetch("/api/galeria")
    const data = await res.json()
    setImages(Array.isArray(data) ? data : [])
  }, [])

  useEffect(() => { load() }, [load])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append("file", file)
    fd.append("bucket", "galeria")
    const uploadRes = await fetch("/api/upload", { method: "POST", body: fd })
    if (!uploadRes.ok) { toast("Error al subir imagen", "error"); setUploading(false); return }
    const { url } = await uploadRes.json()
    const saveRes = await fetch("/api/galeria", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: url, title: file.name.replace(/\.[^.]+$/, "") }),
    })
    if (saveRes.ok) { await load(); toast("✓ Imagen subida") }
    else toast("Error al guardar", "error")
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ""
  }

  async function handleReplace(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !replacingId) return
    const fd = new FormData()
    fd.append("file", file)
    fd.append("bucket", "galeria")
    const uploadRes = await fetch("/api/upload", { method: "POST", body: fd })
    if (!uploadRes.ok) { toast("Error al subir imagen", "error"); return }
    const { url } = await uploadRes.json()
    const patchRes = await fetch(`/api/galeria/${replacingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: url }),
    })
    if (patchRes.ok) { await load(); toast("✓ Imagen reemplazada") }
    else toast("Error al reemplazar", "error")
    setReplacingId(null)
    if (replaceRef.current) replaceRef.current.value = ""
  }

  async function saveTitle(id: string) {
    const res = await fetch(`/api/galeria/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editTitle }),
    })
    if (res.ok) {
      setImages((p) => p.map((img) => img.id === id ? { ...img, title: editTitle } : img))
      toast("✓ Nombre guardado")
    } else toast("Error al guardar", "error")
    setEditingId(null)
  }

  async function deleteImage(id: string) {
    if (!confirm("¿Eliminar esta imagen?")) return
    const res = await fetch(`/api/galeria/${id}`, { method: "DELETE" })
    if (res.ok) { setImages((p) => p.filter((i) => i.id !== id)); toast("Imagen eliminada") }
  }

  return (
    <>
      <AdminTopBar crumb="Backoffice · Contenido" title="Galería">
        <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} style={{ display: "none" }} />
        <input ref={replaceRef} type="file" accept="image/*" onChange={handleReplace} style={{ display: "none" }} />
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          style={{ display: "inline-flex", alignItems: "center", gap: ".4em", fontWeight: 700, fontSize: ".84rem", padding: ".6em 1.15em", borderRadius: 9, border: "1.5px solid var(--ember)", background: "var(--ember)", color: "#fff", cursor: "pointer", opacity: uploading ? .6 : 1 }}
        >
          {uploading ? "Subiendo…" : "⬆ Subir imagen"}
        </button>
      </AdminTopBar>

      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        {images.length === 0 ? (
          <div
            onClick={() => fileRef.current?.click()}
            style={{ border: "2px dashed var(--line,#E4D9C8)", borderRadius: 16, padding: 60, textAlign: "center", color: "var(--muted)", cursor: "pointer" }}
          >
            <div style={{ fontSize: "3rem", marginBottom: 12 }}>🖼</div>
            <p style={{ fontWeight: 600, marginBottom: 4 }}>No hay imágenes en la galería</p>
            <p style={{ fontSize: ".88rem" }}>Haz clic para subir la primera imagen</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 12 }}>
            {images.map((img) => (
              <div key={img.id} style={{ borderRadius: 14, overflow: "hidden", background: "var(--bone,#FBF7EF)", border: "1px solid var(--line,#E4D9C8)", display: "flex", flexDirection: "column" }}>
                {/* Image */}
                <div style={{ aspectRatio: "4/3", backgroundImage: `url(${img.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
                  <button
                    onClick={() => { setReplacingId(img.id); replaceRef.current?.click() }}
                    title="Reemplazar imagen"
                    style={{ position: "absolute", top: 6, right: 6, background: "rgba(0,0,0,.55)", color: "#fff", border: "none", borderRadius: 6, padding: "3px 8px", fontSize: ".68rem", fontWeight: 700, cursor: "pointer" }}
                  >
                    🔄 Reemplazar
                  </button>
                </div>

                {/* Title */}
                <div style={{ padding: "8px 10px 10px", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                  {editingId === img.id ? (
                    <div style={{ display: "flex", gap: 4 }}>
                      <input
                        autoFocus
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") saveTitle(img.id); if (e.key === "Escape") setEditingId(null) }}
                        style={{ flex: 1, border: "1.5px solid var(--ember)", borderRadius: 6, padding: "3px 6px", fontSize: ".8rem", fontFamily: "inherit" }}
                      />
                      <button onClick={() => saveTitle(img.id)} style={{ background: "var(--ember)", color: "#fff", border: "none", borderRadius: 6, padding: "3px 8px", fontSize: ".72rem", fontWeight: 700, cursor: "pointer" }}>✓</button>
                      <button onClick={() => setEditingId(null)} style={{ background: "var(--line)", color: "var(--muted)", border: "none", borderRadius: 6, padding: "3px 8px", fontSize: ".72rem", cursor: "pointer" }}>✕</button>
                    </div>
                  ) : (
                    <button
                      onClick={() => { setEditingId(img.id); setEditTitle(img.title ?? "") }}
                      style={{ textAlign: "left", background: "none", border: "none", cursor: "pointer", fontSize: ".82rem", fontWeight: 600, color: "var(--ink)", padding: 0, fontFamily: "inherit" }}
                    >
                      {img.title ?? <span style={{ color: "var(--muted)", fontWeight: 400, fontStyle: "italic" }}>Sin nombre — clic para editar</span>}
                      <span style={{ color: "var(--muted)", marginLeft: 4, fontSize: ".7rem" }}>✏</span>
                    </button>
                  )}

                  <button
                    onClick={() => deleteImage(img.id)}
                    style={{ alignSelf: "flex-start", background: "rgba(200,85,43,.1)", color: "var(--ember)", border: "none", borderRadius: 6, fontSize: ".72rem", fontWeight: 700, padding: "3px 10px", cursor: "pointer" }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}

            {/* Upload tile */}
            <div
              onClick={() => fileRef.current?.click()}
              style={{ borderRadius: 14, aspectRatio: "4/3", border: "2px dashed var(--line,#E4D9C8)", display: "grid", placeItems: "center", cursor: "pointer", color: "var(--muted)", fontWeight: 600, fontSize: ".82rem" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--ember)"; (e.currentTarget as HTMLElement).style.color = "var(--ember)" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--line,#E4D9C8)"; (e.currentTarget as HTMLElement).style.color = "var(--muted)" }}
            >
              <div style={{ textAlign: "center" }}><div style={{ fontSize: "1.8rem" }}>+</div><div>Subir foto</div></div>
            </div>
          </div>
        )}
      </div>
      {toastEl}
    </>
  )
}
