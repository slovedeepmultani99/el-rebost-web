import { prisma } from "@/lib/prisma"
import { unstable_cache } from "next/cache"
import TopBar from "@/components/public/TopBar"
import Nav from "@/components/public/Nav"
import Hero from "@/components/public/Hero"
import Esencia from "@/components/public/Esencia"
import MenuDia from "@/components/public/MenuDia"
import CartaPublica from "@/components/public/CartaPublica"
import Reservas from "@/components/public/Reservas"
import Resenas from "@/components/public/Resenas"
import Galeria from "@/components/public/Galeria"
import Extras from "@/components/public/Extras"
import Contacto from "@/components/public/Contacto"
import Footer from "@/components/public/Footer"
import WhatsAppButton from "@/components/public/WhatsAppButton"

const getSettings = unstable_cache(
  async () => {
    const rows = await prisma.setting.findMany()
    return Object.fromEntries(rows.map((s) => [s.key, s.value])) as Record<string, any>
  },
  ["settings"],
  { tags: ["settings"], revalidate: 3600 }
)

const getCarta = unstable_cache(
  async () => {
    const sections = await prisma.cartaSection.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
      include: { dishes: { where: { available: true }, orderBy: { sortOrder: "asc" } } },
    })
    return sections.map((s) => ({
      ...s,
      dishes: s.dishes.map((d) => ({ ...d, price: d.price?.toString() ?? null })),
    }))
  },
  ["carta"],
  { tags: ["carta"], revalidate: 3600 }
)

const getMenus = unstable_cache(
  async () =>
    prisma.dailyMenu.findMany({
      orderBy: { dayOfWeek: "asc" },
      include: { dishes: { orderBy: { sortOrder: "asc" } } },
    }),
  ["menus"],
  { tags: ["menu"], revalidate: 3600 }
)

const getGaleria = unstable_cache(
  async () =>
    prisma.galleryImage.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" }, take: 6 }),
  ["galeria"],
  { tags: ["galeria"], revalidate: 3600 }
)

async function getData() {
  const [cms, carta, menus, galeria] = await Promise.all([
    getSettings(),
    getCarta(),
    getMenus(),
    getGaleria(),
  ])
  return { cms, carta, menus, galeria }
}

export default async function Home() {
  const { cms, carta, menus, galeria } = await getData()
  const today = new Date().getDay()

  return (
    <>
      <TopBar tel={cms.info?.tel ?? "934 65 30 00"} addr={cms.info?.addr ?? "Carrer Manuel Moreno Mauricio, 35-37 · Badalona"} />
      <Nav />
      <Hero data={cms.hero} />
      <Esencia casa={cms.casa} features={cms.features} stats={cms.stats} />
      <MenuDia menus={menus} today={today} />
      <CartaPublica sections={carta} />
      <Reservas info={cms.info} horarios={cms.horarios} />
      <Resenas />
      <Galeria images={galeria} />
      <Extras />
      <Contacto info={cms.info} horarios={cms.horarios} />
      <Footer marca={cms.marca} info={cms.info} horarios={cms.horarios} />
      <WhatsAppButton />
    </>
  )
}
