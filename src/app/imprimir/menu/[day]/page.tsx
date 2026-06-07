import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import PrintMenuClient from "./PrintMenuClient"

export default async function ImprimirMenuPage({ params }: { params: { day: string } }) {
  const session = await auth()
  if (!session) redirect("/admin/login")

  const dayOfWeek = parseInt(params.day)
  if (isNaN(dayOfWeek) || dayOfWeek < 0 || dayOfWeek > 6) redirect("/admin/menu")

  const menu = await prisma.dailyMenu.findUnique({
    where: { dayOfWeek },
    include: { dishes: { orderBy: { sortOrder: "asc" } } },
  })

  if (!menu) redirect("/admin/menu")

  return <PrintMenuClient menu={menu} />
}
