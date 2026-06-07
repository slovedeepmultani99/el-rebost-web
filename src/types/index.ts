export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

export type Course = "primero" | "segundo"

export type Service = "comida" | "cena"

export type ReservationStatus = "pending" | "confirmed" | "cancelled"

export type UserRole = "admin" | "editor"

// ── Carta ─────────────────────────────────────────────
export interface Dish {
  id: string
  sectionId: string
  name: string
  description: string | null
  price: string | null
  available: boolean
  isStar: boolean
  isVeg: boolean
  isSg: boolean
  imageUrl: string | null
  sortOrder: number
}

export interface CartaSection {
  id: string
  title: string
  subtitle: string | null
  note: string | null
  isSalsas: boolean
  sortOrder: number
  active: boolean
  dishes: Dish[]
}

// ── Menú del día ──────────────────────────────────────
export interface DailyDish {
  id: string
  menuId: string
  course: Course
  name: string
  description: string | null
  sortOrder: number
  isSupplement: boolean
  suppPrice: string | null
}

export interface DailyMenu {
  id: string
  dayOfWeek: DayOfWeek
  price: string
  postre: string
  inclBread: boolean
  inclDrink: boolean
  inclCoffee: boolean
  inclDessert: boolean
  active: boolean
  dishes: DailyDish[]
}

// ── Reservas ──────────────────────────────────────────
export interface Reservation {
  id: string
  date: string
  time: string
  service: Service
  name: string
  phone: string
  guests: number
  notes: string | null
  status: ReservationStatus
  emailSent: boolean
  createdAt: string
}

// ── Settings CMS ──────────────────────────────────────
export interface Setting {
  key: string
  value: unknown
  updatedAt: string
}
