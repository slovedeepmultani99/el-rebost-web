export default function TopBar({ tel, addr }: { tel: string; addr: string }) {
  return (
    <div style={{ background: "var(--wine-deep)", color: "var(--cream)" }} className="text-xs">
      <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: 38, gap: 18 }}>
        <p className="hidden sm:block" style={{ opacity: 0.9 }}>
          📍 {addr} &nbsp;·&nbsp; 🔥 Cuina casolana des de la brasa
        </p>
        <div className="flex gap-5 items-center ml-auto">
          <a href={`tel:+34${tel.replace(/\s/g, "")}`} style={{ color: "var(--cream)", fontWeight: 600, opacity: 0.92 }}>
            📞 {tel}
          </a>
        </div>
      </div>
    </div>
  )
}
