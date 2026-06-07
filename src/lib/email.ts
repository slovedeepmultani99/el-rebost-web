import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface ReservationEmailData {
  name: string
  date: string
  time: string
  service: string
  guests: number
  notes?: string | null
  phone: string
}

export async function sendReservationNotification(data: ReservationEmailData) {
  const serviceLabel = data.service === "cena" ? "Cena" : "Comida"
  const dateStr = new Date(data.date).toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  await resend.emails.send({
    from: "El Rebost de Montigalà <reservas@rebostmontigala.com>",
    to: ["admin@rebostmontigala.com"],
    subject: `Nueva reserva: ${data.name} · ${dateStr} ${data.time}`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto">
        <h2 style="color:#5C1A2B">Nueva reserva recibida</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:6px 0;color:#6A554F;width:120px">Nombre</td><td><strong>${data.name}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#6A554F">Fecha</td><td>${dateStr}</td></tr>
          <tr><td style="padding:6px 0;color:#6A554F">Hora</td><td>${data.time}</td></tr>
          <tr><td style="padding:6px 0;color:#6A554F">Servicio</td><td>${serviceLabel}</td></tr>
          <tr><td style="padding:6px 0;color:#6A554F">Comensales</td><td>${data.guests} personas</td></tr>
          <tr><td style="padding:6px 0;color:#6A554F">Teléfono</td><td>${data.phone}</td></tr>
          ${data.notes ? `<tr><td style="padding:6px 0;color:#6A554F">Notas</td><td>${data.notes}</td></tr>` : ""}
        </table>
        <p style="margin-top:20px;color:#6A554F;font-size:12px">El Rebost de Montigalà · Carrer Manuel Moreno Mauricio, 35-37, Badalona</p>
      </div>
    `,
  })
}
