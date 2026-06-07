import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  const body = await req.json()
  const { sectionId } = body
  if (!sectionId) return NextResponse.json({ error: "sectionId requerido" }, { status: 400 })

  const lastDish = await prisma.cartaDish.findFirst({
    where: { sectionId },
    orderBy: { sortOrder: "desc" },
  })
  const sortOrder = (lastDish?.sortOrder ?? 0) + 1

  const dish = await prisma.cartaDish.create({ data: { ...body, sortOrder } })

  revalidateTag("carta")
  return NextResponse.json(dish, { status: 201 })
}
