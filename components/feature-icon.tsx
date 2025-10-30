import type { ReactNode } from "react"

interface FeatureIconProps {
  icon: ReactNode
  color: "green" | "purple" | "blue" | "pink"
  size?: "sm" | "md" | "lg"
}

export default function FeatureIcon({ icon, color, size = "md" }: FeatureIconProps) {
  const getColorClasses = () => {
    switch (color) {
      case "green":
        return "bg-emerald-500"
      case "purple":
        return "bg-purple-500"
      case "blue":
        return "bg-blue-500"
      case "pink":
        return "bg-pink-500"
      default:
        return "bg-emerald-500"
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-10 h-10 p-2"
      case "lg":
        return "w-20 h-20 p-4"
      default:
        return "w-16 h-16 p-3"
    }
  }

  return (
    <div className={`${getColorClasses()} ${getSizeClasses()} rounded-xl flex items-center justify-center`}>
      <div className="text-white">{icon}</div>
    </div>
  )
}
