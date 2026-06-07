import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  const body = await req.json()
  const lastSection = await prisma.cartaSection.findFirst({ orderBy: { sortOrder: "desc" } })
  const sortOrder = (lastSection?.sortOrder ?? 0) + 1

  const section = await prisma.cartaSection.create({
    data: { ...body, sortOrder },
  })

  revalidateTag("carta")
  return NextResponse.json(section, { status: 201 })
}
