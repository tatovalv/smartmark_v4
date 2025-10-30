"use client"

import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
  color: "purple" | "pink" | "blue" | "emerald"
  link?: string
  expanded?: boolean
  buttonText: string
  onNavigate: (path: string) => void
}

export default function ServiceCard({
  icon,
  title,
  description,
  color,
  link,
  expanded = false,
  buttonText,
  onNavigate,
}: ServiceCardProps) {
  const getColorClasses = () => {
    switch (color) {
      case "purple":
        return {
          border: "border-purple-500/20",
          text: "text-purple-400",
          hover: "hover:bg-purple-600",
          button: "bg-purple-500 hover:bg-purple-600",
        }
      case "pink":
        return {
          border: "border-pink-500/20",
          text: "text-pink-400",
          hover: "hover:bg-pink-600",
          button: "bg-pink-500 hover:bg-pink-600",
        }
      case "blue":
        return {
          border: "border-blue-500/20",
          text: "text-blue-400",
          hover: "hover:bg-blue-600",
          button: "bg-blue-500 hover:bg-blue-600",
        }
      default:
        return {
          border: "border-emerald-500/20",
          text: "text-emerald-400",
          hover: "hover:bg-emerald-600",
          button: "bg-emerald-500 hover:bg-emerald-600",
        }
    }
  }

  const colors = getColorClasses()

  return (
    <div className={`p-6 rounded-xl border ${colors.border} bg-black h-full flex flex-col relative overflow-hidden`}>
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 mb-6 flex-grow">{description}</p>
      {expanded ? (
        <button onClick={() => onNavigate(link || "#")}>
          <Button className={colors.button}>
            {buttonText} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </button>
      ) : (
        <button onClick={() => onNavigate(link || "#")}>
          <Button variant="ghost" className={`${colors.text} hover:${colors.bg} p-0 flex items-center gap-2`}>
            {buttonText} <ArrowRight className="h-4 w-4" />
          </Button>
        </button>
      )}
    </div>
  )
}
