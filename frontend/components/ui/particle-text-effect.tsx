"use client"

import { useEffect, useRef } from "react"

interface Vector2D {
  x: number
  y: number
}

class Particle {
  pos: Vector2D = { x: 0, y: 0 }
  vel: Vector2D = { x: 0, y: 0 }
  acc: Vector2D = { x: 0, y: 0 }
  target: Vector2D = { x: 0, y: 0 }

  closeEnoughTarget = 60
  maxSpeed = 3.5
  maxForce = 0.1
  particleSize = 5
  isKilled = false

  startColor = { r: 255, g: 255, b: 255 }
  targetColor = { r: 255, g: 255, b: 255 }
  colorWeight = 0
  colorBlendRate = 0.02

  constructor(x?: number, y?: number) {
    if (x !== undefined && y !== undefined) {
      this.pos = { x, y }
    }
  }

  move() {
    let proximityMult = 1
    const dx = this.pos.x - this.target.x
    const dy = this.pos.y - this.target.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < this.closeEnoughTarget) {
      proximityMult = distance / this.closeEnoughTarget
    }

    const speed = Math.sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y)
    if (distance < 1.5 && speed < 0.5) {
      this.pos.x = this.target.x
      this.pos.y = this.target.y
      this.vel.x = 0
      this.vel.y = 0
      this.acc.x = 0
      this.acc.y = 0
      return
    }

    const towardsTarget = {
      x: this.target.x - this.pos.x,
      y: this.target.y - this.pos.y,
    }

    const magnitude = Math.sqrt(towardsTarget.x * towardsTarget.x + towardsTarget.y * towardsTarget.y)
    if (magnitude > 0) {
      towardsTarget.x = (towardsTarget.x / magnitude) * this.maxSpeed * proximityMult
      towardsTarget.y = (towardsTarget.y / magnitude) * this.maxSpeed * proximityMult
    }

    const steer = {
      x: towardsTarget.x - this.vel.x,
      y: towardsTarget.y - this.vel.y,
    }

    const steerMagnitude = Math.sqrt(steer.x * steer.x + steer.y * steer.y)
    if (steerMagnitude > 0) {
      const limitedForce = Math.min(steerMagnitude, this.maxForce)
      steer.x = (steer.x / steerMagnitude) * limitedForce
      steer.y = (steer.y / steerMagnitude) * limitedForce
    }

    this.acc.x += steer.x
    this.acc.y += steer.y

    this.vel.x += this.acc.x
    this.vel.y += this.acc.y

    this.vel.x *= 0.88
    this.vel.y *= 0.88

    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
    this.acc.x = 0
    this.acc.y = 0
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.colorWeight < 1.0) {
      this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0)
    }

    const currentColor = {
      r: Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight),
      g: Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight),
      b: Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight),
    }

    ctx.fillStyle = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`
    ctx.beginPath()
    ctx.arc(this.pos.x, this.pos.y, this.particleSize / 2, 0, Math.PI * 2)
    ctx.fill()
  }

  kill(width: number, height: number) {
    if (!this.isKilled) {
      const angle = Math.random() * Math.PI * 2
      const mag = (width + height) / 2
      this.target.x = width / 2 + Math.cos(angle) * mag
      this.target.y = height / 2 + Math.sin(angle) * mag

      this.startColor = {
        r: this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight,
        g: this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight,
        b: this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight,
      }
      this.targetColor = { r: 0, g: 0, b: 0 }
      this.colorWeight = 0
      this.isKilled = true
    }
  }
}

interface ParticleLine {
  text: string
  color: { r: number; g: number; b: number }
}

interface ParticleTextEffectProps {
  lines: ParticleLine[]
  fontSize?: number
  lineGap?: number
  className?: string
}

export function ParticleTextEffect({
  lines,
  fontSize = 100,
  lineGap = 20,
  className = "",
}: ParticleTextEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })

  const pixelSteps = 4

  const renderLines = (canvas: HTMLCanvasElement) => {
    const dpr = window.devicePixelRatio || 1
    const scaledFontSize = fontSize * dpr
    const scaledLineGap = lineGap * dpr

    const offscreenCanvas = document.createElement("canvas")
    offscreenCanvas.width = canvas.width
    offscreenCanvas.height = canvas.height
    const offscreenCtx = offscreenCanvas.getContext("2d")!

    const fontStyle = `900 ${scaledFontSize}px Syne, Inter, sans-serif`
    offscreenCtx.font = fontStyle
    offscreenCtx.textAlign = "center"
    offscreenCtx.textBaseline = "middle"

    const totalContentHeight =
      lines.length * scaledFontSize + (lines.length - 1) * scaledLineGap
    let startY = canvas.height * 0.3 - totalContentHeight / 2 + scaledFontSize / 2

    const particles = particlesRef.current
    let particleIndex = 0

    lines.forEach((line) => {
      offscreenCtx.clearRect(0, 0, canvas.width, canvas.height)

      let currentFontSize = scaledFontSize
      offscreenCtx.font = `900 ${currentFontSize}px Syne, Inter, sans-serif`
      let metrics = offscreenCtx.measureText(line.text)
      const maxWidth = canvas.width * 0.9

      if (metrics.width > maxWidth) {
        currentFontSize = Math.floor(currentFontSize * (maxWidth / metrics.width))
        offscreenCtx.font = `900 ${currentFontSize}px Syne, Inter, sans-serif`
      }

      offscreenCtx.fillStyle = "white"
      offscreenCtx.fillText(line.text, canvas.width / 2, startY)

      const imageData = offscreenCtx.getImageData(0, 0, canvas.width, canvas.height)
      const pixels = imageData.data

      const lineCoords: { x: number; y: number }[] = []
      const step = Math.max(2, Math.floor((pixelSteps * dpr) / 2))

      for (let y = 0; y < canvas.height; y += step) {
        for (let x = 0; x < canvas.width; x += step) {
          const i = (y * canvas.width + x) * 4
          if (pixels[i + 3] > 128) {
            lineCoords.push({ x, y })
          }
        }
      }

      for (let i = lineCoords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[lineCoords[i], lineCoords[j]] = [lineCoords[j], lineCoords[i]]
      }

      lineCoords.forEach((coord) => {
        let particle: Particle

        if (particleIndex < particles.length) {
          particle = particles[particleIndex]
          particle.isKilled = false
          particleIndex++
        } else {
          // Spawn from center with a small random burst velocity
          const angle = Math.random() * Math.PI * 2
          const speed = Math.random() * 2 + 2
          const jitter = 30

          particle = new Particle(
            canvas.width / 2 + (Math.random() - 0.5) * jitter,
            canvas.height / 2 + (Math.random() - 0.5) * jitter
          )
          particle.vel.x = Math.cos(angle) * speed
          particle.vel.y = Math.sin(angle) * speed

          particle.maxSpeed = Math.random() * 1 + 3
          particle.maxForce = particle.maxSpeed * 0.08
          particle.particleSize = Math.random() * 2 + 2
          particle.colorBlendRate = Math.random() * 0.02 + 0.01
          particles.push(particle)
        }

        particle.targetColor = {
          r: Math.max(0, Math.min(255, line.color.r + (Math.random() - 0.5) * 40)),
          g: Math.max(0, Math.min(255, line.color.g + (Math.random() - 0.5) * 40)),
          b: Math.max(0, Math.min(255, line.color.b + (Math.random() - 0.5) * 40)),
        }

        particle.target.x = coord.x
        particle.target.y = coord.y
      })

      startY += scaledFontSize + scaledLineGap
    })

    for (let i = particleIndex; i < particles.length; i++) {
      particles[i].kill(canvas.width, canvas.height)
    }
  }

  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")!
    const particles = particlesRef.current
    const { x: mx, y: my } = mouseRef.current

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i]

      const dx = particle.pos.x - mx
      const dy = particle.pos.y - my
      const distSq = dx * dx + dy * dy
      const repelRadius = 80
      if (distSq < repelRadius * repelRadius && distSq > 0) {
        const dist = Math.sqrt(distSq)
        const force = ((repelRadius - dist) / repelRadius) * 2.5
        particle.vel.x += (dx / dist) * force
        particle.vel.y += (dy / dist) * force
      }

      particle.move()
      particle.draw(ctx)

      if (particle.isKilled) {
        const dist = Math.sqrt(
          Math.pow(particle.pos.x - particle.target.x, 2) +
            Math.pow(particle.pos.y - particle.target.y, 2)
        )
        if (dist < 5) {
          particles.splice(i, 1)
        }
      }
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      const newWidth = Math.floor(rect.width * dpr)
      const newHeight = Math.floor(rect.height * dpr)

      if (canvas.width !== newWidth || canvas.height !== newHeight) {
        canvas.width = newWidth
        canvas.height = newHeight
        renderLines(canvas)
      }
    }

    updateSize()
    animate()

    document.fonts.ready.then(() => {
      updateSize()
    })

    const resizeObserver = new ResizeObserver(() => {
      updateSize()
    })
    resizeObserver.observe(canvas)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      mouseRef.current.x = (e.clientX - rect.left) * dpr
      mouseRef.current.y = (e.clientY - rect.top) * dpr
    }

    const handleMouseLeave = () => {
      mouseRef.current.x = -9999
      mouseRef.current.y = -9999
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      resizeObserver.disconnect()
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [lines, fontSize, lineGap])

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full h-full cursor-crosshair ${className}`}
      style={{ pointerEvents: "auto" }}
    />
  )
}