import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
  const settings = await prisma.setting.findMany()
  const data = Object.fromEntries(settings.map((s) => [s.key, s.value]))
  return NextResponse.json(data)
}

export async function PUT(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  const { key, value } = await req.json()
  if (!key || value === undefined) {
    return NextResponse.json({ error: "key y value son requeridos" }, { status: 400 })
  }

  const setting = await prisma.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  })

  revalidateTag("settings")
  return NextResponse.json(setting)
}
