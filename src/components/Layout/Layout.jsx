import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from '../UI/ScrollToTop'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 w-full overflow-x-hidden">
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
      <ScrollToTop />
    </div>
  )
}

export default Layout