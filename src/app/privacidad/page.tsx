import type { Metadata } from "next"
import Nav from "@/components/public/Nav"
import TopBar from "@/components/public/TopBar"
import Footer from "@/components/public/Footer"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "Política de Privacidad",
  robots: { index: false, follow: false },
}

async function getCms() {
  const rows = await prisma.setting.findMany({ where: { key: { in: ["marca", "info", "horarios"] } } })
  return Object.fromEntries(rows.map((r) => [r.key, r.value])) as Record<string, any>
}

export default async function PrivacidadPage() {
  const cms = await getCms()

  return (
    <>
      <TopBar tel={cms.info?.tel ?? "934 65 30 00"} addr={cms.info?.addr ?? "Carrer Manuel Moreno Mauricio, 35-37 · Badalona"} />
      <Nav />
      <main
        style={{
          paddingTop: 78,
          minHeight: "100vh",
          background: "var(--bone,#FBF7EF)",
          fontFamily: "var(--font-karla),sans-serif",
        }}
      >
        <div
          className="wrap"
          style={{ paddingTop: "4rem", paddingBottom: "4rem", maxWidth: 760, margin: "0 auto" }}
        >
          <h1
            style={{
              fontFamily: "var(--font-fraunces),serif",
              fontSize: "2.2rem",
              color: "var(--wine,#5C1A2B)",
              marginBottom: "2rem",
            }}
          >
            Política de Privacidad
          </h1>

          <p style={{ color: "var(--muted,#6A554F)", marginBottom: "2rem", fontSize: ".9rem" }}>
            Última actualización: enero de 2026 · En cumplimiento del RGPD (UE) 2016/679 y la LOPDGDD
          </p>

          {[
            {
              title: "1. Responsable del tratamiento",
              body: `Denominación: El Rebost de Montigalà
NIF/CIF: [INSERTAR NIF/CIF DEL TITULAR]
Dirección: ${cms.info?.addr ?? "Carrer Manuel Moreno Mauricio, 35-37, 08917 Badalona, Barcelona"}
Teléfono: ${cms.info?.tel ?? "934 65 30 00"}
Correo electrónico: ${cms.info?.email || "[INSERTAR EMAIL DE CONTACTO]"}`,
            },
            {
              title: "2. Datos que recopilamos y finalidad",
              body: `Formulario de reservas: nombre, teléfono y, opcionalmente, notas o indicaciones especiales. Esta información se usa exclusivamente para gestionar la reserva y contactar con el cliente para confirmarla o en caso de incidencia.

No recopilamos datos de pago. No creamos perfiles de usuario. No usamos técnicas de seguimiento invasivas.`,
            },
            {
              title: "3. Base legal del tratamiento",
              body: "La base legal es la ejecución de un contrato de prestación de servicio (la reserva) o las medidas precontractuales solicitadas por el interesado (Art. 6.1.b RGPD).",
            },
            {
              title: "4. Conservación de datos",
              body: "Los datos de reservas se conservan durante el tiempo necesario para la gestión del servicio y, en su caso, para cumplir con las obligaciones legales aplicables. No se conservan más allá del período necesario.",
            },
            {
              title: "5. Comunicación de datos a terceros",
              body: "No cedemos datos personales a terceros, salvo obligación legal. No realizamos transferencias internacionales de datos.",
            },
            {
              title: "6. Derechos del interesado",
              body: `En cualquier momento puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, portabilidad y limitación del tratamiento, contactando con nosotros por teléfono (${cms.info?.tel ?? "934 65 30 00"}) o presencialmente en nuestro establecimiento.

También puedes presentar reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).`,
            },
            {
              title: "7. Seguridad",
              body: "Aplicamos medidas técnicas y organizativas adecuadas para proteger la información frente a accesos no autorizados, pérdida o destrucción accidental.",
            },
          ].map((sec) => (
            <div key={sec.title} style={{ marginBottom: "2rem" }}>
              <h2
                style={{
                  fontFamily: "var(--font-fraunces),serif",
                  fontSize: "1.2rem",
                  color: "var(--wine,#5C1A2B)",
                  marginBottom: ".6rem",
                }}
              >
                {sec.title}
              </h2>
              <p style={{ color: "var(--ink,#2A1A18)", lineHeight: 1.7, whiteSpace: "pre-line", fontSize: ".95rem" }}>
                {sec.body}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer marca={cms.marca} info={cms.info} horarios={cms.horarios} />
    </>
  )
}
