import React, { useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Github, Linkedin, Mail, Download, Sparkles, Rocket, Code, Cpu, Palette, Server } from 'lucide-react'

const Hero = ({ data }) => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const [currentText, setCurrentText] = React.useState(0)
  const [activeTech, setActiveTech] = React.useState(0)
  const [isHovered, setIsHovered] = React.useState(false)

  const roles = [
    "AI-Powered Code Craftsman",
    "Digital Solution Architect",
    "Intelligent Systems Builder",
    "Innovation Engineer",
    "Full Stack Visionary"
  ]

  const techStack = [
    { icon: <Code className="w-6 h-6" />, name: "MERN & Flask Stack", color: "from-blue-500 to-cyan-500" },
    { icon: <Server className="w-6 h-6" />, name: "Laravel & RESTful APIs", color: "from-green-500 to-emerald-500" },
    { icon: <Cpu className="w-6 h-6" />, name: "Machine & Deep Learning", color: "from-yellow-500 to-amber-500" },
    { icon: <Palette className="w-6 h-6" />, name: "Image Processing & AI Solutions", color: "from-purple-500 to-pink-500" }
  ];
  

  // Animated text rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % roles.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Tech stack rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTech((prev) => (prev + 1) % techStack.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  const initParticles = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio, 2)
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`
    ctx.scale(dpr, dpr)

    const particles = []
    const particleCount = window.innerWidth < 768 ? 50 : 80

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width / dpr
        this.y = Math.random() * canvas.height / dpr
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.8
        this.speedY = (Math.random() - 0.5) * 0.8
        this.color = `hsl(${Math.random() * 60 + 200}, 80%, 60%)`
        this.alpha = Math.random() * 0.4 + 0.1
        this.waveOffset = Math.random() * Math.PI * 2
      }

      update() {
        // Wave-like movement
        this.waveOffset += 0.05
        this.x += this.speedX + Math.sin(this.waveOffset) * 0.3
        this.y += this.speedY + Math.cos(this.waveOffset) * 0.3

        // Bounce off edges
        if (this.x > canvas.width / dpr || this.x < 0) this.speedX *= -1
        if (this.y > canvas.height / dpr || this.y < 0) this.speedY *= -1
      }

      draw() {
        ctx.save()
        ctx.globalAlpha = this.alpha
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - distance / 120)})`
            ctx.lineWidth = 0.3
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)
      
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      connectParticles()

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }

    window.addEventListener('resize', handleResize, { passive: true })
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const cleanup = initParticles()
    return cleanup
  }, [initParticles])

  const scrollToAbout = () => {
    const element = document.getElementById('about')
    if (element) {
      const headerHeight = 70
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const socialLinks = [
    { icon: Github, href: data.github, label: "GitHub", color: "hover:text-purple-400" },
    { icon: Linkedin, href: data.linkedin, label: "LinkedIn", color: "hover:text-blue-400" },
    { icon: Mail, href: `mailto:${data.email}`, label: "Email", color: "hover:text-red-400" }
  ]

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 safe-area-inset pt-20">
      {/* Enhanced Particle Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10 safe-area-inset">
        <motion.div
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Animated Profile Image - Mobile Optimized */}
          <motion.div
            className="relative mx-auto mb-6 sm:mb-8 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            {/* Outer Glow */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity
              }}
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-30"
            />
            
            {/* Main Image Container */}
            <div className="absolute inset-1 sm:inset-2 bg-slate-900 rounded-full" />
            <motion.img
              src={data.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"}
              alt={`Profile picture of ${data.name}`}
              className="absolute inset-1 sm:inset-2 w-[calc(100%-8px)] h-[calc(100%-8px)] sm:w-[calc(100%-16px)] sm:h-[calc(100%-16px)] rounded-full object-cover border-2 border-white/20"
              loading="eager"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />

            {/* Floating Tech Icons - Hidden on mobile, visible on larger screens */}
            <motion.div
              className="hidden sm:flex absolute -top-2 -right-2 w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl items-center justify-center shadow-2xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Code className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </motion.div>

            <motion.div
              className="hidden sm:flex absolute -bottom-2 -left-2 w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl items-center justify-center shadow-2xl"
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <Cpu className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            </motion.div>

            {/* Hover Sparkles - Only on desktop */}
            <AnimatePresence>
              {isHovered && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="hidden sm:block absolute w-1.5 h-1.5 lg:w-2 lg:h-2 bg-yellow-400 rounded-full"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Welcome Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-3 sm:mb-4"
          >
            <span className="text-base sm:text-lg lg:text-xl text-purple-300 font-light">
              Welcome! I'm
            </span>
          </motion.div>

          {/* Name with Staggered Letters */}
          <div className="mb-4 sm:mb-6">
            {data.name.split('').map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 + 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent inline-block mx-0.5"
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </div>

          {/* Animated Role Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6 sm:mb-8 h-10 sm:h-12 lg:h-16"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentText}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center gap-2 sm:gap-3"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-yellow-400" />
                <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {roles[currentText]}
                </span>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-yellow-400" />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed font-light px-2"
          >
            {data.description}
          </motion.p>

          {/* Tech Stack Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-6 sm:mb-8"
          >
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 flex-wrap">
              <span className="text-purple-300 text-sm sm:text-base lg:text-lg">Specialized in:</span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                  className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r ${techStack[activeTech].color} rounded-xl sm:rounded-2xl text-white font-semibold shadow-lg text-sm sm:text-base`}
                >
                  {techStack[activeTech].icon}
                  <span>{techStack[activeTech].name}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8"
          >
            <motion.a
              href={data.resumeUrl}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl font-semibold shadow-xl sm:shadow-2xl hover:shadow-2xl sm:hover:shadow-3xl transition-all duration-300 overflow-hidden text-sm sm:text-base"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-center justify-center gap-2 sm:gap-3 relative z-10">
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Download Resume</span>
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToAbout}
              className="group bg-white/10 backdrop-blur-lg text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl font-semibold border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 text-sm sm:text-base"
            >
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <span>Explore My Work</span>
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-y-1 transition-transform duration-300" />
              </div>
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex justify-center space-x-3 sm:space-x-4 mb-8 sm:mb-12"
          >
            {socialLinks.map(({ icon: Icon, href, label, color }, index) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className={`p-3 sm:p-4 bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/10 text-white/70 ${color} hover:bg-white/10 transition-all duration-300`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1 }}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.button
            onClick={scrollToAbout}
            aria-label="Scroll to about section"
            title="Scroll Down"
            className="mx-auto flex flex-col items-center gap-2 sm:gap-3 text-white/60 hover:text-white transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            whileHover={{ y: 2 }}
          >
            <span className="text-xs sm:text-sm font-light tracking-wider">DISCOVER MORE</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-2 sm:p-3 bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/10 hover:bg-white/10 transition-colors duration-300"
            >
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero