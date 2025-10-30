"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Bot, Brain, Zap, Database } from "lucide-react"

interface AIFeatureCardProps {
  title: string
  description: string
  icon: "bot" | "brain" | "zap" | "database"
  gradient: string
  link: string
  features: string[]
  buttonText: string
  onNavigate: (path: string) => void
}

export default function AIFeatureCard({
  title,
  description,
  icon,
  gradient,
  link,
  features,
  buttonText,
  onNavigate,
}: AIFeatureCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "bot":
        return <Bot className="w-10 h-10 text-white" />
      case "brain":
        return <Brain className="w-10 h-10 text-white" />
      case "zap":
        return <Zap className="w-10 h-10 text-white" />
      case "database":
        return <Database className="w-10 h-10 text-white" />
    }
  }

  return (
    <div className="group relative">
      {/* Animated glow effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
      ></div>

      <div className="relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 p-8 rounded-2xl h-full transition-all duration-300 group-hover:border-emerald-500/50 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-b from-transparent to-black opacity-20 rounded-full blur-2xl -mr-20 -mt-20"></div>

        {/* Icon */}
        <div className={`inline-flex items-center justify-center p-4 rounded-xl bg-gradient-to-r ${gradient} mb-6`}>
          {getIcon()}
        </div>

        <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-gray-400 mb-6">{description}</p>

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="mt-1 text-emerald-400">
                <ArrowRight size={16} />
              </div>
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>

        <button onClick={() => onNavigate(link)}>
          <Button className={`bg-gradient-to-r ${gradient} hover:opacity-90 transition-opacity`}>
            {buttonText} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </button>
      </div>
    </div>
  )
}
