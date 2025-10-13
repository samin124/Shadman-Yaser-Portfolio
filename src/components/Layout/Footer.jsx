import React from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gray-400">
            © {new Date().getFullYear()} My Portfolio Shadman Yaser. All rights reserved.All the given informations are true and validate.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer