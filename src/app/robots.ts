import type { MetadataRoute } from "next"

const SITE_URL = process.env.NEXTAUTH_URL ?? "https://www.elrebostdemontigala.com"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/imprimir/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
