import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
  const images = await prisma.galleryImage.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  })
  return NextResponse.json(images)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  const body = await req.json()
  const last = await prisma.galleryImage.findFirst({ orderBy: { sortOrder: "desc" } })
  const sortOrder = (last?.sortOrder ?? 0) + 1

  const image = await prisma.galleryImage.create({ data: { ...body, sortOrder } })
  return NextResponse.json(image, { status: 201 })
}
