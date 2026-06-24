import { prisma } from "@/lib/prisma"
import CartaQR from "./CartaQR"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Carta · El Rebost de Montigalà",
  description: "Carta completa con precios del Rebost de Montigalà, Badalona.",
}

export default async function CartaQRPage() {
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

  const data = sections.map((s) => ({
    id: s.id,
    title: s.title,
    subtitle: s.subtitle,
    note: s.note,
    dishes: s.dishes.map((d) => ({
      id: d.id,
      name: d.name,
      description: d.description,
      price: d.price?.toString() ?? null,
    })),
  }))

  return <CartaQR sections={data} />
}
