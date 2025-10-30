import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://smartmarkconsultores.com"

  // Rutas en español
  const esRoutes = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]

  // Rutas en inglés
  const enRoutes = esRoutes.map((route) => ({
    ...route,
    url: route.url.replace(baseUrl, `${baseUrl}/en`),
    priority: route.priority - 0.1,
  }))

  // Rutas en portugués
  const ptRoutes = esRoutes.map((route) => ({
    ...route,
    url: route.url.replace(baseUrl, `${baseUrl}/pt`),
    priority: route.priority - 0.2,
  }))

  return [...esRoutes, ...enRoutes, ...ptRoutes]
}
