import type { Metadata, Viewport } from "next"
import { Fraunces, Karla } from "next/font/google"
import "./globals.css"

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
})

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  display: "swap",
})

const SITE_URL = process.env.NEXTAUTH_URL ?? "https://www.elrebostdemontigala.com"

export const viewport: Viewport = {
  themeColor: "#5C1A2B",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "El Rebost de Montigalà | Brasería · Tapas · Arroces · Badalona",
    template: "%s | El Rebost de Montigalà · Badalona",
  },
  description:
    "El Rebost de Montigalà, brasería catalana en Badalona (Montigalà). Menú del día desde 16€, arroces caseros, tapas y carnes a la brasa de encina. Reserva online. A 10 min de Barcelona, Santa Coloma, Mataró y El Masnou.",
  keywords: [
    // Marca
    "El Rebost de Montigalà",
    "Rebost Montigalà",
    // Localidad principal
    "restaurante Badalona",
    "brasería Badalona",
    "menú del día Badalona",
    "tapas Badalona",
    "arroces Badalona",
    "carnes a la brasa Badalona",
    "restaurante Montigalà",
    "donde comer Badalona",
    "mejor restaurante Badalona",
    "comida de empresa Badalona",
    "restaurante grupos Badalona",
    // Localidades cercanas
    "restaurante cerca Barcelona",
    "brasería cerca Barcelona",
    "restaurante Santa Coloma de Gramenet",
    "restaurante Mataró",
    "restaurante El Masnou",
    "restaurante Montgat",
    "restaurante Tiana",
    "restaurante Premià de Mar",
    "restaurante Masnou",
    "restaurante Maresme",
    "restaurante norte Barcelona",
    // Catalan
    "restaurant Badalona",
    "braseria Badalona",
    "menú del dia Badalona",
    "on menjar Badalona",
    "arrossos Badalona",
    // Long-tail
    "menú del día 16 euros Badalona",
    "reservar mesa restaurante Badalona",
    "arroz con bogavante Badalona",
    "cocina catalana Badalona",
    "brasería catalana Barcelona norte",
  ],
  authors: [{ name: "El Rebost de Montigalà" }],
  creator: "El Rebost de Montigalà",
  publisher: "El Rebost de Montigalà",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: "ca_ES",
    url: SITE_URL,
    siteName: "El Rebost de Montigalà",
    title: "El Rebost de Montigalà | Brasería · Tapas · Arroces · Badalona",
    description:
      "Brasería catalana en Badalona. Menú del día desde 16€, arroces caseros y carnes a la brasa. Reserva tu mesa online.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "El Rebost de Montigalà — Brasería en Badalona",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "El Rebost de Montigalà | Brasería Badalona",
    description: "Menú del día, tapas, arroces y carnes a la brasa en el barrio de Montigalà, Badalona.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "es-ES": SITE_URL,
      "ca-ES": SITE_URL,
    },
  },
  category: "restaurant",
  other: {
    "geo.region": "ES-CT",
    "geo.placename": "Badalona, Barcelona",
    "geo.position": "41.4509;2.2489",
    "ICBM": "41.4509, 2.2489",
  },
}

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${SITE_URL}/#restaurant`,
  name: "El Rebost de Montigalà",
  alternateName: ["El Rebost Montigalà", "Rebost de Montigalà"],
  description:
    "Brasería catalana en el barrio de Montigalà (Badalona). Especialidad en carnes a la brasa de encina, arroces caseros y tapas. Menú del día desde 16€.",
  url: SITE_URL,
  telephone: "+34934653000",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Carrer Manuel Moreno Mauricio, 35-37",
    addressLocality: "Badalona",
    addressRegion: "Barcelona",
    postalCode: "08917",
    addressCountry: "ES",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.4509,
    longitude: 2.2489,
  },
  hasMap: "https://www.google.com/maps/search/El+Rebost+de+Montigala+Badalona",
  priceRange: "€€",
  servesCuisine: [
    "Cocina catalana",
    "Cocina mediterránea",
    "Brasería",
    "Tapas",
    "Arroces",
    "Carnes a la brasa",
  ],
  menu: `${SITE_URL}/#carta`,
  acceptsReservations: true,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.1",
    bestRating: "5",
    worstRating: "1",
    reviewCount: "4000",
    ratingCount: "4000",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "13:00",
      closes: "16:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday"],
      opens: "13:00",
      closes: "16:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday"],
      opens: "20:00",
      closes: "23:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "13:00",
      closes: "16:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/rebostdemontigala",
    "https://www.google.com/maps/search/El+Rebost+de+Montigala+Badalona",
  ],
  areaServed: [
    { "@type": "City", name: "Badalona" },
    { "@type": "City", name: "Santa Coloma de Gramenet" },
    { "@type": "City", name: "Barcelona" },
    { "@type": "City", name: "El Masnou" },
    { "@type": "City", name: "Montgat" },
    { "@type": "City", name: "Tiana" },
    { "@type": "City", name: "Mataró" },
  ],
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/#reservas`,
      actionPlatform: [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform",
      ],
    },
    result: { "@type": "Reservation", name: "Reserva de mesa" },
  },
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "El Rebost de Montigalà",
  url: SITE_URL,
  publisher: { "@type": "Restaurant", "@id": `${SITE_URL}/#restaurant` },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cuánto cuesta el menú del día en El Rebost de Montigalà?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El menú del día cuesta 16 € (IVA incluido) e incluye primer plato, segundo plato, pan, bebida y postre o café. El menú varía cada día según el mercado y está disponible de lunes a domingo a mediodía.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuál es el horario de El Rebost de Montigalà?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Abrimos de lunes a domingo para las comidas de mediodía de 13:00 a 16:00 h. Las cenas solo están disponibles los viernes y sábados, de 20:00 a 23:00 h.",
      },
    },
    {
      "@type": "Question",
      name: "¿Dónde está El Rebost de Montigalà?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Estamos en el Carrer Manuel Moreno Mauricio 35-37, en el barrio de Montigalà de Badalona (08917), a 10 minutos de Barcelona y cerca de Santa Coloma de Gramenet, El Masnou y Montgat. Hay aparcamiento fácil junto al Centro Comercial Montigalà.",
      },
    },
    {
      "@type": "Question",
      name: "¿Se puede reservar mesa online en El Rebost de Montigalà?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, puedes hacer tu reserva directamente desde el formulario de nuestra web o llamarnos al 934 653 000. Para grupos de más de 12 personas es necesario contactar por teléfono.",
      },
    },
    {
      "@type": "Question",
      name: "¿Hay parking cerca de El Rebost de Montigalà?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, hay aparcamiento gratuito fácil junto al Centro Comercial Montigalà y un parking a 80 metros del restaurante.",
      },
    },
    {
      "@type": "Question",
      name: "¿Hacéis menús para grupos y eventos en Badalona?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, disponemos de salón privado para hasta 45 comensales y ofrecemos menús cerrados a medida para bodas, bautizos, comuniones, cumpleaños y comidas de empresa en Badalona y alrededores.",
      },
    },
  ],
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Carta", item: `${SITE_URL}/#carta` },
    { "@type": "ListItem", position: 3, name: "Menú del día", item: `${SITE_URL}/#menudia` },
    { "@type": "ListItem", position: 4, name: "Reservas", item: `${SITE_URL}/#reservas` },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${fraunces.variable} ${karla.variable} font-body`}>{children}</body>
    </html>
  )
}
