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
    <div className="admin-topbar">
      <div style={{ minWidth: 0 }}>
        <p className="admin-topbar-crumb">{crumb}</p>
        <h2 className="admin-topbar-title">{title}</h2>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>{children}</div>
    </div>
  )
}
