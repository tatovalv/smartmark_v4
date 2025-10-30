"use client"

import { useEffect, useRef } from "react"

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle parameters
    const particleCount = 50
    const particleSize = 2
    const particleMaxSpeed = 0.5

    // Create particles
    const particles: {
      x: number
      y: number
      size: number
      speed: number
      vx: number
      vy: number
      color: string
      opacity: number
      opacityDirection: number
    }[] = []

    const createParticles = () => {
      particles.length = 0

      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * particleSize + 1
        const speed = Math.random() * particleMaxSpeed + 0.1
        const angle = Math.random() * Math.PI * 2

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          speed,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: getRandomColor(),
          opacity: Math.random() * 0.5 + 0.1,
          opacityDirection: Math.random() > 0.5 ? 1 : -1,
        })
      }
    }

    function getRandomColor() {
      const colors = [
        "rgba(16, 185, 129, alpha)", // emerald
        "rgba(139, 92, 246, alpha)", // purple
        "rgba(59, 130, 246, alpha)", // blue
        "rgba(236, 72, 153, alpha)", // pink
      ]

      return colors[Math.floor(Math.random() * colors.length)]
    }

    createParticles()

    // Animation loop
    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Update opacity
        particle.opacity += 0.005 * particle.opacityDirection
        if (particle.opacity > 0.7 || particle.opacity < 0.1) {
          particle.opacityDirection *= -1
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace("alpha", particle.opacity.toString())
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-1 pointer-events-none" />
}
