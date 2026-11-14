export type ClientLogo = {
  name: string
  logo: string
}

export function ClientLogos({ title, items }: { title: string; items: ClientLogo[] }) {
  if (!items.length) return null

  return (
    <section className="client-logos" aria-labelledby="clientes-title">
      <h2 id="clientes-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      <ul>
        {items.map((item) => (
          <li key={item.name}>
            <img src={item.logo} alt={item.name} loading="lazy" />
          </li>
        ))}
      </ul>
    </section>
  )
}
