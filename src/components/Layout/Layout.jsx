import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from '../UI/ScrollToTop'
import WhatsAppFloat from '../UI/WhatsAppFloat'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen theme-bg-primary w-full overflow-x-hidden transition-colors duration-300">
      <Header />
      <main className="relative w-full">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppFloat /> {/* Left side */}
      <ScrollToTop />   {/* Right side */}
    </div>
  )
}

export default Layout