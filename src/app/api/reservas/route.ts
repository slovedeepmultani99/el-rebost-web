import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { sendReservationNotification } from "@/lib/email"

const LUNCH_SLOTS = ["13:00", "13:30", "14:00", "14:30", "15:00", "15:30"]
const DINNER_SLOTS = ["20:00", "20:30", "21:00", "21:30", "22:00", "22:30"]
const DINNER_DAYS = [5, 6]

export async function GET(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get("status")
  const date = searchParams.get("date")

  const where: Record<string, unknown> = {}
  if (status) where.status = status
  if (date) where.date = new Date(date)

  const reservations = await prisma.reservation.findMany({
    where,
    orderBy: [{ date: "asc" }, { time: "asc" }],
  })
  return NextResponse.json(reservations)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { date, time, service, name, phone, guests, notes } = body

  if (!date || !time || !service || !name || !phone || !guests) {
    return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 })
  }

  if (guests > 12) {
    return NextResponse.json(
      { error: "Para grupos de más de 12 personas, llámenos directamente al 934 65 30 00" },
      { status: 422 }
    )
  }

  const dateObj = new Date(date)
  const dayOfWeek = dateObj.getDay()

  const validSlots = service === "cena" ? DINNER_SLOTS : LUNCH_SLOTS
  if (!validSlots.includes(time)) {
    return NextResponse.json({ error: "Horario no disponible" }, { status: 422 })
  }

  if (service === "cena" && !DINNER_DAYS.includes(dayOfWeek)) {
    return NextResponse.json(
      { error: "Las cenas solo están disponibles viernes y sábado" },
      { status: 422 }
    )
  }

  const reservation = await prisma.reservation.create({
    data: { date: dateObj, time, service, name, phone, guests: parseInt(guests), notes },
  })

  try {
    await sendReservationNotification({ date, time, service, name, phone, guests, notes })
    await prisma.reservation.update({ where: { id: reservation.id }, data: { emailSent: true } })
  } catch {
    // email failure is non-blocking
  }

  return NextResponse.json(reservation, { status: 201 })
}
