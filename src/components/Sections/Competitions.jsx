import React, { useState, useCallback, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Calendar, Award, ChevronLeft, ChevronRight, ChevronDown, Sparkles, Users, Clock } from 'lucide-react'

const CompetitionCard = memo(({ competition, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    whileHover={{ 
      y: -8, 
      scale: 1.02,
      transition: { type: "spring", stiffness: 300 }
    }}
    transition={{ 
      duration: 0.6, 
      delay: index * 0.1,
      type: "spring",
      stiffness: 100
    }}
    viewport={{ once: true, margin: "-50px" }}
    className="group relative bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-800 dark:to-gray-700/80 rounded-2xl shadow-xl hover:shadow-2xl border border-gray-100/50 dark:border-gray-600/50 overflow-hidden backdrop-blur-sm"
  >
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    {/* Shine Effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
    
    <div className="relative">
      {/* Competition Image with Overlay */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={competition.image || "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop"}
          alt={competition.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        {/* Position Badge */}
        {competition.position && (
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm ${
              competition.position.includes('1') ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900' :
              competition.position.includes('2') ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-gray-900' :
              competition.position.includes('3') ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-orange-900' :
              'bg-gradient-to-r from-blue-400 to-blue-500 text-blue-900'
            }`}
          >
            {competition.position}
          </motion.div>
        )}
      </div>
      
      <div className="relative p-6">
        {/* Header with Icon */}
        <div className="flex items-center justify-between mb-4">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
          >
            <Trophy className="w-6 h-6 text-white" />
          </motion.div>
          
          {competition.teamSize && (
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              <Users className="w-3 h-3 mr-1" />
              {competition.teamSize}
            </div>
          )}
        </div>
        
        {/* Title */}
        <motion.h3 
          className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300"
          whileHover={{ x: 2 }}
        >
          {competition.title}
        </motion.h3>
        
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed line-clamp-3">
          {competition.description}
        </p>
        
        {/* Metadata */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>{competition.date}</span>
            </div>
            {competition.duration && (
              <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                <Clock className="w-3 h-3" />
                <span className="text-xs">{competition.duration}</span>
              </div>
            )}
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400 text-right font-medium">
            by {competition.organizer}
          </div>
        </div>
        
        {/* Certificate Link */}
        {competition.certificateUrl && (
          <motion.a
            href={competition.certificateUrl}
            className="flex items-center justify-center gap-2 w-full py-2 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-lg hover:from-primary-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl group/btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Award className="w-4 h-4" />
            <span className="font-semibold">View Certificate</span>
            <Sparkles className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
          </motion.a>
        )}
      </div>
    </div>
  </motion.div>
))

const Competitions = ({ data = [] }) => {
  const [visibleCompetitions, setVisibleCompetitions] = useState(3)
  const [currentCompetitionIndex, setCurrentCompetitionIndex] = useState(0)

  const loadMoreCompetitions = useCallback(() => {
    setVisibleCompetitions(prev => Math.min(prev + 3, data.length))
  }, [data.length])

  const nextCompetition = useCallback(() => {
    setCurrentCompetitionIndex(prev => prev === data.length - 1 ? 0 : prev + 1)
  }, [data.length])

  const prevCompetition = useCallback(() => {
    setCurrentCompetitionIndex(prev => prev === 0 ? data.length - 1 : prev - 1)
  }, [data.length])

  const hasMoreCompetitions = visibleCompetitions < data.length

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-primary-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-primary-900/20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-200/20 via-transparent to-purple-200/20 dark:from-primary-900/20 dark:to-purple-900/20" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary-300/10 dark:bg-primary-900/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300/10 dark:bg-purple-900/20 rounded-full blur-3xl" />
      
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
            className="w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl mx-auto mb-6"
          >
            <Trophy className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-br from-gray-800 to-primary-600 dark:from-gray-100 dark:to-primary-400 bg-clip-text text-transparent mb-4">
            Competitions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Showcasing my journey through hackathons and coding competitions
          </p>
        </motion.div>

        {/* Desktop Grid View */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {data.length > 0 ? (
            data.slice(0, visibleCompetitions).map((competition, index) => (
              <CompetitionCard
                key={competition.id || index}
                competition={competition}
                index={index}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="col-span-full text-center py-16"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Trophy className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-300 mb-2">Coming Soon</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                Competition achievements are being prepared. Stay tuned for exciting updates!
              </p>
            </motion.div>
          )}
        </div>

        {/* Mobile Carousel View */}
        <div className="lg:hidden">
          {data.length > 0 ? (
            <div className="relative">
              {/* Swipe Instruction */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-6"
              >
                <div className="inline-flex items-center bg-gradient-to-r from-primary-500 to-purple-600 text-white text-sm px-4 py-2 rounded-full shadow-lg">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Swipe to navigate
                  <ChevronRight className="w-4 h-4 ml-2" />
                </div>
              </motion.div>

              <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-600">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCompetitionIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.4, type: "spring" }}
                  >
                    {/* Competition Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={data[currentCompetitionIndex].image}
                        alt={data[currentCompetitionIndex].title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Trophy className="w-6 h-6 text-white" />
                        </div>
                        {data[currentCompetitionIndex].position && (
                          <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                            data[currentCompetitionIndex].position.includes('1') ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' :
                            data[currentCompetitionIndex].position.includes('2') ? 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100' :
                            data[currentCompetitionIndex].position.includes('3') ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100' :
                            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                          }`}>
                            {data[currentCompetitionIndex].position}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                        {data[currentCompetitionIndex].title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                        {data[currentCompetitionIndex].description}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>{data[currentCompetitionIndex].date}</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 text-right font-medium">
                          by {data[currentCompetitionIndex].organizer}
                        </div>
                      </div>
                      
                      {data[currentCompetitionIndex].certificateUrl && (
                        <a
                          href={data[currentCompetitionIndex].certificateUrl}
                          className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-lg hover:from-primary-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Award className="w-4 h-4" />
                          <span className="font-semibold">View Certificate</span>
                        </a>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Controls - FIXED FOR DARK THEME */}
                <div className="flex justify-between items-center px-6 pb-6">
                  <motion.button
                    onClick={prevCompetition}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-xl bg-white dark:bg-gray-700 shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-600 transition-all duration-300 touch-manipulation"
                    aria-label="Previous competition"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </motion.button>
                  
                  {/* Dots Indicator */}
                  <div className="flex space-x-2">
                    {data.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentCompetitionIndex(index)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 touch-manipulation ${
                          index === currentCompetitionIndex 
                            ? 'bg-gradient-to-r from-primary-500 to-purple-600 w-6' 
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                        aria-label={`Go to competition ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  <motion.button
                    onClick={nextCompetition}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-xl bg-white dark:bg-gray-700 shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-600 transition-all duration-300 touch-manipulation"
                    aria-label="Next competition"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </motion.button>
                </div>
              </div>

              {/* Competition Counter */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mt-4"
              >
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {currentCompetitionIndex + 1} of {data.length}
                </p>
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Trophy className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400">Competition information coming soon...</p>
            </motion.div>
          )}
        </div>

        {/* Load More Button */}
        <AnimatePresence>
          {hasMoreCompetitions && data.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-12 hidden lg:block"
            >
              <div className="flex justify-center">
                <motion.button
                  onClick={loadMoreCompetitions}
                  className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-2xl hover:from-primary-600 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-3xl group/load"
                  whileHover={{ 
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="font-semibold text-lg">Load More Competitions</span>
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="group-hover/load:scale-110 transition-transform duration-300"
                  >
                    <ChevronDown className="w-6 h-6" />
                  </motion.div>
                </motion.button>
              </div>
              
              {/* Progress indicator */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">
                  Showing {visibleCompetitions} of {data.length} competitions
                </p>
                <div className="w-48 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full h-2 shadow-inner">
                  <motion.div
                    className="bg-gradient-to-r from-primary-500 to-purple-600 h-2 rounded-full shadow-lg"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${(visibleCompetitions / data.length) * 100}%` 
                    }}
                    transition={{ duration: 0.8, type: "spring" }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* All competitions loaded message */}
        {!hasMoreCompetitions && data.length > 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 hidden lg:flex items-center justify-center gap-3 text-primary-600 dark:text-primary-400 font-semibold"
          >
            <Sparkles className="w-5 h-5" />
            <span>All competitions loaded!</span>
            <Sparkles className="w-5 h-5" />
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default memo(Competitions)