"use client"

export default function RootError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "var(--cream,#F5EDE0)", fontFamily: "var(--font-karla),sans-serif" }}>
      <div style={{ textAlign: "center", maxWidth: 480, padding: "0 24px" }}>
        <div style={{ fontSize: "3rem", marginBottom: 16 }}>🍽️</div>
        <h1 style={{ fontFamily: "var(--font-fraunces),serif", fontSize: "2rem", color: "var(--wine,#5C1A2B)", marginBottom: 12 }}>
          Algo ha ido mal
        </h1>
        <p style={{ color: "var(--muted,#6A554F)", marginBottom: 24 }}>
          No se ha podido cargar la página. Por favor, intenta de nuevo.
        </p>
        <button
          onClick={reset}
          style={{ background: "var(--ember,#C8552B)", color: "#fff", border: "none", borderRadius: 100, padding: ".8em 2em", fontWeight: 700, cursor: "pointer", fontSize: ".92rem" }}
        >
          Reintentar
        </button>
      </div>
    </div>
  )
}
