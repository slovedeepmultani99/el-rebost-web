import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(_req: Request, { params }: { params: { day: string } }) {
  const dayOfWeek = parseInt(params.day)
  if (isNaN(dayOfWeek) || dayOfWeek < 0 || dayOfWeek > 6) {
    return NextResponse.json({ error: "Día inválido (0-6)" }, { status: 400 })
  }

  const menu = await prisma.dailyMenu.findUnique({
    where: { dayOfWeek },
    include: { dishes: { orderBy: { sortOrder: "asc" } } },
  })
  if (!menu) return NextResponse.json({ error: "No encontrado" }, { status: 404 })
  return NextResponse.json(menu)
}

export async function PUT(req: Request, { params }: { params: { day: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  const dayOfWeek = parseInt(params.day)
  if (isNaN(dayOfWeek) || dayOfWeek < 0 || dayOfWeek > 6) {
    return NextResponse.json({ error: "Día inválido" }, { status: 400 })
  }

  const body = await req.json()
  const { dishes, ...menuData } = body

  const menu = await prisma.dailyMenu.update({
    where: { dayOfWeek },
    data: menuData,
  })

  if (Array.isArray(dishes)) {
    await prisma.dailyDish.deleteMany({ where: { menuId: menu.id } })
    for (const [i, d] of dishes.entries()) {
      await prisma.dailyDish.create({
        data: { ...d, menuId: menu.id, sortOrder: d.sortOrder ?? i },
      })
    }
  }

  const updated = await prisma.dailyMenu.findUnique({
    where: { dayOfWeek },
    include: { dishes: { orderBy: { sortOrder: "asc" } } },
  })

  revalidateTag("menu")
  return NextResponse.json(updated)
}
