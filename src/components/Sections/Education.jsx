import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Award, BookOpen, Clock, MapPin, Star, Zap, ChevronLeft, ChevronRight } from 'lucide-react'

const Education = ({ data = [] }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const educationsPerPage = 1 // Show 1 education per page on mobile

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Responsive education display
  const displayedEducations = isMobile 
    ? data.slice((currentPage - 1) * educationsPerPage, currentPage * educationsPerPage)
    : data

  const totalPages = Math.ceil(data.length / educationsPerPage)

  // Pagination functions
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
    }
  }

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 3
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= 3; i++) {
          pageNumbers.push(i)
        }
        if (totalPages > 3) pageNumbers.push('...')
        pageNumbers.push(totalPages)
      } else if (currentPage >= totalPages - 1) {
        pageNumbers.push(1)
        pageNumbers.push('...')
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(i)
        }
      } else {
        pageNumbers.push(1)
        pageNumbers.push('...')
        pageNumbers.push(currentPage)
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      }
    }
    
    return pageNumbers
  }

  // Function to determine honors based on program type
  const getHonorsLevel = (degree) => {
    const lowerDegree = degree.toLowerCase();
    if (lowerDegree.includes('phd') || lowerDegree.includes('doctor')) {
      return 'Research Excellence';
    } else if (lowerDegree.includes('master') || lowerDegree.includes('ms')) {
      return 'Distinction';
    } else if (lowerDegree.includes('bachelor') || lowerDegree.includes('bs') || lowerDegree.includes('ba')) {
      return 'Honors';
    } else if (lowerDegree.includes('associate') || lowerDegree.includes('diploma')) {
      return 'Merit';
    } else {
      return 'Excellence';
    }
  };

  // Function to get relevant skills based on program
  const getProgramSkills = (degree, description) => {
    const lowerDegree = degree.toLowerCase();
    const lowerDesc = description.toLowerCase();
    
    if (lowerDegree.includes('computer') || lowerDegree.includes('software') || lowerDegree.includes('engineering')) {
      return ['Programming', 'Algorithms', 'System Design', 'Problem Solving'];
    } else if (lowerDegree.includes('business') || lowerDegree.includes('management') || lowerDegree.includes('mba')) {
      return ['Leadership', 'Strategy', 'Analytics', 'Management'];
    } else if (lowerDegree.includes('science') || lowerDegree.includes('research')) {
      return ['Research', 'Analysis', 'Methodology', 'Data Interpretation'];
    } else if (lowerDegree.includes('art') || lowerDegree.includes('design') || lowerDegree.includes('creative')) {
      return ['Creativity', 'Design Thinking', 'Visual Communication', 'Innovation'];
    } else if (lowerDesc.includes('data') || lowerDesc.includes('analytics')) {
      return ['Data Analysis', 'Statistics', 'Visualization', 'Machine Learning'];
    } else {
      return ['Mathematics', 'Physics', 'Computer Science Fundamentals', 'Problem Solving'];
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
            Academic Journey
          </h2>
          <p className="text-lg sm:text-xl text-purple-200">Where knowledge meets innovation</p>
        </motion.div>

        {/* Education Count - Only show on mobile */}
        {isMobile && data.length > 0 && (
          <div className="text-center mb-6">
            <p className="text-purple-300 text-sm">
              Page {currentPage} of {totalPages} • {data.length} education{data.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        <div className="max-w-7xl mx-auto">
          {data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
              {displayedEducations.map((edu, index) => {
                const honorsLevel = getHonorsLevel(edu.degree);
                const programSkills = getProgramSkills(edu.degree, edu.description);
                
                return (
                  <motion.div
                    key={edu.id || index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="group"
                  >
                    {/* Main Card */}
                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/10 hover:border-white/20 relative overflow-hidden h-full">
                      {/* Animated background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Floating degree icon */}
                      <div className="absolute -top-6 -right-6 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-500">
                        <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>

                      <div className="relative z-10 h-full flex flex-col">
                        {/* Institution and Degree */}
                        <div className="mb-4 sm:mb-6">
                          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">
                            {edu.degree}
                          </h3>
                          <div className="flex items-center gap-2 text-purple-300 font-semibold text-lg">
                            <BookOpen className="w-5 h-5" />
                            <span className="text-base sm:text-lg">{edu.institution}</span>
                          </div>
                        </div>

                        {/* Timeline and Location */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 p-4 bg-white/5 rounded-xl sm:rounded-2xl gap-2">
                          <div className="flex items-center gap-2 text-purple-200 text-sm">
                            <Clock className="w-4 h-4 text-purple-400" />
                            <span className="font-medium">{edu.period}</span>
                          </div>
                          <div className="flex items-center gap-2 text-purple-200 text-sm">
                            <MapPin className="w-4 h-4 text-blue-400" />
                            <span className="font-medium">{edu.location}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 flex-1">
                          {edu.description}
                        </p>

                        {/* GPA and Achievements */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
                          {edu.gpa && (
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-white text-center shadow-lg"
                            >
                              <div className="flex items-center justify-center gap-2 mb-2">
                                <Award className="w-5 h-5" />
                                <span className="font-bold text-sm sm:text-base">GPA</span>
                              </div>
                              <div className="text-2xl sm:text-3xl font-bold">{edu.gpa}</div>
                            </motion.div>
                          )}
                          
                          {/* Dynamic achievement badge */}
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-white text-center shadow-lg"
                          >
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <Star className="w-5 h-5" />
                              <span className="font-bold text-sm sm:text-base">{honorsLevel}</span>
                            </div>
                            <div className="text-xl sm:text-2xl font-bold">Achieved</div>
                          </motion.div>
                        </div>

                        {/* Dynamic Skills Gained */}
                        <div className="mb-4 sm:mb-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Zap className="w-4 h-4 text-yellow-400" />
                            <span className="font-semibold text-white text-base sm:text-lg">Key Learnings</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {programSkills.map((skill, skillIndex) => (
                              <motion.span
                                key={skillIndex}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: skillIndex * 0.1 }}
                                className="px-3 py-1 bg-white/10 text-white rounded-full text-xs sm:text-sm font-medium border border-white/20 hover:border-purple-400 transition-colors"
                              >
                                {skill}
                              </motion.span>
                            ))}
                          </div>
                        </div>

                        {/* Progress indicator */}
                        <div className="mt-auto">
                          <div className="flex items-center justify-between text-sm text-purple-300 mb-2">
                            <span>Academic Journey</span>
                            <span>100% Completed</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: '100%' }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="w-12 h-12 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Learning Journey</h3>
              <p className="text-purple-200 text-lg max-w-md mx-auto">
                Continuously expanding knowledge and skills to stay at the forefront of innovation.
              </p>
            </motion.div>
          )}
        </div>

        {/* Pagination Controls - Only show on mobile when multiple pages exist */}
        {isMobile && totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-4 mt-8"
          >
            {/* Pagination Buttons */}
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <motion.button
                onClick={prevPage}
                disabled={currentPage === 1}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 backdrop-blur-lg border ${
                  currentPage === 1
                    ? 'bg-white/5 text-gray-500 cursor-not-allowed border-white/10'
                    : 'bg-white/10 text-purple-300 hover:bg-white/20 border-white/20'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {getPageNumbers().map((pageNumber, index) => (
                  <React.Fragment key={index}>
                    {pageNumber === '...' ? (
                      <span className="px-2 py-1 text-purple-300">...</span>
                    ) : (
                      <motion.button
                        onClick={() => goToPage(pageNumber)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-8 h-8 rounded-lg transition-all duration-300 font-medium text-sm backdrop-blur-lg border ${
                          currentPage === pageNumber
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg border-purple-500'
                            : 'bg-white/5 text-purple-300 hover:bg-white/10 border-white/10'
                        }`}
                      >
                        {pageNumber}
                      </motion.button>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Next Button */}
              <motion.button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 backdrop-blur-lg border ${
                  currentPage === totalPages
                    ? 'bg-white/5 text-gray-500 cursor-not-allowed border-white/10'
                    : 'bg-white/10 text-purple-300 hover:bg-white/20 border-white/20'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Page Info */}
            <div className="text-xs text-purple-300 text-center">
              Education {Math.min((currentPage - 1) * educationsPerPage + 1, data.length)} of {data.length}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Education