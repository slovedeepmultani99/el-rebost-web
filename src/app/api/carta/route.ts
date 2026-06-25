import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET() {
  const sections = await prisma.cartaSection.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
    include: {
      dishes: {
        where: { available: true },
        orderBy: { sortOrder: "asc" },
      },
    },
  })
  return NextResponse.json(sections)
}
