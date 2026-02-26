import { useEffect, useRef } from 'react'

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let time = 0
    let mouseX = canvas.width / 2
    let mouseY = canvas.height / 2

    // Particle system
    const particles: Array<{
      x: number
      y: number
      baseX: number
      baseY: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    for (let i = 0; i < 80; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3
      })
    }

    const animate = () => {
      time += 0.008

      // Premium gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      bgGradient.addColorStop(0, '#fafbff')
      bgGradient.addColorStop(0.3, '#f0f4ff')
      bgGradient.addColorStop(0.7, '#e8f0fe')
      bgGradient.addColorStop(1, '#dce9ff')
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Animated mesh grid
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.08)'
      ctx.lineWidth = 1
      const gridSize = 60
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        for (let y = 0; y < canvas.height; y += 10) {
          const offset = Math.sin(y * 0.01 + time + x * 0.005) * 15
          if (y === 0) {
            ctx.moveTo(x + offset, y)
          } else {
            ctx.lineTo(x + offset, y)
          }
        }
        ctx.stroke()
      }

      // Floating gradient orbs with glow
      const orbs = [
        { x: 0.2, y: 0.3, size: 250, speed: 0.4, color: [59, 130, 246] },
        { x: 0.8, y: 0.6, size: 300, speed: 0.5, color: [99, 102, 241] },
        { x: 0.5, y: 0.8, size: 200, speed: 0.6, color: [139, 92, 246] },
        { x: 0.1, y: 0.7, size: 180, speed: 0.45, color: [147, 197, 253] }
      ]

      orbs.forEach((orb, i) => {
        const x = canvas.width * orb.x + Math.sin(time * orb.speed + i) * 100
        const y = canvas.height * orb.y + Math.cos(time * orb.speed + i) * 80
        const size = orb.size + Math.sin(time * 0.5 + i) * 30

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size)
        gradient.addColorStop(0, `rgba(${orb.color[0]}, ${orb.color[1]}, ${orb.color[2]}, 0.15)`)
        gradient.addColorStop(0.4, `rgba(${orb.color[0]}, ${orb.color[1]}, ${orb.color[2]}, 0.08)`)
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Flowing waves
      for (let i = 0; i < 4; i++) {
        ctx.beginPath()
        ctx.moveTo(0, canvas.height / 2)

        for (let x = 0; x < canvas.width; x += 3) {
          const y = canvas.height * (0.3 + i * 0.15) + 
                   Math.sin(x * 0.008 + time * 1.5 + i * 0.8) * 40 +
                   Math.cos(x * 0.012 + time + i) * 25
          ctx.lineTo(x, y)
        }

        const waveGradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
        waveGradient.addColorStop(0, `rgba(59, 130, 246, ${0.12 - i * 0.02})`)
        waveGradient.addColorStop(0.5, `rgba(99, 102, 241, ${0.15 - i * 0.02})`)
        waveGradient.addColorStop(1, `rgba(139, 92, 246, ${0.12 - i * 0.02})`)
        
        ctx.strokeStyle = waveGradient
        ctx.lineWidth = 2.5
        ctx.stroke()
      }

      // Interactive particles
      particles.forEach((particle, i) => {
        // Mouse interaction
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist < 150) {
          const force = (150 - dist) / 150
          particle.vx -= (dx / dist) * force * 0.2
          particle.vy -= (dy / dist) * force * 0.2
        }

        // Return to base position
        particle.vx += (particle.baseX - particle.x) * 0.01
        particle.vy += (particle.baseY - particle.y) * 0.01

        // Apply velocity with damping
        particle.vx *= 0.95
        particle.vy *= 0.95
        particle.x += particle.vx
        particle.y += particle.vy

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 4
        )
        gradient.addColorStop(0, `rgba(59, 130, 246, ${particle.opacity})`)
        gradient.addColorStop(0.5, `rgba(99, 102, 241, ${particle.opacity * 0.5})`)
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2)
        ctx.fill()

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x
          const dy = particles[j].y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - distance / 120)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      })

      // Shimmer effect
      const shimmerGradient = ctx.createLinearGradient(
        Math.sin(time) * canvas.width,
        0,
        Math.cos(time) * canvas.width,
        canvas.height
      )
      shimmerGradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
      shimmerGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.03)')
      shimmerGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = shimmerGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      requestAnimationFrame(animate)
    }

    animate()

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/40 pointer-events-none" />
    </div>
  )
}
