import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Code2 } from 'lucide-react'
import ThemeSwitcher from '../ThemeSwitcher' // Add this import

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'courses', 'research', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    setIsMobileMenuOpen(false)
    
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        const headerHeight = 70
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 100)
  }

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Education', id: 'education' },
    { name: 'Courses', id: 'courses' },
    { name: 'Research', id: 'research' },
    { name: 'Contact', id: 'contact' }
  ]

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 theme-bg-primary theme-border border-b shadow-lg w-full transition-colors duration-300"
      style={{
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      <nav className="w-full max-w-full px-4 py-3 mx-auto" aria-label="Main navigation">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection('home')}
            aria-label="Scroll to home section"
            title="Home"
            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-2 transition-colors duration-200 flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Code2 className="w-6 h-6 text-blue-400" />
            <span className="text-lg font-bold theme-text-primary whitespace-nowrap">Portfolio</span>
          </motion.button>

          {/* Desktop Navigation + Theme Switcher */}
          <div className="hidden lg:flex items-center space-x-2 flex-shrink-0">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.id)}
                aria-label={`Scroll to ${item.name} section`}
                title={item.name}
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm whitespace-nowrap flex-shrink-0 ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'theme-text-secondary hover:theme-text-primary hover:bg-white/10'
                }`}
              >
                {item.name}
              </motion.button>
            ))}
            
            {/* Theme Switcher - Added here */}
            <div className="ml-2">
              <ThemeSwitcher />
            </div>
          </div>

          {/* Mobile Menu Button + Theme Switcher */}
          <div className="flex items-center space-x-2 lg:hidden">
            {/* Theme Switcher for mobile */}
            <div className="mr-2">
              <ThemeSwitcher />
            </div>
            
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              title="Navigation Menu"
              className="p-2 theme-text-secondary hover:theme-text-primary transition-colors bg-white/10 rounded-lg border theme-border hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden theme-bg-secondary theme-border border mt-3 rounded-lg shadow-xl overflow-hidden w-full"
            >
              <div className="py-2 w-full">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scrollToSection(item.id)}
                    aria-label={`Scroll to ${item.name} section`}
                    title={item.name}
                    className={`block w-full text-left px-4 py-3 text-base font-medium transition-all duration-200 border-b theme-border last:border-b-0 whitespace-nowrap ${
                      activeSection === item.id
                        ? 'bg-blue-600 text-white'
                        : 'theme-text-secondary hover:theme-text-primary hover:bg-white/10'
                    }`}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

export default Header