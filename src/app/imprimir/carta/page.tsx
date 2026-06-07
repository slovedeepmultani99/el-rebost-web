import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import PrintCartaClient from "./PrintCartaClient"

export default async function ImprimirCartaPage() {
  const session = await auth()
  if (!session) redirect("/admin/login")

  const sections = await prisma.cartaSection.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
    include: {
      dishes: { where: { available: true }, orderBy: { sortOrder: "asc" } },
    },
  })

  const serialized = sections.map((s) => ({
    ...s,
    dishes: s.dishes.map((d) => ({
      ...d,
      price: d.price?.toString() ?? null,
    })),
  }))

  return <PrintCartaClient sections={serialized} />
}
