import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, Database, Palette, Cloud, Server, Smartphone, Zap, Rocket, Cpu, Globe, CheckCircle, Sparkles, Target, Layers, Shield, Clock, Zap as Lightning } from 'lucide-react'

const Skills = ({ data = [] }) => {
  const [selectedSkill, setSelectedSkill] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [hoveredSkill, setHoveredSkill] = useState(null)
  
  const categories = ['all', ...new Set(data.map(skill => skill.category))]
  
  // Icon mapping for categories
  const categoryIcons = {
    'Frontend': <Palette className="w-5 h-5" />,
    'Backend': <Server className="w-5 h-5" />,
    'Languages': <Code className="w-5 h-5" />,
    'Database': <Database className="w-5 h-5" />,
    'Cloud': <Cloud className="w-5 h-5" />,
    'Mobile': <Smartphone className="w-5 h-5" />,
    'Tools': <Cpu className="w-5 h-5" />,
    'DevOps': <Rocket className="w-5 h-5" />,
    'Other': <Zap className="w-5 h-5" />
  }

  const filteredSkills = activeCategory === 'all' 
    ? data 
    : data.filter(skill => skill.category === activeCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const featureVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4
      }
    })
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl mx-auto mb-6"
          >
            <Code className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-br from-gray-800 to-indigo-600 bg-clip-text text-transparent mb-4">
            Technical Expertise
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Mastered technologies and frameworks that power modern digital solutions
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition-all duration-300 border-2 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-transparent shadow-xl'
                  : 'bg-white/80 text-gray-700 border-gray-200/80 hover:border-indigo-300 shadow-lg hover:shadow-xl backdrop-blur-sm'
              }`}
            >
              {category !== 'all' && (
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {categoryIcons[category]}
                </motion.div>
              )}
              <span className="text-sm font-semibold">
                {category === 'all' ? 'All Technologies' : category}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid with AnimatePresence for smooth transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory} // This ensures re-animation when category changes
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                layout // Add layout animation for smooth transitions
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl border border-gray-100/80 transition-all duration-500 cursor-pointer overflow-hidden"
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                onClick={() => setSelectedSkill(skill)}
              >
                {/* Static Background Gradient - Removed animation that caused conflicts */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Skill Header */}
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <motion.div 
                    className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-indigo-200/50"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="text-2xl">{skill.icon}</span>
                  </motion.div>
                  
                  {/* Experience Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.2 }}
                    className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full border border-indigo-200/50"
                  >
                    <Clock className="w-3 h-3 text-indigo-600" />
                    <span className="text-xs font-bold text-indigo-700">{skill.experience}</span>
                  </motion.div>
                </div>

                {/* Skill Name & Category */}
                <div className="mb-4 relative z-10">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-700 transition-colors">
                    {skill.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="text-indigo-600">
                      {categoryIcons[skill.category]}
                    </div>
                    <span className="text-sm text-gray-500 font-medium">{skill.category}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2 relative z-10">
                  {skill.features.slice(0, hoveredSkill === skill.name ? skill.features.length : 3).map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      custom={featureIndex}
                      variants={featureVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex items-center gap-3 p-2 rounded-xl bg-white border border-gray-100 group/feature hover:bg-gray-50 hover:shadow-md transition-all duration-300"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0"
                      >
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium text-gray-700 break-words">{feature}</span>
                      </div>
                    </motion.div>
                  ))}

                  {/* Show More Indicator */}
                  {skill.features.length > 3 && hoveredSkill !== skill.name && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center pt-2"
                    >
                      <span className="text-xs text-indigo-600 font-medium">
                        +{skill.features.length - 3} more features
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-200 rounded-2xl transition-all duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredSkills.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Code className="w-12 h-12 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">No Technologies Found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              No technologies match the selected category. Try exploring other categories.
            </p>
          </motion.div>
        )}

        {/* Skill Detail Modal - Fixed z-index and backdrop issues */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedSkill(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 relative z-60" // Increased z-index
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  {/* Modal Header */}
                  <div className="flex items-start gap-6 mb-8">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
                    >
                      <span className="text-3xl">{selectedSkill.icon}</span>
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold text-gray-800 mb-2">{selectedSkill.name}</h3>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center gap-2 px-3 py-1 bg-indigo-100 rounded-full">
                          {categoryIcons[selectedSkill.category]}
                          <span className="text-sm font-semibold text-indigo-700">{selectedSkill.category}</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                          <Clock className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-semibold text-green-700">{selectedSkill.experience}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{selectedSkill.description}</p>
                    </div>
                  </div>

                  {/* Features Grid */}
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-indigo-600" />
                      Key Features & Capabilities
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedSkill.features.map((feature, index) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 hover:shadow-md transition-all duration-300"
                        >
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <span className="font-medium text-gray-700">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                 

                  {/* Close Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedSkill(null)}
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Close Details</span>
                    <CheckCircle className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Footer */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { 
              icon: <Code className="w-6 h-6" />, 
              value: `${data.length}+`, 
              label: 'Technologies', 
              bgColor: 'bg-indigo-100',
              textColor: 'text-indigo-600'
            },
            { 
              icon: <Zap className="w-6 h-6" />, 
              value: `${Math.max(...data.map(s => s.features?.length || 0))}+`, 
              label: 'Features Each', 
              bgColor: 'bg-green-100',
              textColor: 'text-green-600'
            },
            { 
              icon: <Layers className="w-6 h-6" />, 
              value: categories.length - 1, 
              label: 'Categories', 
              bgColor: 'bg-blue-100',
              textColor: 'text-blue-600'
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100/80 hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-12 h-12 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <div className={stat.textColor}>
                  {stat.icon}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills