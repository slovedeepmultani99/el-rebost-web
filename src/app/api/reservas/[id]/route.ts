import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  const body = await req.json()
  const data: Record<string, unknown> = {}

  if (body.status !== undefined) {
    if (!["pending", "confirmed", "cancelled"].includes(body.status))
      return NextResponse.json({ error: "Estado inválido" }, { status: 400 })
    data.status = body.status
  }
  if (body.name     !== undefined) data.name    = body.name
  if (body.phone    !== undefined) data.phone   = body.phone
  if (body.date     !== undefined) data.date    = new Date(body.date)
  if (body.time     !== undefined) data.time    = body.time
  if (body.service  !== undefined) data.service = body.service
  if (body.guests   !== undefined) data.guests  = Number.parseInt(body.guests)
  if (body.notes    !== undefined) data.notes   = body.notes || null

  const reservation = await prisma.reservation.update({ where: { id: params.id }, data })
  return NextResponse.json(reservation)
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  await prisma.reservation.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}
