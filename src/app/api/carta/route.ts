import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const showAll = searchParams.get("all") === "true"

  if (showAll) {
    const session = await auth()
    if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const sections = await prisma.cartaSection.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
    include: {
      dishes: {
        where: showAll ? undefined : { available: true },
        orderBy: { sortOrder: "asc" },
      },
    },
  })
  return NextResponse.json(sections)
}
