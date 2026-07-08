import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CtaBannerProps {
  title: string
  description: string
  buttonText: string
  onClick: () => void
  variant?: "primary" | "inverse"
}

export default function CtaBanner({
  title,
  description,
  buttonText,
  onClick,
  variant = "primary",
}: CtaBannerProps) {
  return (
    <div className="cta-panel relative">
      <div className="relative z-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
          {title}
        </h2>
        <p className="text-zinc-300 mb-8 max-w-lg mx-auto text-base md:text-lg">{description}</p>
        <Button
          onClick={onClick}
          size="lg"
          className={
            variant === "inverse"
              ? "bg-white text-black hover:bg-zinc-100 text-base px-8 py-6 rounded-full font-semibold h-auto"
              : "btn-glow text-base px-8 py-6 rounded-full h-auto"
          }
        >
          {buttonText}
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
