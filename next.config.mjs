/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/services", destination: "/#servicios", permanent: true },
      { source: "/services/:path*", destination: "/#servicios", permanent: true },
      { source: "/servicios", destination: "/#servicios", permanent: true },
      { source: "/about", destination: "/#por-que", permanent: true },
      { source: "/contact", destination: "/#contacto", permanent: true },
      { source: "/en/services", destination: "/en#servicios", permanent: true },
      { source: "/en/services/:path*", destination: "/en#servicios", permanent: true },
      { source: "/en/about", destination: "/en#por-que", permanent: true },
      { source: "/en/contact", destination: "/en#contacto", permanent: true },
      { source: "/pt", destination: "/", permanent: true },
      { source: "/pt/:path*", destination: "/", permanent: true },
    ]
  },
}

export default nextConfig
