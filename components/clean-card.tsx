import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface CleanCardProps {
  children: ReactNode
  className?: string
  color?: "emerald" | "purple" | "pink" | "blue" | "yellow" | "red"
}

export default function CleanCard({ children, className, color = "emerald" }: CleanCardProps) {
  const getColorClasses = () => {
    switch (color) {
      case "purple":
        return "border-purple-500/20 hover:border-purple-500/40"
      case "pink":
        return "border-pink-500/20 hover:border-pink-500/40"
      case "blue":
        return "border-blue-500/20 hover:border-blue-500/40"
      case "yellow":
        return "border-yellow-500/20 hover:border-yellow-500/40"
      case "red":
        return "border-red-500/20 hover:border-red-500/40"
      default:
        return "border-emerald-500/20 hover:border-emerald-500/40"
    }
  }

  return (
    <div className={cn("bg-zinc-900 rounded-xl border p-6 transition-all duration-300", getColorClasses(), className)}>
      {children}
    </div>
  )
}
