import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Building2, Rocket, Target, Users, ArrowRight, Zap, Award, TrendingUp } from 'lucide-react'

const Experience = ({ data = [] }) => {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 animate-float">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              Professional Journey
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Building innovative solutions and growing with every challenge
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {data.length > 0 ? (
            <div className="space-y-8">
              {data.map((exp, index) => (
                <motion.div
                  key={exp.id || index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start">
                    {/* Timeline and Date - Left Side */}
                    <div className="lg:w-1/4 flex lg:flex-col items-start lg:items-start gap-3 lg:gap-2 w-full">
                      <div className="flex items-center gap-3 mt-1">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white shadow-lg flex-shrink-0"></div>
                        <div className="hidden lg:block w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                      </div>
                      <div className="text-left lg:text-left flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                          <Calendar className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          <span className="text-sm font-semibold truncate">{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="text-xs truncate">{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content Card - Right Side */}
                    <div className="lg:w-3/4 w-full">
                      <motion.div
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden group-hover:border-blue-200"
                      >
                        {/* Accent Bar */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500"></div>
                        
                        {/* Floating Company Badge - Improved Mobile Positioning */}
                        <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
                          <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border border-blue-200 max-w-[120px] sm:max-w-none">
                            <Building2 className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{exp.company}</span>
                          </div>
                        </div>

                        <div className="relative z-10 pr-16 sm:pr-20">
                          {/* Position and Company */}
                          <div className="mb-3 sm:mb-4">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {exp.position}
                            </h3>
                            <div className="flex items-center gap-2 text-gray-600">
                              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                              <span className="text-xs sm:text-sm">Part-time Position</span>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-xs sm:text-sm line-clamp-3 sm:line-clamp-none">
                            {exp.description}
                          </p>

                          {/* Technologies */}
                          {exp.technologies && exp.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                              {exp.technologies.slice(0, 4).map((tech, techIndex) => (
                                <motion.span
                                  key={techIndex}
                                  initial={{ scale: 0 }}
                                  whileInView={{ scale: 1 }}
                                  transition={{ delay: techIndex * 0.1 }}
                                  className="px-2 py-1 bg-white text-gray-700 rounded-lg text-xs font-medium border border-gray-200 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition-all duration-300 shadow-sm"
                                >
                                  {tech}
                                </motion.span>
                              ))}
                              {exp.technologies.length > 4 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-lg text-xs font-medium border border-gray-200">
                                  +{exp.technologies.length - 4}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Achievements Indicator */}
                          <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm">
                              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 flex-shrink-0" />
                              <span>Key Achievements</span>
                            </div>
                            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                          </div>
                        </div>

                        {/* Hover Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Connecting Line - Mobile */}
                  {index < data.length - 1 && (
                    <div className="lg:hidden flex justify-center mt-4">
                      <div className="w-0.5 h-6 bg-gradient-to-b from-blue-500 to-purple-500"></div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3">Ready for New Challenges</h3>
              <p className="text-gray-500 text-lg max-w-md mx-auto">
                Excited to bring my skills and passion to your next project. Let's build something amazing together!
              </p>
            </motion.div>
          )}
        </div>

        {/* Enhanced Stats Section */}
        {data.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 sm:mt-20"
          >
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">Career Highlights</h3>
              <p className="text-gray-600 max-w-lg mx-auto text-sm sm:text-base">A journey of continuous growth and achievement</p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 max-w-5xl mx-auto">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-white to-blue-50 rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-lg border border-blue-100 text-center group"
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-lg">
                  <Award className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="text-xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">{data.length}</div>
                <div className="text-gray-600 font-semibold text-xs sm:text-sm">Professional Roles</div>
                <div className="text-blue-500 text-xs mt-1">Proven Experience</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-white to-green-50 rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-lg border border-green-100 text-center group"
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-lg">
                  <Building2 className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="text-xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
                  {new Set(data.map(exp => exp.company)).size}
                </div>
                <div className="text-gray-600 font-semibold text-xs sm:text-sm">Companies</div>
                <div className="text-green-500 text-xs mt-1">Diverse Experience</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-white to-purple-50 rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-lg border border-purple-100 text-center group"
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-lg">
                  <Target className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="text-xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
                  11
                </div>
                <div className="text-gray-600 font-semibold text-xs sm:text-sm">Projects</div>
                <div className="text-purple-500 text-xs mt-1">Technical Expertise</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-white to-orange-50 rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-lg border border-orange-100 text-center group"
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-lg">
                  <Rocket className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="text-xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">{data.length * 3}+</div>
                <div className="text-gray-600 font-semibold text-xs sm:text-sm">Technology</div>
                <div className="text-orange-500 text-xs mt-1">Successfully conducted</div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12 sm:mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-blue-200 max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">Let's Build Together</h3>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
              Ready to bring my experience and passion to your next project
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
            >
              Start a Conversation
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience