import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  const { title, imageUrl } = await req.json()
  const updated = await prisma.galleryImage.update({
    where: { id: params.id },
    data: { ...(title !== undefined && { title }), ...(imageUrl !== undefined && { imageUrl }) },
  })
  return NextResponse.json(updated)
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  await prisma.galleryImage.delete({ where: { id: params.id } })
  return new NextResponse(null, { status: 204 })
}
