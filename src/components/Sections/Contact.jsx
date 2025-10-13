import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Send, MessageCircle, Star, Sparkles } from 'lucide-react'

const Contact = ({ data }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [focusedField, setFocusedField] = useState(null)

  // Safe data access with fallbacks
  const contactData = data || {
    email: 'your.email@example.com',
    phone: '+1 (555) 123-4567',
    location: 'Your City, Country'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Contact form submission:', formData)
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000)
      
    } catch (error) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(null), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
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
            <MessageCircle className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's create something amazing together.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
        >
          {/* Contact Information */}
          <motion.div
            variants={itemVariants}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                Let's start a conversation! Whether you have a project in mind or just want to connect, 
                I'm always excited to hear from fellow creators and innovators.
              </p>
            </div>

            <div className="space-y-6">
              {/* Email */}
              <motion.div 
                className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/30 transition-all duration-300 group"
                whileHover={{ scale: 1.02, x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Mail className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h4 className="font-semibold text-white">Email</h4>
                  <motion.a 
                    href={`mailto:${contactData.email}`}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                    whileHover={{ x: 2 }}
                  >
                    {contactData.email}
                  </motion.a>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div 
                className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/30 transition-all duration-300 group"
                whileHover={{ scale: 1.02, x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25"
                  whileHover={{ scale: 1.1, rotate: -360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Phone className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h4 className="font-semibold text-white">Phone</h4>
                  <motion.a 
                    href={`tel:${contactData.phone}`}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                    whileHover={{ x: 2 }}
                  >
                    {contactData.phone}
                  </motion.a>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div 
                className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/30 transition-all duration-300 group"
                whileHover={{ scale: 1.02, x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <MapPin className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h4 className="font-semibold text-white">Location</h4>
                  <p className="text-gray-300">{contactData.location}</p>
                </div>
              </motion.div>
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 backdrop-blur-sm"
            >
              <div className="flex items-center space-x-2 text-blue-400 mb-2">
                <Star className="w-4 h-4" />
                <span className="font-semibold">Quick Response</span>
              </div>
              <p className="text-gray-300 text-sm">
                I typically respond within 24 hours. Let's discuss how we can turn your vision into reality!
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl blur-xl" />
            <div className="relative p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-white/10 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="relative">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name
                    </label>
                    <motion.input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
                      placeholder="John Doe"
                      whileFocus={{ scale: 1.02 }}
                    />
                    <AnimatePresence>
                      {focusedField === 'name' && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          exit={{ scaleX: 0 }}
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Email
                    </label>
                    <motion.input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
                      placeholder="john@example.com"
                      whileFocus={{ scale: 1.02 }}
                    />
                    <AnimatePresence>
                      {focusedField === 'email' && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          exit={{ scaleX: 0 }}
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Subject Field */}
                <div className="relative">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <motion.input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
                    placeholder="Project Collaboration"
                    whileFocus={{ scale: 1.02 }}
                  />
                  <AnimatePresence>
                    {focusedField === 'subject' && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Message Field */}
                <div className="relative">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows="6"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 resize-vertical"
                    placeholder="Tell me about your project or just say hello..."
                    whileFocus={{ scale: 1.02 }}
                  />
                  <AnimatePresence>
                    {focusedField === 'message' && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Status Messages */}
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 rounded-xl bg-green-500/10 border border-green-500/20"
                    >
                      <div className="flex items-center space-x-2 text-green-400">
                        <Sparkles className="w-4 h-4" />
                        <span className="font-medium">Message sent successfully!</span>
                      </div>
                      <p className="text-green-300 text-sm mt-1">
                        Thank you for reaching out! I'll get back to you soon.
                      </p>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 rounded-xl bg-red-500/10 border border-red-500/20"
                    >
                      <div className="flex items-center space-x-2 text-red-400">
                        <span className="font-medium">Failed to send message</span>
                      </div>
                      <p className="text-red-300 text-sm mt-1">
                        Please try again or contact me directly via email.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white py-4 px-6 rounded-xl hover:from-blue-600 hover:to-cyan-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-2xl shadow-blue-500/25"
                >
                  <motion.div
                    animate={isSubmitting ? { rotate: 360 } : {}}
                    transition={isSubmitting ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
                  >
                    <Send className="w-5 h-5" />
                  </motion.div>
                  <span className="font-semibold text-lg">
                    {isSubmitting ? 'Sending Message...' : 'Send Message'}
                  </span>
                  {!isSubmitting && (
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact