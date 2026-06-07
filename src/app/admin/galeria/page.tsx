"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import AdminTopBar from "@/components/admin/AdminTopBar"
import { useToast } from "@/components/admin/Toast"

interface GalleryImage { id: string; imageUrl: string; title: string | null; sortOrder: number }

export default function GaleriaAdminPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
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

  async function deleteImage(id: string) {
    if (!confirm("¿Eliminar esta imagen?")) return
    const res = await fetch(`/api/galeria/${id}`, { method: "DELETE" })
    if (res.ok) { setImages((p) => p.filter((i) => i.id !== id)); toast("Imagen eliminada") }
  }

  return (
    <>
      <AdminTopBar crumb="Backoffice · Contenido" title="Galería">
        <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} style={{ display: "none" }} />
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
            style={{ border: "2px dashed var(--line,#E4D9C8)", borderRadius: 16, padding: 60, textAlign: "center", color: "var(--muted)", cursor: "pointer", transition: ".2s" }}
          >
            <div style={{ fontSize: "3rem", marginBottom: 12 }}>🖼</div>
            <p style={{ fontWeight: 600, marginBottom: 4 }}>No hay imágenes en la galería</p>
            <p style={{ fontSize: ".88rem" }}>Haz clic para subir la primera imagen</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 10 }}>
            {images.map((img) => (
              <div
                key={img.id}
                style={{ borderRadius: 12, overflow: "hidden", aspectRatio: "1", background: "var(--line,#E4D9C8)", position: "relative", cursor: "pointer" }}
                className="gal-thumb"
              >
                <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${img.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(58,15,27,0)", transition: ".2s", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 8 }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(58,15,27,.55)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(58,15,27,0)")}>
                  <button
                    onClick={() => deleteImage(img.id)}
                    style={{ background: "rgba(58,15,27,.75)", color: "#fff", border: "none", borderRadius: 6, fontSize: ".7rem", fontWeight: 700, padding: "2px 8px", cursor: "pointer", alignSelf: "flex-end" }}
                  >
                    Eliminar
                  </button>
                </div>
                {img.title && (
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "6px 8px", background: "linear-gradient(transparent,rgba(58,15,27,.8))", color: "#fff", fontSize: ".7rem", fontWeight: 600 }}>
                    {img.title}
                  </div>
                )}
              </div>
            ))}

            {/* Upload tile */}
            <div
              onClick={() => fileRef.current?.click()}
              style={{ borderRadius: 12, aspectRatio: "1", border: "2px dashed var(--line,#E4D9C8)", display: "grid", placeItems: "center", cursor: "pointer", color: "var(--muted)", fontWeight: 600, fontSize: ".8rem", flexDirection: "column" as const, gap: 4, transition: ".2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--ember)"; (e.currentTarget as HTMLElement).style.color = "var(--ember)" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--line,#E4D9C8)"; (e.currentTarget as HTMLElement).style.color = "var(--muted)" }}
            >
              <span style={{ fontSize: "1.5rem" }}>+</span>
              <span>Subir</span>
            </div>
          </div>
        )}
      </div>
      {toastEl}
    </>
  )
}
