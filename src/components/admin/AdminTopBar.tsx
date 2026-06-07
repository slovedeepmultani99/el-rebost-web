export default function AdminTopBar({
  crumb,
  title,
  children,
}: {
  crumb: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <div
      style={{
        background: "var(--bone, #FBF7EF)",
        borderBottom: "1px solid var(--line, #E4D9C8)",
        padding: "13px 26px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
      }}
    >
      <div>
        <p style={{ fontSize: ".72rem", color: "var(--muted, #6A554F)", marginBottom: 1 }}>{crumb}</p>
        <h2 style={{ fontSize: "1.3rem", fontFamily: "var(--font-fraunces), serif", fontWeight: 500 }}>
          {title}
        </h2>
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>{children}</div>
    </div>
  )
}
