"use client"

import { useEffect, useState } from "react"

export function useToast() {
  const [msg, setMsg] = useState("")
  const [type, setType] = useState<"ok" | "error">("ok")
  const [visible, setVisible] = useState(false)

  function toast(message: string, kind: "ok" | "error" = "ok") {
    setMsg(message)
    setType(kind)
    setVisible(true)
  }

  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => setVisible(false), 2500)
    return () => clearTimeout(t)
  }, [visible, msg])

  const el = (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: `translateX(-50%) translateY(${visible ? 0 : 120}px)`,
        background: type === "ok" ? "var(--olive, #4e6236)" : "var(--ember, #C8552B)",
        color: "#fff",
        padding: "12px 22px",
        borderRadius: 11,
        fontWeight: 700,
        boxShadow: "var(--shadow)",
        transition: ".35s",
        zIndex: 500,
        pointerEvents: "none",
        whiteSpace: "nowrap",
        fontSize: ".88rem",
      }}
    >
      {msg}
    </div>
  )

  return { toast, el }
}
