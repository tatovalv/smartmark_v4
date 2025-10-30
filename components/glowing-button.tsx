import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface GlowingButtonProps {
  children: ReactNode
  className?: string
  size?: "default" | "lg"
  onClick?: () => void
}

export default function GlowingButton({ children, className, size = "default", onClick }: GlowingButtonProps) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
      <Button
        onClick={onClick}
        className={cn(
          "relative bg-black border border-emerald-500 text-white",
          size === "lg" ? "text-lg py-6 px-8" : "text-base py-5 px-6",
          className,
        )}
      >
        {children}
      </Button>
    </div>
  )
}
