import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

const WhatsAppFloat = () => {
  const phoneNumber = '+8801622997885' // Replace with your actual number
  const message = 'Hello! I came from your portfolio website and would like to connect with you.'
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, x: -50 }}
      animate={{ scale: 1, opacity: 1, x: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 1 
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 left-6 z-50" // Changed to left-6
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 group"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm font-medium hidden sm:block">
          WhatsApp
        </span>
        
        {/* Tooltip - Updated to appear on right side */}
      </a>
    </motion.div>
  )
}

export default WhatsAppFloat