import React, { useState, useCallback, memo, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, ChevronLeft, ChevronRight, Sparkles, ExternalLink } from 'lucide-react'

const CompetitionCard = memo(({ competition, index, isActive, isMobile }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    whileHover={{ 
      y: isMobile ? 0 : -5,
      transition: { type: "spring", stiffness: 300 }
    }}
    transition={{ 
      duration: 0.6, 
      delay: index * 0.1,
      type: "spring"
    }}
    viewport={{ once: true, margin: "-50px" }}
    className={`group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden backdrop-blur-lg ${
      isActive ? 'ring-2 ring-blue-500/50' : ''
    } ${isMobile ? 'min-h-0' : ''}`}
  >
    {/* Animated Background Glow */}
    <motion.div 
      className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      animate={{
        background: [
          'linear-gradient(45deg, rgba(59, 130, 246, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
          'linear-gradient(45deg, rgba(6, 182, 212, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
        ]
      }}
      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
    />
    
    {/* Shimmer Effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
    
    <div className={`relative ${isMobile ? 'p-6' : 'p-8'}`}>
      {/* Header with Competition Image and Title */}
      <div className="flex items-start gap-4 mb-4">
        {/* Competition Image - Small size */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.2 + 0.2, type: "spring" }}
          className="flex-shrink-0"
        >
          <img
            src={competition.image}
            alt={competition.title}
            className={`rounded-xl object-cover border-2 border-cyan-500/30 shadow-lg ${
              isMobile ? 'w-16 h-16' : 'w-20 h-20'
            }`}
          />
        </motion.div>

        {/* Text Content - Full width on mobile */}
        <div className="flex-1 min-w-0">
          <motion.h3 
            className={`font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300 break-words ${
              isMobile ? 'text-xl' : 'text-2xl'
            }`}
            whileHover={{ x: 2 }}
          >
            {competition.title}
          </motion.h3>
          <div className="text-cyan-300">
            <span className="font-semibold text-sm">{competition.organizer}</span>
          </div>
        </div>
      </div>

      {/* Position Badge - Below image on mobile */}
      {competition.position && (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
          className={`mb-4 ${isMobile ? 'ml-20' : ''}`} // Add margin on mobile to align with text
        >
          <div className={`rounded-xl flex items-center justify-center shadow-2xl font-bold ${
            competition.position.includes('1') ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-900' :
            competition.position.includes('2') ? 'bg-gradient-to-br from-gray-400 to-gray-600 text-gray-900' :
            competition.position.includes('3') ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-orange-900' :
            competition.position.includes('Final') ? 'bg-gradient-to-br from-purple-400 to-purple-600 text-purple-900' :
            'bg-gradient-to-br from-blue-400 to-blue-600 text-blue-900'
          } ${isMobile ? 'px-3 py-2 text-sm w-fit' : 'px-4 py-3 text-base'}`}>
            {competition.position}
          </div>
        </motion.div>
      )}
      
      {/* Description */}
      <motion.p 
        className={`text-gray-300 mb-6 leading-relaxed border-l-4 border-cyan-500/50 pl-4 ${
          isMobile ? 'text-base' : 'text-lg'
        }`}
        whileHover={{ x: 5 }}
      >
        {competition.description}
      </motion.p>
      
      {/* Certificate Link */}
      {competition.certificateUrl && (
        <motion.a
          href={competition.certificateUrl}
          className={`flex items-center justify-center gap-3 w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-2xl hover:shadow-3xl group/btn border border-blue-500/30 ${
            isMobile ? 'py-4 text-base' : 'py-5 text-lg'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Trophy className="w-5 h-5 flex-shrink-0" />
          <span className="font-bold">View Certificate</span>
          <ExternalLink className="w-5 h-5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 flex-shrink-0" />
        </motion.a>
      )}
    </div>
  </motion.div>
))

const Competitions = ({ data = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const autoSlideRef = useRef(null)

  // Check mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % data.length)
  }, [data.length])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length)
  }, [data.length])

  const goToSlide = (index) => {
    // Reset auto-slide timer when manually navigating
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current)
    }
    
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
    
    // Restart auto-slide after manual navigation
    if (isMobile && data.length > 1) {
      autoSlideRef.current = setInterval(nextSlide, 6000)
    }
  }

  // Auto-rotate on mobile - with proper cleanup
  useEffect(() => {
    if (isMobile && data.length > 1) {
      autoSlideRef.current = setInterval(nextSlide, 6000) // 6 seconds
      
      return () => {
        if (autoSlideRef.current) {
          clearInterval(autoSlideRef.current)
        }
      }
    }
  }, [isMobile, data.length, nextSlide])

  const floatingElements = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 4,
    duration: 5 + Math.random() * 4
  }))

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    })
  }

  return (
    <section className="relative py-16 bg-gradient-to-br from-gray-900 via-blue-900/50 to-gray-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        
        {/* Floating Elements */}
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-2xl mx-auto mb-4"
          >
            <Trophy className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3">
            Competition Achievements
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Showcasing excellence in hackathons and coding competitions
          </p>
        </motion.div>

        {data.length > 0 ? (
          <div className="max-w-6xl mx-auto">
            {/* Desktop Grid View */}
            <div className="hidden lg:grid grid-cols-1 xl:grid-cols-2 gap-6">
              {data.map((competition, index) => (
                <CompetitionCard
                  key={competition.id || index}
                  competition={competition}
                  index={index}
                  isActive={index === currentIndex}
                  isMobile={false}
                />
              ))}
            </div>

            {/* Mobile Carousel View */}
            <div className="lg:hidden">
              <div className="relative">
                <div className="max-h-[75vh] overflow-hidden">
                  <AnimatePresence custom={direction} mode="wait">
                    <motion.div
                      key={currentIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.3 }
                      }}
                    >
                      <CompetitionCard
                        competition={data[currentIndex]}
                        index={currentIndex}
                        isActive={true}
                        isMobile={true}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Mobile Controls */}
                <div className="flex items-center justify-between mt-6">
                  <motion.button
                    onClick={prevSlide}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-gray-800/50 backdrop-blur-lg rounded-full flex items-center justify-center border border-gray-700 hover:border-blue-500 transition-all duration-300 shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5 text-blue-400" />
                  </motion.button>

                  {/* Dots Indicator */}
                  <div className="flex items-center gap-2">
                    {data.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => goToSlide(index)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentIndex
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-400 scale-125'
                            : 'bg-gray-600 hover:bg-gray-500'
                        }`}
                      />
                    ))}
                  </div>

                  <motion.button
                    onClick={nextSlide}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-gray-800/50 backdrop-blur-lg rounded-full flex items-center justify-center border border-gray-700 hover:border-cyan-500 transition-all duration-300 shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5 text-cyan-400" />
                  </motion.button>
                </div>

                {/* Mobile Counter */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center mt-4"
                >
                  <div className="inline-flex items-center gap-2 bg-gray-800/50 backdrop-blur-lg px-3 py-1 rounded-full border border-gray-700">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span className="text-gray-300 text-sm font-medium">
                      {currentIndex + 1} of {data.length}
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-10 h-10 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Competition Journey</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Preparing competition achievements. Exciting updates coming soon!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default memo(Competitions)