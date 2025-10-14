import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, MapPin, Home, Mail, Phone, Clock, Calendar, Code, Heart, Sparkles, BookOpen, Target, Users, Zap } from 'lucide-react'

const About = ({ data }) => {
  const [currentFact, setCurrentFact] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const philosophyPoints = [
    { icon: Target, text: 'Develop intelligent, data driven solutions', color: 'from-red-500 to-pink-500' },
    { icon: BookOpen, text: 'Embrace continuous learning and innovation', color: 'from-blue-500 to-cyan-500' },
    { icon: Users, text: 'Build user friendly and accessible web experiences', color: 'from-green-500 to-emerald-500' },
    { icon: Zap, text: 'Combine performance with AI driven efficiency', color: 'from-yellow-500 to-amber-500' }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % philosophyPoints.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="about" className="min-h-screen py-16 sm:py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          {/* Left Column - Philosophy & Approach */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-center lg:text-left"
          >
            {/* Section Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg text-white px-4 py-2 rounded-full border border-white/20 mb-6"
            >
              <Code className="w-4 h-4" />
              <span className="text-sm font-medium">My Philosophy</span>
            </motion.div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Engineering With{' '}
              <motion.span
                initial={{ backgroundPosition: '0%' }}
                whileInView={{ backgroundPosition: '100%' }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto]"
              >
                Impact
              </motion.span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl sm:text-2xl text-gray-300 mb-8 leading-relaxed"
            >
              I believe in creating digital solutions that not only solve problems but also 
              inspire and empower users. Every line of code tells a story of innovation and dedication.
            </motion.p>

            {/* Rotating Philosophy Points */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mb-8"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFact}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${philosophyPoints[currentFact].color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                      {React.createElement(philosophyPoints[currentFact].icon, { className: "w-6 h-6 text-white" })}
                    </div>
                    <p className="text-white font-medium text-lg text-left">
                      {philosophyPoints[currentFact].text}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Core Values */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              {[
                { value: 'Excellence', desc: 'Strive for clean code and best practices' },
                { value: 'Innovation', desc: 'Bring fresh perspectives and ideas' },
                { value: 'Teamwork', desc: 'Work effectively in collaborative environments' },
                { value: 'Development', desc: 'Constantly expanding my skill set' }
              ].map((item, index) => (
                <motion.div
                  key={item.value}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="text-center">
                    <div className="text-lg font-bold text-white mb-1">{item.value}</div>
                    <div className="text-xs text-gray-300">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Personal Details & Contact */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="text-center lg:text-left"
          >
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/10 mb-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-purple-400" />
                Let's Connect
              </h3>

              <div className="space-y-4">
                {[
                  { icon: Mail, label: 'Email', value: data.email, color: 'from-purple-500 to-pink-500' },
                  { icon: Phone, label: 'Phone', value: data.phone, color: 'from-blue-500 to-cyan-500' },
                  { icon: MapPin, label: 'Location', value: data.presentAddress, color: 'from-green-500 to-emerald-500' },
                  { icon: Home, label: 'Hometown', value: data.hometown, color: 'from-orange-500 to-red-500' },
                  { icon: Clock, label: 'Availability', value: data.availability, color: 'from-indigo-500 to-purple-500' },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <h4 className="font-semibold text-gray-300 text-sm">{item.label}</h4>
                      <p className="text-white font-medium text-sm">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={data.resumeUrl}
                className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex items-center justify-center gap-3 relative z-10">
                  <Download className="w-5 h-5" />
                  <span>Download Resume</span>
                </div>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="group bg-white/10 backdrop-blur-lg text-white px-6 py-4 rounded-2xl font-semibold border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-3">
                  <Heart className="w-5 h-5" />
                  <span>Start Conversation</span>
                </div>
              </motion.a>
            </motion.div>

            {/* Quick Stats */}
            
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/50"
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">Continue Exploring</span>
            <div className="w-px h-8 bg-white/30"></div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default About