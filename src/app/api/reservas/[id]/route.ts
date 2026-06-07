import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  const { status } = await req.json()
  const allowed = ["pending", "confirmed", "cancelled"]
  if (!allowed.includes(status)) {
    return NextResponse.json({ error: "Estado inválido" }, { status: 400 })
  }

  const reservation = await prisma.reservation.update({
    where: { id: params.id },
    data: { status },
  })
  return NextResponse.json(reservation)
}
