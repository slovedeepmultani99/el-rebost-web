import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  const body = await req.json()
  const dish = await prisma.cartaDish.update({ where: { id: params.id }, data: body })

  revalidateTag("carta")
  return NextResponse.json(dish)
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  await prisma.cartaDish.delete({ where: { id: params.id } })

  revalidateTag("carta")
  return new NextResponse(null, { status: 204 })
}
