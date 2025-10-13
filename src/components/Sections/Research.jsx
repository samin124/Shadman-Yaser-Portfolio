import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Download, ExternalLink, ChevronDown } from 'lucide-react'

const Research = ({ data = [] }) => {
  const [visibleResearch, setVisibleResearch] = useState(2) // Start with 2 research items on mobile

  const loadMoreResearch = () => {
    setVisibleResearch(prev => Math.min(prev + 2, data.length))
  }

  const hasMoreResearch = visibleResearch < data.length

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Research & Publications</h2>
          <p className="text-lg sm:text-xl text-gray-600">My academic research and papers</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {data.length > 0 ? data.slice(0, visibleResearch).map((research, index) => (
            <motion.div
              key={research.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300"
            >
              <div className="p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                  {research.title}
                </h3>
                
                <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base line-clamp-3">
                  {research.description}
                </p>
                
                <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                  <span className="truncate mr-2">{research.conference}</span>
                  <span className="flex-shrink-0">{research.year}</span>
                </div>
                
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                  {research.type && (
                    <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm">
                      {research.type}
                    </span>
                  )}
                  {research.status && (
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${
                      research.status === 'Published' ? 'bg-green-100 text-green-700' :
                      research.status === 'Under Review' ? 'bg-yellow-100 text-yellow-700' :
                      research.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {research.status}
                    </span>
                  )}
                </div>
                
                <div className="flex space-x-3 sm:space-x-4 pt-3 sm:pt-4 border-t border-gray-200">
                  {research.pdfUrl && (
                    <a
                      href={research.pdfUrl}
                      className="flex items-center text-primary-600 hover:text-primary-700 transition-colors text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      PDF
                    </a>
                  )}
                  {research.link && (
                    <a
                      href={research.link}
                      className="flex items-center text-gray-700 hover:text-gray-900 transition-colors text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Read More
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 text-base sm:text-lg">Research publications coming soon...</p>
            </motion.div>
          )}
        </div>

        {/* Load More Button - Only show on mobile when there are more research items */}
        <AnimatePresence>
          {hasMoreResearch && data.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mt-8 md:hidden"
            >
              <div className="flex justify-center">
                <motion.button
                  onClick={loadMoreResearch}
                  className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-300 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="font-semibold">Load More Research</span>
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                </motion.button>
              </div>
              
              {/* Progress indicator */}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Showing {visibleResearch} of {data.length} publications
                </p>
                <div className="mt-2 w-24 mx-auto bg-gray-200 rounded-full h-1">
                  <motion.div
                    className="bg-primary-600 h-1 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${(visibleResearch / data.length) * 100}%` 
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Show message when all research items are loaded */}
        {!hasMoreResearch && data.length > 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 md:hidden text-center"
          >
            <p className="text-gray-600 font-medium text-sm">
              🎉 All research publications loaded!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Research