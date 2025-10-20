import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, Award, BookOpen, Clock, MapPin, Star, Zap, ChevronLeft, ChevronRight } from 'lucide-react'

const Education = ({ data = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % data.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  // REMOVED AUTO-ROTATE CAROUSEL

  const floatingElements = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 3
  }))

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-900 via-blue-900/50 to-gray-900 overflow-hidden">
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-2xl mx-auto mb-6"
          >
            <GraduationCap className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Education & Qualifications
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Academic journey that shaped my expertise and professional growth
          </p>
        </motion.div>

        {data.length > 0 ? (
          <div className="max-w-6xl mx-auto">
            {/* Desktop Timeline View */}
            {!isMobile && (
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500/20 to-cyan-500/20 rounded-full" />
                
                <div className="space-y-12">
                  {data.map((edu, index) => (
                    <motion.div
                      key={edu.id || index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      className={`flex items-center gap-8 ${
                        index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                      }`}
                    >
                      {/* Content Card */}
                      <div className="flex-1">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 shadow-2xl"
                        >
                          {/* Header */}
                          <div className="flex items-start justify-between mb-6">
                            <div className="flex-1">
                              <h3 className="text-2xl font-bold text-white mb-2">
                                {edu.degree}
                              </h3>
                              <div className="flex items-center gap-2 text-cyan-300 mb-3">
                                <BookOpen className="w-5 h-5" />
                                <span className="text-lg font-semibold">{edu.institution}</span>
                              </div>
                            </div>
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 360 }}
                              className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0"
                            >
                              <Award className="w-6 h-6 text-white" />
                            </motion.div>
                          </div>

                          {/* Info Grid */}
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                              <Clock className="w-5 h-5 text-blue-400" />
                              <div>
                                <p className="text-sm text-gray-400">Duration</p>
                                <p className="text-white font-medium">{edu.period}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                              <MapPin className="w-5 h-5 text-cyan-400" />
                              <div>
                                <p className="text-sm text-gray-400">Location</p>
                                <p className="text-white font-medium">{edu.location}</p>
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-gray-300 mb-6 leading-relaxed bg-gray-700/20 rounded-xl p-4 border border-gray-600/30">
                            {edu.description}
                          </p>

                          {/* Stats */}
                          <div className="flex gap-4">
                            {edu.gpa && (
                              <div className="flex-1 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl p-4 border border-blue-500/30">
                                <div className="flex items-center gap-2 mb-2">
                                  <Star className="w-5 h-5 text-yellow-400" />
                                  <span className="text-white font-semibold">GPA Score</span>
                                </div>
                                <div className="text-2xl font-bold text-white">{edu.gpa}</div>
                              </div>
                            )}
                            <div className="flex-1 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 rounded-xl p-4 border border-cyan-500/30">
                              <div className="flex items-center gap-2 mb-2">
                                <Zap className="w-5 h-5 text-cyan-400" />
                                <span className="text-white font-semibold">Status</span>
                              </div>
                              <div className="text-2xl font-bold text-white">Completed</div>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Timeline Dot */}
                      <div className="relative flex-shrink-0 w-6 h-6">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: index * 0.3 + 0.5 }}
                          className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-lg shadow-blue-500/25"
                        />
                      </div>

                      {/* Empty space for alignment */}
                      <div className="flex-1" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Mobile Slider View */}
            {isMobile && (
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 shadow-2xl"
                  >
                    {data[currentIndex] && (() => {
                      const edu = data[currentIndex]
                      return (
                        <div className="space-y-6">
                          {/* Header */}
                          <div className="text-center">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4"
                            >
                              <GraduationCap className="w-8 h-8 text-white" />
                            </motion.div>
                            <h3 className="text-xl font-bold text-white mb-2">
                              {edu.degree}
                            </h3>
                            <div className="flex items-center justify-center gap-2 text-cyan-300 mb-4">
                              <BookOpen className="w-5 h-5" />
                              <span className="font-semibold">{edu.institution}</span>
                            </div>
                          </div>

                          {/* Info Cards */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                              <Clock className="w-5 h-5 text-blue-400" />
                              <div>
                                <p className="text-sm text-gray-400">Duration</p>
                                <p className="text-white font-medium">{edu.period}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                              <MapPin className="w-5 h-5 text-cyan-400" />
                              <div>
                                <p className="text-sm text-gray-400">Location</p>
                                <p className="text-white font-medium">{edu.location}</p>
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-gray-300 leading-relaxed bg-gray-700/20 rounded-xl p-4 border border-gray-600/30">
                            {edu.description}
                          </p>

                          {/* Stats */}
                          <div className="grid grid-cols-2 gap-3">
                            {edu.gpa && (
                              <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl p-4 border border-blue-500/30">
                                <div className="flex items-center gap-2 mb-2">
                                  <Star className="w-4 h-4 text-yellow-400" />
                                  <span className="text-white font-semibold text-sm">GPA</span>
                                </div>
                                <div className="text-xl font-bold text-white">{edu.gpa}</div>
                              </div>
                            )}
                            <div className="bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 rounded-xl p-4 border border-cyan-500/30">
                              <div className="flex items-center gap-2 mb-2">
                                <Zap className="w-4 h-4 text-cyan-400" />
                                <span className="text-white font-semibold text-sm">Status</span>
                              </div>
                              <div className="text-xl font-bold text-white">Completed</div>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="pt-4">
                            <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                              <span>Academic Progress</span>
                              <span>100%</span>
                            </div>
                            <div className="w-full bg-gray-700/50 rounded-full h-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full"
                              />
                            </div>
                          </div>
                        </div>
                      )
                    })()}
                  </motion.div>
                </AnimatePresence>

                {/* Mobile Slider Controls */}
                <div className="flex items-center justify-between mt-8">
                  <motion.button
                    onClick={prevSlide}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-gray-700/50 backdrop-blur-lg rounded-full flex items-center justify-center border border-gray-600 hover:border-blue-500 transition-all duration-300"
                  >
                    <ChevronLeft className="w-6 h-6 text-blue-400" />
                  </motion.button>

                  {/* Dots Indicator */}
                  <div className="flex items-center gap-2">
                    {data.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => goToSlide(index)}
                        whileHover={{ scale: 1.3 }}
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
                    className="w-12 h-12 bg-gray-700/50 backdrop-blur-lg rounded-full flex items-center justify-center border border-gray-600 hover:border-cyan-500 transition-all duration-300"
                  >
                    <ChevronRight className="w-6 h-6 text-cyan-400" />
                  </motion.button>
                </div>

                {/* Mobile Counter */}
                <div className="text-center mt-4">
                  <p className="text-gray-400 text-sm">
                    {currentIndex + 1} of {data.length}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-12 h-12 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Academic Journey</h3>
            <p className="text-gray-400 text-lg max-w-md mx-auto">
              Continuous learning and professional development journey
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Education