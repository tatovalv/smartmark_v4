import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-emerald-500/10 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="block">Transform Your Business</span>
              <span className="block text-emerald-400">With AI & Marketing</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl">
              SmartMark Consultores combines strategic marketing expertise with cutting-edge AI automation to help your
              business thrive in the digital age.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-lg py-6 px-8">
                Explore AI Solutions <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="border-emerald-500/50 text-white hover:bg-emerald-500/10 text-lg py-6 px-8"
              >
                Marketing Services
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0">
            <div className="relative h-64 md:h-96 w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-purple-500/20 rounded-2xl transform rotate-3 scale-105" />
              <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm rounded-2xl border border-emerald-500/20 overflow-hidden">
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
                <div className="absolute -left-20 -top-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
                <div className="relative h-full w-full p-8 flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="SmartMark Consultores"
                    width={300}
                    height={100}
                    className="w-auto h-auto max-h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
