export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ")
}

export const DAY_NAMES = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

export const LUNCH_SLOTS = ["13:00", "13:30", "14:00", "14:30", "15:00", "15:30"]
export const DINNER_SLOTS = ["20:00", "20:30", "21:00", "21:30", "22:00", "22:30"]

export const DINNER_DAYS = [5, 6] // viernes y sábado
