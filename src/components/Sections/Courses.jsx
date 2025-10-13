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
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  }

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      rotateX: 15
    },
    visible: { 
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.6
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      rotateX: -15,
      transition: {
        duration: 0.3
      }
    }
  }

  const imageModalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.7,
      rotateY: 90
    },
    visible: { 
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      scale: 0.7,
      rotateY: -90,
      transition: {
        duration: 0.3
      }
    }
  }

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    })
  }

  // Pagination functions
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber)
    document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1)
      document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
      document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' })
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

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'professional': return 'from-blue-500 to-cyan-500';
      case 'academic': return 'from-green-500 to-emerald-500';
      case 'technical': return 'from-purple-500 to-pink-500';
      case 'certification': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-gray-600';
    }
  }

  return (
    <section id="courses-section" className="py-16 sm:py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"
        ></motion.div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 100
          }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.6,
              type: "spring",
              stiffness: 200
            }}
          >
            Professional Development
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-purple-200 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Continuous learning through courses and certifications
          </motion.p>
        </motion.div>

        {/* Stats Overview */}
        {data.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 sm:mb-12 max-w-4xl mx-auto"
          >
            {[
              { value: data.length, label: "Total Courses", color: "text-purple-300" },
              { value: data.filter(course => course.type === 'Professional').length, label: "Professional", color: "text-blue-300" },
              { value: data.filter(course => course.type === 'Academic').length, label: "Academic", color: "text-green-300" },
              { value: new Set(data.flatMap(course => course.skills || [])).size + "+", label: "Skills", color: "text-yellow-300" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={statsVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { type: "spring", stiffness: 400 }
                }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 text-center border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <motion.div 
                  className="text-2xl font-bold text-white"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                >
                  {stat.value}
                </motion.div>
                <div className={`${stat.color} text-sm`}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8"
        >
          {currentCourses.length > 0 ? currentCourses.map((course, index) => (
            <motion.div
              key={course.id || index}
              variants={itemVariants}
              whileHover="hover"
              className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-white/10 hover:border-white/20 overflow-hidden"
              onClick={() => setSelectedCourse(course)}
              layoutId={`course-${course.id || index}`}
            >
              {/* Course Header with Gradient */}
              <motion.div 
                className={`bg-gradient-to-r ${getTypeColor(course.type)} p-6 relative overflow-hidden`}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div
                  className="absolute top-4 right-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <span className="px-3 py-1 bg-black/20 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/20">
                    {course.type}
                  </span>
                </motion.div>
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <BookOpen className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-white/80 text-sm font-medium">
                      {course.platform}
                    </p>
                  </div>
                </div>
                {/* Shine effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                  whileHover={{ 
                    translateX: "200%",
                    transition: { duration: 0.8, ease: "easeInOut" }
                  }}
                />
              </motion.div>
              
              <div className="p-6">
                <motion.p 
                  className="text-gray-300 mb-4 line-clamp-2 text-sm leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {course.description}
                </motion.p>
                
                {/* Course Meta */}
                <motion.div 
                  className="flex items-center justify-between text-sm text-purple-300 mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>{course.completionDate}</span>
                  </div>
                </motion.div>

                {/* Skills */}
                <motion.div 
                  className="flex flex-wrap gap-2 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {course.skills?.slice(0, 3).map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: skillIndex * 0.1 + 0.4 }}
                      whileHover={{ 
                        scale: 1.1,
                        y: -2,
                        transition: { type: "spring", stiffness: 400 }
                      }}
                      className="px-2 py-1 bg-white/10 text-white rounded-lg text-xs border border-white/20 hover:border-purple-400 transition-colors"
                    >
                      {skill}
                    </motion.span>
                  ))}
                  {course.skills?.length > 3 && (
                    <motion.span 
                      className="px-2 py-1 bg-white/10 text-purple-300 rounded-lg text-xs border border-white/20"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      +{course.skills.length - 3}
                    </motion.span>
                  )}
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                  className="flex items-center justify-between pt-4 border-t border-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex gap-3">
                    {course.certificateUrl && (
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedCourse(course)
                          setSelectedImage(course.certificateImage)
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center text-purple-400 hover:text-purple-300 transition-colors text-sm"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Certificate
                      </motion.button>
                    )}
                    {course.courseUrl && (
                      <motion.a
                        href={course.courseUrl}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center text-gray-400 hover:text-gray-300 transition-colors text-sm"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Course
                      </motion.a>
                    )}
                  </div>
                  {course.grade && (
                    <motion.span 
                      className="px-2 py-1 bg-green-500/20 text-green-400 rounded-lg text-xs font-medium border border-green-500/30"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", delay: 0.6 }}
                    >
                      {course.grade}
                    </motion.span>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="col-span-full text-center py-16"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="w-24 h-24 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <BookOpen className="w-12 h-12 text-purple-400" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-3">Learning Journey</h3>
              <p className="text-purple-200 text-lg max-w-md mx-auto">
                Continuously expanding knowledge through new courses and certifications.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8"
          >
            {/* Page Info */}
            <motion.div 
              className="text-sm text-purple-300"
              whileHover={{ scale: 1.05 }}
            >
              Page {currentPage} of {totalPages} • {data.length} total courses
            </motion.div>

            {/* Pagination Buttons */}
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <motion.button
                onClick={prevPage}
                disabled={currentPage === 1}
                whileHover={{ scale: 1.05, x: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 backdrop-blur-lg border ${
                  currentPage === 1
                    ? 'bg-white/5 text-gray-500 cursor-not-allowed border-white/10'
                    : 'bg-white/10 text-purple-300 hover:bg-white/20 border-white/20'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </motion.button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {getPageNumbers().map((pageNumber, index) => (
                  <React.Fragment key={index}>
                    {pageNumber === '...' ? (
                      <motion.span 
                        className="px-3 py-2 text-purple-300"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ...
                      </motion.span>
                    ) : (
                      <motion.button
                        onClick={() => goToPage(pageNumber)}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-10 h-10 rounded-xl transition-all duration-300 font-medium text-sm backdrop-blur-lg border ${
                          currentPage === pageNumber
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg border-purple-500'
                            : 'bg-white/5 text-purple-300 hover:bg-white/10 border-white/10'
                        }`}
                        animate={{
                          scale: currentPage === pageNumber ? [1, 1.1, 1] : 1
                        }}
                        transition={{
                          duration: 2,
                          repeat: currentPage === pageNumber ? Infinity : 0,
                          repeatType: "reverse"
                        }}
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
                whileHover={{ scale: 1.05, x: 2 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 backdrop-blur-lg border ${
                  currentPage === totalPages
                    ? 'bg-white/5 text-gray-500 cursor-not-allowed border-white/10'
                    : 'bg-white/10 text-purple-300 hover:bg-white/20 border-white/20'
                }`}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Courses Per Page Info */}
            <motion.div 
              className="text-xs text-purple-400"
              whileHover={{ scale: 1.05 }}
            >
              {coursesPerPage} courses per page
            </motion.div>
          </motion.div>
        )}

        {/* Course Detail Modal */}
        <AnimatePresence mode="wait">
          {selectedCourse && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedCourse(null)}
            >
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <motion.div 
                  className={`bg-gradient-to-r ${getTypeColor(selectedCourse.type)} p-8 relative`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.button
                    onClick={() => setSelectedCourse(null)}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-6 right-6 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors border border-white/20"
                  >
                    <X className="w-6 h-6 text-white" />
                  </motion.button>
                  <div className="flex items-start gap-6">
                    <motion.div 
                      className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <BookOpen className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <motion.h3 
                        className="text-2xl sm:text-3xl font-bold text-white mb-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {selectedCourse.title}
                      </motion.h3>
                      <motion.p 
                        className="text-white/80 text-lg font-medium mb-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        {selectedCourse.platform}
                      </motion.p>
                      <motion.span 
                        className="px-4 py-2 bg-black/30 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/20"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                      >
                        {selectedCourse.type}
                      </motion.span>
                    </div>
                  </div>
                </motion.div>

                <div className="p-6 sm:p-8">
                  <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    {/* Course Details */}
                    <div className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-purple-400" />
                          Course Overview
                        </h4>
                        <p className="text-gray-300 leading-relaxed">
                          {selectedCourse.fullDescription || selectedCourse.description}
                        </p>
                      </motion.div>

                      <motion.div 
                        className="bg-white/5 rounded-2xl p-6 border border-white/10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <h5 className="font-semibold text-white mb-4">Details</h5>
                        <div className="space-y-3">
                          {[
                            { icon: Clock, label: "Duration", value: selectedCourse.duration },
                            { icon: Award, label: "Completed", value: selectedCourse.completionDate },
                            { icon: User, label: "Instructor", value: selectedCourse.instructor },
                            ...(selectedCourse.grade ? [{ label: "Grade", value: selectedCourse.grade, color: "text-green-400" }] : [])
                          ].map((item, idx) => (
                            <motion.div
                              key={idx}
                              className="flex items-center justify-between"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.9 + idx * 0.1 }}
                            >
                              <span className="text-gray-400 flex items-center gap-2">
                                {item.icon && <item.icon className="w-4 h-4" />}
                                {item.label}
                              </span>
                              <span className={`${item.color || 'text-white'} font-medium`}>
                                {item.value}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    {/* Skills & Actions */}
                    <div className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                      >
                        <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                          <Star className="w-5 h-5 text-yellow-400" />
                          Skills Acquired
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedCourse.skills?.map((skill, index) => (
                            <motion.span
                              key={index}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 1 + index * 0.1 }}
                              whileHover={{ 
                                scale: 1.1,
                                y: -2,
                                transition: { type: "spring", stiffness: 400 }
                              }}
                              className="px-3 py-2 bg-white/10 text-white rounded-xl text-sm border border-white/20 hover:border-purple-400 transition-colors"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>

                      <motion.div 
                        className="bg-white/5 rounded-2xl p-6 border border-white/10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <h5 className="font-semibold text-white mb-4">Certificate & Resources</h5>
                        <div className="flex flex-col sm:flex-row gap-3">
                          {selectedCourse.certificateUrl && (
                            <motion.a
                              href={selectedCourse.certificateUrl}
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold"
                            >
                              <Download className="w-5 h-5 mr-2" />
                              Download Certificate
                            </motion.a>
                          )}
                          {selectedCourse.courseUrl && (
                            <motion.a
                              href={selectedCourse.courseUrl}
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 font-semibold border border-white/20"
                            >
                              <ExternalLink className="w-5 h-5 mr-2" />
                              Visit Course
                            </motion.a>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
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
                variants={imageModalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative max-w-4xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.img
                  src={selectedImage}
                  alt="Certificate"
                  className="max-w-full max-h-full object-contain rounded-lg"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                />
                <motion.button
                  onClick={() => setSelectedImage(null)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors border border-white/20"
                >
                  <X className="w-6 h-6 text-white" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Courses