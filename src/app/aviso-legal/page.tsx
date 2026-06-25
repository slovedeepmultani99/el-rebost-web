import type { Metadata } from "next"
import Nav from "@/components/public/Nav"
import TopBar from "@/components/public/TopBar"
import Footer from "@/components/public/Footer"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "Aviso Legal",
  robots: { index: false, follow: false },
}

async function getCms() {
  const rows = await prisma.setting.findMany({ where: { key: { in: ["marca", "info", "horarios"] } } })
  return Object.fromEntries(rows.map((r) => [r.key, r.value])) as Record<string, any>
}

export default async function AvisoLegalPage() {
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
            Aviso Legal
          </h1>

          <p style={{ color: "var(--muted,#6A554F)", marginBottom: "2rem", fontSize: ".9rem" }}>
            Última actualización: enero de 2026
          </p>

          {[
            {
              title: "1. Datos identificativos del titular",
              body: `En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico, se informa que el titular de este sitio web es:

Denominación social: El Rebost de Montigalà
NIF/CIF: [INSERTAR NIF/CIF DEL TITULAR]
Domicilio: ${cms.info?.addr ?? "Carrer Manuel Moreno Mauricio, 35-37, 08917 Badalona, Barcelona"}
Teléfono: ${cms.info?.tel ?? "934 65 30 00"}
Correo electrónico: ${cms.info?.email || "[INSERTAR EMAIL DE CONTACTO]"}`,
            },
            {
              title: "2. Objeto y ámbito de aplicación",
              body: "El presente aviso legal regula el uso del sitio web de El Rebost de Montigalà. El acceso y uso de este sitio web implica la aceptación plena de las condiciones aquí indicadas.",
            },
            {
              title: "3. Propiedad intelectual e industrial",
              body: `Todos los contenidos de este sitio web —incluyendo textos, fotografías, gráficos, imágenes, logotipos, marcas, nombres comerciales, software, diseño gráfico, código fuente y demás elementos— son propiedad exclusiva de El Rebost de Montigalà o de terceros que han autorizado su uso, y están protegidos por las leyes de propiedad intelectual e industrial vigentes en España y en la Unión Europea.

Queda expresamente prohibida la reproducción, distribución, comunicación pública o transformación de cualquier contenido de este sitio, sin autorización expresa y por escrito del titular.

© ${new Date().getFullYear()} El Rebost de Montigalà. Tots els drets reservats.`,
            },
            {
              title: "4. Reservas y formularios",
              body: "Los datos facilitados a través del formulario de reservas serán utilizados exclusivamente para la gestión de la reserva solicitada y el contacto posterior con el cliente. No se utilizarán para ninguna otra finalidad ni serán cedidos a terceros.",
            },
            {
              title: "5. Cookies",
              body: "Este sitio web puede utilizar cookies técnicas necesarias para el funcionamiento correcto del servicio. No se utilizan cookies de seguimiento ni publicidad sin el consentimiento previo del usuario.",
            },
            {
              title: "6. Legislación aplicable y jurisdicción",
              body: "Las presentes condiciones se rigen por la legislación española. Para la resolución de cualquier conflicto derivado del acceso o uso de este sitio web, las partes se someten a los juzgados y tribunales de Badalona (Barcelona).",
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
