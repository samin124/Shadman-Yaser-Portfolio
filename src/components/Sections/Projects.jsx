import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, X, ChevronLeft, ChevronRight, Calendar, Users, Clock, Star, Sparkles } from 'lucide-react'

const Projects = ({ data = [] }) => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [filter, setFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const projectsPerPage = 2 // Show 2 projects per page on mobile

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Get unique categories from projects
  const categories = ['all', ...new Set(data.flatMap(project => project.category || []))]

  // Filter projects based on selected category
  const filteredProjects = data.filter(project => 
    filter === 'all' || project.category?.includes(filter)
  )

  // Responsive projects display
  const displayedProjects = isMobile 
    ? filteredProjects.slice((currentPage - 1) * projectsPerPage, currentPage * projectsPerPage)
    : filteredProjects

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)

  const handleProjectSelect = (project) => {
    setSelectedProject(project)
  }

  // Pagination functions
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber)
    document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1)
      document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
      document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Reset to page 1 when filter changes
  React.useEffect(() => {
    setCurrentPage(1)
  }, [filter])

  // Calculate project status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'planned': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'archived': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
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

  return (
    <section id="projects-section" className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100 relative overflow-hidden">
      {/* Lighter Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
         <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-[0_0_15px_rgba(192,132,252,0.5)] hover:drop-shadow-[0_0_20px_rgba(192,132,252,0.8)] transition-all duration-300">
    My Projects
  </span>
</h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            Real world applications and innovative solutions built with modern technologies
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300 backdrop-blur-lg border ${
                filter === category
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg border-purple-500'
                  : 'bg-white/80 text-slate-700 hover:bg-white border-slate-200 shadow-sm hover:shadow-md'
              }`}
            >
              {category === 'all' ? 'All Projects' : category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Count - Only show on mobile */}
        {isMobile && (
          <div className="text-center mb-6">
            <p className="text-slate-600 text-sm">
              Page {currentPage} of {totalPages} • {filteredProjects.length} projects
              {filter !== 'all' && ` in "${filter}"`}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mb-8">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer group border border-slate-200 hover:border-purple-300"
              onClick={() => handleProjectSelect(project)}
            >
              {/* Project Image with Overlay */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                
                {/* Status Badge */}
                {project.status && (
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(project.status)} backdrop-blur-sm`}>
                    {project.status}
                  </div>
                )}

                {/* Tech Stack Preview */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-1">
                  {project.technologies?.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white rounded text-xs font-medium border border-white/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Featured Star */}
                {project.featured && (
                  <div className="absolute top-4 right-4">
                    <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
                  </div>
                )}
              </div>
              
              {/* Project Content */}
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800 leading-tight flex-1">
                    {project.title}
                  </h3>
                </div>

                <p className="text-slate-600 text-sm sm:text-base mb-4 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Project Meta */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                  {project.duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{project.duration}</span>
                    </div>
                  )}
                  {project.teamSize && (
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{project.teamSize} people</span>
                    </div>
                  )}
                  {project.year && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{project.year}</span>
                    </div>
                  )}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies?.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium border border-slate-200 hover:border-purple-400 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies?.length > 4 && (
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-full text-xs">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-1.5" />
                        Live
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center text-slate-600 hover:text-slate-700 text-sm font-medium transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-1.5" />
                        Code
                      </a>
                    )}
                  </div>
                  <span className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors">
                    View Details →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Projects Message */}
        {displayedProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-12 h-12 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">No Projects Found</h3>
            <p className="text-slate-600">No projects match the selected filter.</p>
          </motion.div>
        )}

        {/* Pagination Controls - Only show on mobile */}
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
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-300'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {getPageNumbers().map((pageNumber, index) => (
                  <React.Fragment key={index}>
                    {pageNumber === '...' ? (
                      <span className="px-2 py-1 text-slate-500">...</span>
                    ) : (
                      <motion.button
                        onClick={() => goToPage(pageNumber)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-8 h-8 rounded-lg transition-all duration-300 font-medium text-sm backdrop-blur-lg border ${
                          currentPage === pageNumber
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg border-purple-500'
                            : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-300'
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
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-300'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Page Info */}
            <div className="text-xs text-slate-600 text-center">
              Project {Math.min((currentPage - 1) * projectsPerPage + 1, filteredProjects.length)}-
              {Math.min(currentPage * projectsPerPage, filteredProjects.length)} of {filteredProjects.length}
            </div>
          </motion.div>
        )}

        {/* Enhanced Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
              isMobile={isMobile}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

// Updated Modal Component with better mobile positioning
const ProjectModal = ({ project, onClose, isMobile }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-[60]"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          marginTop: isMobile ? '4rem' : '0' // Add top margin on mobile to avoid navbar overlap
        }}
      >
        {/* Modal Header with Image */}
        <div className="relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 sm:h-64 object-cover"
            loading="lazy"
          />
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 bg-black/60 backdrop-blur-sm rounded-full hover:bg-black/80 transition-colors border border-white/30 z-10"
            style={{
              top: isMobile ? '1.5rem' : '1.5rem', // Ensure consistent positioning
              right: isMobile ? '1.5rem' : '1.5rem'
            }}
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
          
          {/* Project Status */}
          {project.status && (
            <div className={`absolute top-6 left-6 px-4 py-2 rounded-full text-sm font-semibold border backdrop-blur-sm ${
              project.status.toLowerCase() === 'completed' ? 'bg-green-500/20 text-green-700 border-green-500/50' :
              project.status.toLowerCase() === 'in progress' ? 'bg-blue-500/20 text-blue-700 border-blue-500/50' :
              'bg-yellow-500/20 text-yellow-700 border-yellow-500/50'
            }`}>
              {project.status}
            </div>
          )}
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          {/* Project Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                {project.title}
              </h3>
              {project.tagline && (
                <p className="text-lg text-purple-600 font-medium">
                  {project.tagline}
                </p>
              )}
            </div>
            {project.featured && (
              <Star className="w-6 h-6 text-yellow-500 flex-shrink-0 ml-4" fill="currentColor" />
            )}
          </div>
          
          <p className="text-slate-600 text-base sm:text-lg mb-6 leading-relaxed">
            {project.description}
          </p>

          {/* Project Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {project.duration && (
              <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-200">
                <Clock className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                <div className="text-xs text-slate-500">Duration</div>
                <div className="font-semibold text-slate-800 text-sm">{project.duration}</div>
              </div>
            )}
            {project.teamSize && (
              <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-200">
                <Users className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                <div className="text-xs text-slate-500">Team</div>
                <div className="font-semibold text-slate-800 text-sm">{project.teamSize}</div>
              </div>
            )}
            {project.year && (
              <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-200">
                <Calendar className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                <div className="text-xs text-slate-500">Year</div>
                <div className="font-semibold text-slate-800 text-sm">{project.year}</div>
              </div>
            )}
            {project.role && (
              <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-200">
                <Users className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                <div className="text-xs text-slate-500">Role</div>
                <div className="font-semibold text-slate-800 text-sm">{project.role}</div>
              </div>
            )}
          </div>

          {/* Technologies */}
          <div className="mb-8">
            <h4 className="text-xl font-bold text-slate-800 mb-4">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium border border-slate-300 hover:border-purple-400 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-200">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold shadow-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Live Project
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all duration-300 font-semibold border border-slate-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4 mr-2" />
                View Source Code
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Projects