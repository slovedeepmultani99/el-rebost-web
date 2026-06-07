"use client"

export default function AdminError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ flex: 1, display: "grid", placeItems: "center", color: "var(--muted,#6A554F)", padding: 40 }}>
      <div style={{ textAlign: "center", maxWidth: 400 }}>
        <div style={{ fontSize: "2rem", marginBottom: 12 }}>⚠️</div>
        <h2 style={{ fontFamily: "var(--font-fraunces),serif", fontSize: "1.4rem", color: "var(--wine,#5C1A2B)", marginBottom: 8 }}>
          Algo ha salido mal
        </h2>
        <p style={{ fontSize: ".88rem", marginBottom: 16 }}>{error.message}</p>
        <button
          onClick={reset}
          style={{ background: "var(--ember,#C8552B)", color: "#fff", border: "none", borderRadius: 9, padding: ".6em 1.4em", fontWeight: 700, cursor: "pointer", fontSize: ".84rem" }}
        >
          Reintentar
        </button>
      </div>
    </div>
  )
}
