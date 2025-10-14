import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, ExternalLink, X, Download, ChevronLeft, ChevronRight, Award, Clock, User, Star, Sparkles } from 'lucide-react'

const Courses = ({ data = [] }) => {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const coursesPerPage = 6

  // Calculate pagination
  const totalPages = Math.ceil(data.length / coursesPerPage)
  const indexOfLastCourse = currentPage * coursesPerPage
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
  const currentCourses = data.slice(indexOfFirstCourse, indexOfLastCourse)

  // Improved color combinations
  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'professional': 
        return {
          gradient: 'from-blue-600 to-cyan-600',
          badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
          text: 'text-blue-300'
        };
      case 'academic': 
        return {
          gradient: 'from-emerald-600 to-green-600',
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          text: 'text-emerald-300'
        };
      case 'technical': 
        return {
          gradient: 'from-purple-600 to-indigo-600',
          badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
          text: 'text-purple-300'
        };
      case 'certification': 
        return {
          gradient: 'from-orange-600 to-amber-600',
          badge: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
          text: 'text-orange-300'
        };
      default: 
        return {
          gradient: 'from-slate-600 to-gray-600',
          badge: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
          text: 'text-gray-300'
        };
    }
  }

  // Animation variants
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
    hidden: { 
      opacity: 0, 
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -4,
      transition: {
        duration: 0.3
      }
    }
  }

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
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1)
        pageNumbers.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i)
        }
      } else {
        pageNumbers.push(1)
        pageNumbers.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      }
    }
    
    return pageNumbers
  }

  return (
    <section id="courses-section" className="py-16 sm:py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Professional Development
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Continuous learning through courses and certifications
          </p>
        </motion.div>

        {/* Stats Overview */}
        {data.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 sm:mb-12 max-w-4xl mx-auto">
            {[
              { value: data.length, label: "Total Courses", color: "text-purple-300" },
              { value: data.filter(course => course.type === 'Professional').length, label: "Professional", color: "text-blue-300" },
              { value: data.filter(course => course.type === 'Academic').length, label: "Academic", color: "text-emerald-300" },
              { value: new Set(data.flatMap(course => course.skills || [])).size + "+", label: "Skills", color: "text-amber-300" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 text-center border border-white/10"
              >
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className={`${stat.color} text-sm`}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8"
        >
          {currentCourses.length > 0 ? currentCourses.map((course, index) => {
            const typeColors = getTypeColor(course.type);
            
            return (
              <motion.div
                key={course.id || index}
                variants={itemVariants}
                whileHover="hover"
                className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border border-white/10 hover:border-white/20 overflow-hidden"
                onClick={() => setSelectedCourse(course)}
              >
                {/* Course Header with Improved Layout */}
                <div className={`bg-gradient-to-r ${typeColors.gradient} p-6 relative overflow-hidden`}>
                  {/* Type Badge - Better positioned */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${typeColors.badge}`}>
                      {course.type}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 pr-16"> {/* Added padding to prevent text overlap */}
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0"> {/* Added min-w-0 for text truncation */}
                      <h3 className="text-lg font-bold text-white mb-1 line-clamp-2 leading-tight">
                        {course.title}
                      </h3>
                      <p className="text-white/90 text-sm font-medium truncate">
                        {course.platform}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-300 mb-4 line-clamp-3 text-sm leading-relaxed">
                    {course.description}
                  </p>
                  
                  {/* Course Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span>{course.completionDate}</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.skills?.slice(0, 3).map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-white/10 text-gray-300 rounded-lg text-xs border border-white/20"
                      >
                        {skill}
                      </span>
                    ))}
                    {course.skills?.length > 3 && (
                      <span className="px-2 py-1 bg-white/10 text-gray-400 rounded-lg text-xs">
                        +{course.skills.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex gap-3">
                      {course.certificateUrl && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedImage(course.certificateImage)
                          }}
                          className="flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Certificate
                        </button>
                      )}
                      {course.courseUrl && (
                        <a
                          href={course.courseUrl}
                          onClick={(e) => e.stopPropagation()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-400 hover:text-gray-300 transition-colors text-sm"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Course
                        </a>
                      )}
                    </div>
                    {course.grade && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-lg text-xs font-medium border border-green-500/30">
                        {course.grade}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          }) : (
            <div className="col-span-full text-center py-16">
              <div className="w-24 h-24 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Learning Journey</h3>
              <p className="text-gray-300 text-lg max-w-md mx-auto">
                Continuously expanding knowledge through new courses and certifications.
              </p>
            </div>
          )}
        </motion.div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div className="text-sm text-gray-400">
              Page {currentPage} of {totalPages} • {data.length} total courses
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === 1
                    ? 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/10'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <div className="flex items-center gap-1">
                {getPageNumbers().map((pageNumber, index) => (
                  <React.Fragment key={index}>
                    {pageNumber === '...' ? (
                      <span className="px-3 py-2 text-gray-400">...</span>
                    ) : (
                      <button
                        onClick={() => goToPage(pageNumber)}
                        className={`w-10 h-10 rounded-lg transition-all duration-200 font-medium text-sm ${
                          currentPage === pageNumber
                            ? 'bg-purple-600 text-white shadow-lg border border-purple-500'
                            : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === totalPages
                    ? 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/10'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                }`}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-gray-500">
              {coursesPerPage} courses per page
            </div>
          </div>
        )}

        {/* Course Detail Modal */}
        <AnimatePresence>
          {selectedCourse && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedCourse(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const typeColors = getTypeColor(selectedCourse.type);
                  
                  return (
                    <>
                      {/* Modal Header */}
                      <div className={`bg-gradient-to-r ${typeColors.gradient} p-8 relative`}>
                        <button
                          onClick={() => setSelectedCourse(null)}
                          className="absolute top-6 right-6 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors border border-white/20"
                        >
                          <X className="w-6 h-6 text-white" />
                        </button>
                        <div className="flex items-start gap-6 pr-16">
                          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                            <BookOpen className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                              {selectedCourse.title}
                            </h3>
                            <p className="text-white/90 text-lg font-medium mb-2">
                              {selectedCourse.platform}
                            </p>
                            <span className={`px-4 py-2 rounded-full text-sm font-medium border backdrop-blur-sm ${typeColors.badge}`}>
                              {selectedCourse.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 sm:p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                          {/* Course Details */}
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-purple-400" />
                                Course Overview
                              </h4>
                              <p className="text-gray-300 leading-relaxed">
                                {selectedCourse.fullDescription || selectedCourse.description}
                              </p>
                            </div>

                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                              <h5 className="font-semibold text-white mb-4">Details</h5>
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-400 flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    Duration
                                  </span>
                                  <span className="text-white font-medium">{selectedCourse.duration}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-400 flex items-center gap-2">
                                    <Award className="w-4 h-4" />
                                    Completed
                                  </span>
                                  <span className="text-white font-medium">{selectedCourse.completionDate}</span>
                                </div>
                                {selectedCourse.instructor && (
                                  <div className="flex items-center justify-between">
                                    <span className="text-gray-400 flex items-center gap-2">
                                      <User className="w-4 h-4" />
                                      Instructor
                                    </span>
                                    <span className="text-white font-medium">{selectedCourse.instructor}</span>
                                  </div>
                                )}
                                {selectedCourse.grade && (
                                  <div className="flex items-center justify-between">
                                    <span className="text-gray-400">Grade</span>
                                    <span className="text-green-400 font-bold">{selectedCourse.grade}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Skills & Actions */}
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Star className="w-5 h-5 text-yellow-400" />
                                Skills Acquired
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedCourse.skills?.map((skill, index) => (
                                  <span
                                    key={index}
                                    className="px-3 py-2 bg-white/10 text-gray-300 rounded-xl text-sm border border-white/20"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                              <h5 className="font-semibold text-white mb-4">Certificate & Resources</h5>
                              <div className="flex flex-col sm:flex-row gap-3">
                                {selectedCourse.certificateUrl && (
                                  <a
                                    href={selectedCourse.certificateUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-300 font-semibold"
                                  >
                                    <Download className="w-5 h-5 mr-2" />
                                    Download Certificate
                                  </a>
                                )}
                                {selectedCourse.courseUrl && (
                                  <a
                                    href={selectedCourse.courseUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 font-semibold border border-white/20"
                                  >
                                    <ExternalLink className="w-5 h-5 mr-2" />
                                    Visit Course
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Certificate Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage}
                  alt="Certificate"
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors border border-white/20"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Courses