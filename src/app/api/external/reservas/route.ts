import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  // Auth: Bearer token OR X-Api-Key header
  const auth = req.headers.get("authorization") ?? ""
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : (req.headers.get("x-api-key") ?? "")
  if (!token || token !== process.env.RESERVAS_API_KEY) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const status = searchParams.get("status") // "pending" | "confirmed" | "all"
  const date   = searchParams.get("date")   // "YYYY-MM-DD" opcional

  const where: Record<string, unknown> = {}

  if (!status || status === "active") {
    where.status = { in: ["pending", "confirmed"] }
  } else if (status === "pending" || status === "confirmed" || status === "cancelled") {
    where.status = status
  }
  // status === "all" → sin filtro de estado

  if (date) {
    const from = new Date(`${date}T00:00:00.000Z`)
    const to   = new Date(`${date}T23:59:59.999Z`)
    where.date = { gte: from, lte: to }
  }

  const reservas = await prisma.reservation.findMany({
    where,
    orderBy: [{ date: "asc" }, { time: "asc" }],
    select: {
      id: true,
      date: true,
      time: true,
      service: true,
      name: true,
      phone: true,
      guests: true,
      notes: true,
      status: true,
      createdAt: true,
    },
  })

  return NextResponse.json({ count: reservas.length, reservas })
}
