interface GalleryImage { id: string; imageUrl: string; title: string | null }

const PLACEHOLDER_TILES = [
  { img: "1544025162-d76694265947", t: "Chuletón a la brasa", big: true },
  { img: "1534080564583-6be75777b70a", t: "Arroces caseros" },
  { img: "1565299624946-b28f40a0ae38", t: "Tapas para compartir" },
  { img: "1414235077428-338989a2e8c0", t: "Salón rústico" },
  { img: "1551782450-a2132b4ba21d", t: "Producto de mercado" },
  { img: "1559339352-11d035aa65de", t: "Bodega de vinos" },
]

export default function Galeria({ images }: { images: GalleryImage[] }) {
  const tiles = images.length > 0
    ? images.map((img, i) => ({ url: img.imageUrl, title: img.title ?? "", big: i === 0 }))
    : PLACEHOLDER_TILES.map((p) => ({
        url: `https://images.unsplash.com/photo-${p.img}?auto=format&fit=crop&w=700&q=70`,
        title: p.t,
        big: p.big ?? false,
      }))

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
