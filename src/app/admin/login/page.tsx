"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    })
    setLoading(false)
    if (result?.error) {
      setError("Email o contraseña incorrectos")
    } else {
      router.push("/admin")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="font-display text-2xl text-wine-700 mb-1 text-center">El Rebost</h1>
        <p className="text-center text-muted text-sm mb-6 font-body">Backoffice</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-body text-muted mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full border border-line rounded-lg px-3 py-2 text-ink text-sm focus:outline-none focus:border-wine-700 focus:ring-1 focus:ring-wine-700"
            />
          </div>
          <div>
            <label className="block text-sm font-body text-muted mb-1">Contraseña</label>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full border border-line rounded-lg px-3 py-2 text-ink text-sm focus:outline-none focus:border-wine-700 focus:ring-1 focus:ring-wine-700"
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-wine-700 text-cream py-2 rounded-lg font-body text-sm hover:bg-wine-900 transition-colors disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  )
}
