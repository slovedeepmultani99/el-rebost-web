interface GalleryImage { id: string; imageUrl: string; title: string | null }

export default function Galeria({ images }: { images: GalleryImage[] }) {
  if (images.length === 0) return null
  const tiles = images.map((img, i) => ({ url: img.imageUrl, title: img.title ?? "", big: i === 0 }))

  return (
    <section
      id="galeria"
      style={{ padding: "96px 0", background: "linear-gradient(180deg,#efe4d3,var(--cream))", scrollMarginTop: 78 }}
    >
      <div className="wrap">
        <div className="sec-head center">
          <div className="eyebrow">El rincón gastronómico</div>
          <h2>Galería</h2>
        </div>

        <div
          className="mob-2col"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gridAutoRows: 170,
            gap: 14,
          }}
        >
          {tiles.map((tile, i) => (
            <div
              key={i}
              style={{
                borderRadius: 16,
                overflow: "hidden",
                position: "relative",
                backgroundImage: `linear-gradient(160deg,rgba(92,26,43,.15),rgba(58,15,27,.35)), url('${tile.url}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                boxShadow: "var(--shadow)",
                gridRow: tile.big ? "span 2" : undefined,
                gridColumn: tile.big ? "span 2" : undefined,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  right: 0,
                  padding: "14px 12px 10px",
                  background: "linear-gradient(transparent, rgba(58,15,27,.85))",
                  color: "var(--cream)",
                  fontFamily: "var(--font-fraunces), serif",
                  fontSize: "1rem",
                }}
              >
                {tile.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
