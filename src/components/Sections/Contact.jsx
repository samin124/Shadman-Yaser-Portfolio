import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Sparkles } from 'lucide-react'

const Contact = () => {
  const email = 'shadmanyaser890@gmail.com'
  
  const handleEmailClick = () => {
    // This will open Gmail compose window with your email in the To field
    window.open(`mailto:${email}?subject=Let's%20Work%20Together&body=Hello%20Shadman,%0A%0AI%20would%20like%20to%20discuss...`, '_blank')
  }

  const floatingStars = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2
  }))

  return (
    <section id="contact" className="relative py-20 bg-gradient-to-br from-gray-900 via-blue-900/50 to-gray-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
      
      {/* Floating Stars */}
      {floatingStars.map(star => (
        <motion.div
          key={star.id}
          className="absolute w-1 h-1 bg-blue-400 rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-2xl mx-auto mb-6"
          >
            <Mail className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's create something amazing together.
          </p>
        </motion.div>

        {/* Email Contact Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <motion.div
            onClick={handleEmailClick}
            className="group cursor-pointer max-w-md w-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-white/10 shadow-2xl hover:border-blue-500/30 transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-6">
                {/* Animated Mail Logo */}
                <motion.div
                  className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-blue-500/25 relative"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.5 }
                  }}
                  animate={{
                    y: [0, -8, 0],
                    transition: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <Mail className="w-12 h-12 text-white" />
                  
                  {/* Floating Sparkles around the icon */}
                  <motion.div
                    className="absolute -top-2 -right-2"
                    animate={{
                      rotate: 360,
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                  </motion.div>
                  
                  <motion.div
                    className="absolute -bottom-2 -left-2"
                    animate={{
                      rotate: -360,
                      scale: [1.2, 1, 1.2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                  </motion.div>
                </motion.div>

                {/* Text Content */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300"
                    animate={{
                      opacity: [0.8, 1, 0.8],
                      transition: { duration: 2, repeat: Infinity }
                    }}
                  >
                    Send me an email
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-300 text-lg leading-relaxed"
                    whileHover={{ scale: 1.02 }}
                  >
                    Click below to compose an email directly to me. I'd love to hear about your projects and ideas!
                  </motion.p>

                  {/* Email Address */}
                  <motion.div
                    className="flex items-center justify-center space-x-3 p-4 rounded-xl bg-white/5 border border-white/10 group-hover:border-cyan-400/30 transition-all duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      animate={{ 
                        x: [0, 5, 0],
                        transition: { duration: 2, repeat: Infinity }
                      }}
                    >
                      <Mail className="w-5 h-5 text-cyan-400" />
                    </motion.div>
                    <motion.p 
                      className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
                      whileHover={{ scale: 1.05 }}
                    >
                      {email}
                    </motion.p>
                  </motion.div>

                  {/* CTA Text */}
                  <motion.p 
                    className="text-cyan-400 font-medium flex items-center justify-center space-x-2"
                    animate={{ 
                      opacity: [0.6, 1, 0.6],
                      transition: { duration: 2, repeat: Infinity }
                    }}
                  >
                    <span>Click to compose email in Gmail</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.p>
                </div>
              </div>

              {/* Hover effect border */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-cyan-400/20 transition-all duration-500"
                whileHover={{
                  borderWidth: "2px",
                  transition: { duration: 0.3 }
                }}
              />

              {/* Pulsing glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-cyan-400/5"
                animate={{
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 text-lg">
            I typically respond within 24 hours. Let's discuss how we can turn your vision into reality!
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact