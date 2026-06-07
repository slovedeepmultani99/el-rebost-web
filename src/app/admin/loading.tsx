export default function AdminLoading() {
  return (
    <div style={{ flex: 1, display: "grid", placeItems: "center", color: "var(--muted,#6A554F)" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-fraunces),serif", fontSize: "1.4rem", color: "var(--wine,#5C1A2B)", marginBottom: 8 }}>
          El Rebost
        </div>
        <p style={{ fontSize: ".84rem" }}>Cargando…</p>
      </div>
    </div>
  )
}
