/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    const redirect = (source, destination) => ({ source, destination, statusCode: 301 })
    return [
      redirect("/services", "/servicios"),
      redirect("/services/:path*", "/servicios"),
      redirect("/contact", "/contacto"),
      redirect("/about", "/por-que-smartmark"),
      redirect("/casos", "/casos-de-uso"),
      redirect("/por-que", "/por-que-smartmark"),
      redirect("/en/servicios", "/en/services"),
      redirect("/en/casos", "/en/use-cases"),
      redirect("/en/como-trabajamos", "/en/how-we-work"),
      redirect("/en/por-que", "/en/why-smartmark"),
      redirect("/en/contacto", "/en/contact"),
      redirect("/en/about", "/en/why-smartmark"),
      redirect("/pt", "/"),
      redirect("/pt/:path*", "/"),
    ]
  },
}

export default nextConfig
