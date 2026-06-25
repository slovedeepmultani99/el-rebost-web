import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET() {
  const menus = await prisma.dailyMenu.findMany({
    orderBy: { dayOfWeek: "asc" },
    include: { dishes: { orderBy: { sortOrder: "asc" } } },
  })
  return NextResponse.json(menus)
}
