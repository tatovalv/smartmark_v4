interface SectionHeaderProps {
  label: string
  title: string
  description?: string
  align?: "center" | "left"
}

export default function SectionHeader({
  label,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left"

  return (
    <div className={`max-w-2xl mb-12 md:mb-16 ${alignClass}`}>
      <p className={`section-label mb-4 ${align === "center" ? "justify-center" : ""}`}>
        {label}
      </p>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-zinc-400 text-base md:text-lg leading-relaxed">{description}</p>
      )}
    </div>
  )
}
