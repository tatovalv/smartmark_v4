"use client"

import { useEffect, useRef } from "react"

export default function AIBackground() {
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

    // Grid parameters
    const gridSize = 30
    const nodeRadius = 1
    const maxConnections = 3
    const maxDistance = 150
    const animationSpeed = 0.0005

    // Create grid nodes
    const nodes: { x: number; y: number; vx: number; vy: number }[] = []

    const createNodes = () => {
      nodes.length = 0
      const cols = Math.floor(canvas.width / gridSize) + 2
      const rows = Math.floor(canvas.height / gridSize) + 2

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          nodes.push({
            x: i * gridSize,
            y: j * gridSize,
            vx: Math.random() * 0.2 - 0.1,
            vy: Math.random() * 0.2 - 0.1,
          })
        }
      }
    }

    createNodes()
    window.addEventListener("resize", createNodes)

    // Animation loop
    let animationFrameId: number
    let lastTime = 0

    const animate = (time: number) => {
      const deltaTime = time - lastTime
      lastTime = time

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update node positions
      nodes.forEach((node) => {
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Keep within bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x))
        node.y = Math.max(0, Math.min(canvas.height, node.y))
      })

      // Draw connections
      ctx.strokeStyle = "rgba(16, 185, 129, 0.05)" // Emerald color with low opacity
      ctx.lineWidth = 0.5

      nodes.forEach((node, i) => {
        let connections = 0

        for (let j = i + 1; j < nodes.length && connections < maxConnections; j++) {
          const otherNode = nodes[j]
          const dx = otherNode.x - node.x
          const dy = otherNode.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            connections++

            // Calculate opacity based on distance
            const opacity = 1 - distance / maxDistance
            ctx.strokeStyle = `rgba(16, 185, 129, ${opacity * 0.1})`

            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(otherNode.x, otherNode.y)
            ctx.stroke()
          }
        }
      })

      // Draw nodes
      ctx.fillStyle = "rgba(16, 185, 129, 0.3)" // Emerald color with low opacity

      nodes.forEach((node) => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("resize", createNodes)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 bg-black"
      style={{ background: "radial-gradient(circle at center, rgba(16, 185, 129, 0.05) 0%, rgba(0, 0, 0, 1) 70%)" }}
    />
  )
}
