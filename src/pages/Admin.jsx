import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Save, Plus, Trash2, Edit3, Image, Upload, 
  LogOut, Eye, Download, Settings, User,
  Briefcase, BookOpen, Award, GraduationCap,
  Code, BarChart3, Mail, Phone, MapPin, Home,
  Calendar, Link, FileText, Globe, Star,
  ChevronUp, ChevronDown, Menu, X
} from 'lucide-react'

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('about')
  const [portfolioData, setPortfolioData] = useState(null)
  const [saving, setSaving] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  })

  // Login function
  const handleLogin = (e) => {
    e.preventDefault()
    if (loginData.username === 'shadman' && loginData.password === 'samin@@12345') {
      setIsAuthenticated(true)
      localStorage.setItem('adminAuthenticated', 'true')
      localStorage.setItem('adminLoginTime', Date.now().toString())
      loadPortfolioData()
    } else {
      alert('Invalid credentials!')
    }
  }

  const handleLogout = () => {
    if (hasUnsavedChanges) {
      const confirmLogout = window.confirm('You have unsaved changes. Are you sure you want to logout?')
      if (!confirmLogout) return
    }
    
    setIsAuthenticated(false)
    localStorage.removeItem('adminAuthenticated')
    localStorage.removeItem('adminLoginTime')
    localStorage.removeItem('portfolioData')
  }

  // Load portfolio data
  const loadPortfolioData = async () => {
    try {
      // First try to load from localStorage (for demo purposes)
      const savedData = localStorage.getItem('portfolioData')
      if (savedData) {
        setPortfolioData(JSON.parse(savedData))
        return
      }

      // If no saved data, try to load from JSON file
      const response = await fetch('/data/portfolio.json')
      if (response.ok) {
        const data = await response.json()
        setPortfolioData(data)
        // Save to localStorage for persistence
        localStorage.setItem('portfolioData', JSON.stringify(data))
      } else {
        // Initialize with empty structure
        const initialData = {
          about: {
            name: "",
            title: "",
            description: "",
            image: "",
            email: "",
            phone: "",
            presentAddress: "",
            hometown: "",
            availability: "",
            github: "",
            linkedin: "",
            resumeUrl: ""
          },
          projects: [],
          skills: [],
          experience: [],
          education: [],
          courses: [],
          research: [],
          competitions: [],
          contact: {
            email: "",
            phone: "",
            location: ""
          }
        }
        setPortfolioData(initialData)
        localStorage.setItem('portfolioData', JSON.stringify(initialData))
      }
    } catch (error) {
      console.error('Error loading data:', error)
      // Initialize with empty structure if everything fails
      const initialData = {
        about: {
          name: "",
          title: "",
          description: "",
          image: "",
          email: "",
          phone: "",
          presentAddress: "",
          hometown: "",
          availability: "",
          github: "",
          linkedin: "",
          resumeUrl: ""
        },
        projects: [],
        skills: [],
        experience: [],
        education: [],
        courses: [],
        research: [],
        competitions: [],
        contact: {
          email: "",
          phone: "",
          location: ""
        }
      }
      setPortfolioData(initialData)
      localStorage.setItem('portfolioData', JSON.stringify(initialData))
    }
  }

  // Check authentication on mount
  useEffect(() => {
    const auth = localStorage.getItem('adminAuthenticated')
    const loginTime = localStorage.getItem('adminLoginTime')
    
    // Check if login is still valid (24 hours)
    if (auth === 'true' && loginTime) {
      const timeSinceLogin = Date.now() - parseInt(loginTime)
      const twentyFourHours = 24 * 60 * 60 * 1000
      
      if (timeSinceLogin < twentyFourHours) {
        setIsAuthenticated(true)
        loadPortfolioData()
      } else {
        // Login expired
        localStorage.removeItem('adminAuthenticated')
        localStorage.removeItem('adminLoginTime')
      }
    }
  }, [])

  // Save data function
  const handleSave = async () => {
    if (!portfolioData) return
    
    setSaving(true)
    try {
      // Save to localStorage (for demo - in production, send to backend API)
      localStorage.setItem('portfolioData', JSON.stringify(portfolioData))
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setHasUnsavedChanges(false)
      alert('Changes saved successfully! Your portfolio has been updated.')
    } catch (error) {
      console.error('Error saving data:', error)
      alert('Error saving changes. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  // Export data as JSON file
  const handleExport = () => {
    if (!portfolioData) return
    
    const dataStr = JSON.stringify(portfolioData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'my-portfolio-data.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Preview the live site
  const handlePreview = () => {
    window.open('/', '_blank')
  }

  // Handle data changes
  const handleDataChange = (newData) => {
    setPortfolioData(newData)
    setHasUnsavedChanges(true)
  }

  // Reset all data
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      const initialData = {
        about: {
          name: "",
          title: "",
          description: "",
          image: "",
          email: "",
          phone: "",
          presentAddress: "",
          hometown: "",
          availability: "",
          github: "",
          linkedin: "",
          resumeUrl: ""
        },
        projects: [],
        skills: [],
        experience: [],
        education: [],
        courses: [],
        research: [],
        competitions: [],
        contact: {
          email: "",
          phone: "",
          location: ""
        }
      }
      setPortfolioData(initialData)
      localStorage.setItem('portfolioData', JSON.stringify(initialData))
      setHasUnsavedChanges(false)
      alert('All data has been reset to default.')
    }
  }

  if (!isAuthenticated) {
    return <LoginScreen loginData={loginData} setLoginData={setLoginData} handleLogin={handleLogin} />
  }

  if (!portfolioData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              <div className="hidden sm:block">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Portfolio Admin</h1>
                <p className="text-xs sm:text-sm text-gray-600">Edit your live website content</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-lg font-bold text-gray-800">Admin</h1>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              title={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Desktop Actions */}
            <div className="hidden sm:flex items-center space-x-2">
              {hasUnsavedChanges && (
                <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full whitespace-nowrap">
                  Unsaved Changes
                </span>
              )}
              <button
                onClick={handlePreview}
                className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                aria-label="View live site"
                title="View live site"
              >
                <Eye className="w-4 h-4 mr-1" />
                <span className="hidden lg:inline">View Live</span>
                <span className="lg:hidden">Live</span>
              </button>
              <button
                onClick={handleExport}
                className="flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                aria-label="Export data"
                title="Export data"
              >
                <Download className="w-4 h-4 mr-1" />
                <span className="hidden lg:inline">Export</span>
              </button>
              <button
                onClick={handleReset}
                className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                aria-label="Reset all data"
                title="Reset all data"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                <span className="hidden lg:inline">Reset</span>
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !hasUnsavedChanges}
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                aria-label={saving ? "Saving changes" : "Save changes"}
                title={saving ? "Saving changes" : "Save changes"}
              >
                <Save className="w-4 h-4 mr-1" />
                <span className="hidden lg:inline">
                  {saving ? 'Saving...' : 'Save Changes'}
                </span>
                <span className="lg:hidden">
                  {saving ? '...' : 'Save'}
                </span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                aria-label="Logout"
                title="Logout"
              >
                <LogOut className="w-4 h-4 mr-1" />
                <span className="hidden lg:inline">Logout</span>
              </button>
            </div>
          </div>

          {/* Mobile Actions Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden mt-4 pb-2 border-t pt-4"
            >
              <div className="grid grid-cols-2 gap-2">
                {hasUnsavedChanges && (
                  <div className="col-span-2 text-center">
                    <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                      Unsaved Changes
                    </span>
                  </div>
                )}
                <button
                  onClick={handlePreview}
                  className="flex items-center justify-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  aria-label="View live site"
                  title="View live site"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View Live
                </button>
                <button
                  onClick={handleExport}
                  className="flex items-center justify-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                  aria-label="Export data"
                  title="Export data"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                  aria-label="Reset all data"
                  title="Reset all data"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Reset All
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !hasUnsavedChanges}
                  className="flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  aria-label={saving ? "Saving changes" : "Save changes"}
                  title={saving ? "Saving changes" : "Save changes"}
                >
                  <Save className="w-4 h-4 mr-1" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={handleLogout}
                  className="col-span-2 flex items-center justify-center px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                  aria-label="Logout"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow-sm border-b sticky top-[73px] sm:top-[89px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto py-2">
            {[
              { id: 'about', name: 'About', icon: User },
              { id: 'projects', name: 'Projects', icon: Briefcase },
              { id: 'skills', name: 'Skills', icon: Code },
              { id: 'experience', name: 'Experience', icon: BarChart3 },
              { id: 'education', name: 'Education', icon: GraduationCap },
              { id: 'courses', name: 'Courses', icon: BookOpen },
              { id: 'research', name: 'Research', icon: FileText },
              { id: 'competitions', name: 'Competitions', icon: Award }
            ].map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  setActiveTab(id)
                  setMobileMenuOpen(false)
                }}
                className={`flex items-center px-3 py-2 font-medium whitespace-nowrap border-b-2 transition-colors text-sm sm:text-base ${
                  activeTab === id
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
                aria-label={`Edit ${name}`}
                title={`Edit ${name}`}
              >
                <Icon className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">{name}</span>
                <span className="sm:hidden">{name.slice(0, 3)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 capitalize">
              {activeTab} Management
            </h2>
            <div className="text-xs sm:text-sm text-gray-500">
              {(() => {
                switch(activeTab) {
                  case 'projects': return `${portfolioData.projects.length} projects`;
                  case 'skills': return `${portfolioData.skills.length} skills`;
                  case 'experience': return `${portfolioData.experience.length} experiences`;
                  case 'education': return `${portfolioData.education.length} education entries`;
                  case 'courses': return `${portfolioData.courses.length} courses`;
                  case 'research': return `${portfolioData.research.length} research items`;
                  case 'competitions': return `${portfolioData.competitions.length} competitions`;
                  default: return '';
                }
              })()}
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {activeTab === 'about' && (
              <AboutEditor 
                data={portfolioData.about} 
                onChange={(data) => handleDataChange({...portfolioData, about: data})} 
              />
            )}
            
            {activeTab === 'projects' && (
              <ProjectsEditor 
                data={portfolioData.projects} 
                onChange={(data) => handleDataChange({...portfolioData, projects: data})} 
              />
            )}

            {activeTab === 'skills' && (
              <SkillsEditor 
                data={portfolioData.skills} 
                onChange={(data) => handleDataChange({...portfolioData, skills: data})} 
              />
            )}

            {activeTab === 'experience' && (
              <ExperienceEditor 
                data={portfolioData.experience} 
                onChange={(data) => handleDataChange({...portfolioData, experience: data})} 
              />
            )}

            {activeTab === 'education' && (
              <EducationEditor 
                data={portfolioData.education} 
                onChange={(data) => handleDataChange({...portfolioData, education: data})} 
              />
            )}

            {activeTab === 'courses' && (
              <CoursesEditor 
                data={portfolioData.courses} 
                onChange={(data) => handleDataChange({...portfolioData, courses: data})} 
              />
            )}

            {activeTab === 'research' && (
              <ResearchEditor 
                data={portfolioData.research} 
                onChange={(data) => handleDataChange({...portfolioData, research: data})} 
              />
            )}

            {activeTab === 'competitions' && (
              <CompetitionsEditor 
                data={portfolioData.competitions} 
                onChange={(data) => handleDataChange({...portfolioData, competitions: data})} 
              />
            )}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">💡 Quick Tips</h3>
          <ul className="text-blue-700 text-xs sm:text-sm space-y-1">
            <li>• Make changes and click "Save Changes" to update your live site</li>
            <li>• Use "Export Data" to backup your content</li>
            <li>• "View Live Site" opens your portfolio in a new tab</li>
            <li>• Login persists for 24 hours - no need to login repeatedly</li>
            <li>• All data is saved locally in your browser</li>
            <li>• Use "Reset All" to start with a clean slate</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// Login Component
const LoginScreen = ({ loginData, setLoginData, handleLogin }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center p-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md"
    >
      <div className="text-center mb-6 sm:mb-8">
        <Settings className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Admin Login</h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">Manage your portfolio content</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            value={loginData.username}
            onChange={(e) => setLoginData({...loginData, username: e.target.value})}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter username"
            required
            aria-label="Username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            value={loginData.password}
            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter password"
            required
            aria-label="Password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          aria-label="Sign in to admin panel"
        >
          Sign In
        </button>
      </form>

      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <p className="text-xs sm:text-sm text-yellow-800 text-center">
          <strong>Demo Credentials:</strong><br />
          Username: <code>shadman</code><br />
          Password: <code>samin@@12345</code>
        </p>
      </div>
    </motion.div>
  </div>
)

// About Editor Component
const AboutEditor = ({ data, onChange }) => {
  const [formData, setFormData] = useState(data || {})

  useEffect(() => {
    setFormData(data || {})
  }, [data])

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value }
    setFormData(updated)
    onChange(updated)
  }

  const fields = [
    { key: 'name', label: 'Full Name', icon: User, type: 'text' },
    { key: 'title', label: 'Professional Title', icon: Briefcase, type: 'text' },
    { key: 'email', label: 'Email', icon: Mail, type: 'email' },
    { key: 'phone', label: 'Phone', icon: Phone, type: 'tel' },
    { key: 'presentAddress', label: 'Present Address', icon: MapPin, type: 'text' },
    { key: 'hometown', label: 'Hometown', icon: Home, type: 'text' },
    { key: 'availability', label: 'Availability', icon: Calendar, type: 'text' },
    { key: 'github', label: 'GitHub URL', icon: Link, type: 'url' },
    { key: 'linkedin', label: 'LinkedIn URL', icon: Link, type: 'url' },
    { key: 'resumeUrl', label: 'Resume URL', icon: FileText, type: 'url' },
    { key: 'image', label: 'Profile Image URL', icon: Image, type: 'url' },
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {fields.map(({ key, label, icon: Icon, type }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </label>
            <input
              type={type}
              value={formData[key] || ''}
              onChange={(e) => handleChange(key, e.target.value)}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={`Enter ${label.toLowerCase()}`}
              aria-label={label}
            />
          </div>
        ))}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={4}
          className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your professional description"
          aria-label="Professional description"
        />
      </div>
    </div>
  )
}

// Projects Editor Component
const ProjectsEditor = ({ data, onChange }) => {
  const [projects, setProjects] = useState(data || [])

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      title: "New Project",
      description: "Project description",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      technologies: ["React", "Node.js"],
      liveUrl: "#",
      githubUrl: "#",
      features: ["Feature 1", "Feature 2"]
    }
    const updated = [...projects, newProject]
    setProjects(updated)
    onChange(updated)
  }

  const updateProject = (id, field, value) => {
    const updated = projects.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    )
    setProjects(updated)
    onChange(updated)
  }

  const removeProject = (id) => {
    const updated = projects.filter(project => project.id !== id)
    setProjects(updated)
    onChange(updated)
  }

  const moveProject = (index, direction) => {
    const newProjects = [...projects]
    const [movedProject] = newProjects.splice(index, 1)
    newProjects.splice(index + direction, 0, movedProject)
    setProjects(newProjects)
    onChange(newProjects)
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 sm:mb-6">
        <h3 className="text-lg font-semibold">Projects</h3>
        <button
          onClick={addProject}
          className="flex items-center justify-center px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
          aria-label="Add new project"
        >
          <Plus className="w-4 h-4 mr-1 sm:mr-2" />
          Add Project
        </button>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {projects.map((project, index) => (
          <div key={project.id} className="border border-gray-200 rounded-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
              <h4 className="text-lg font-semibold">Project {index + 1}</h4>
              <div className="flex items-center justify-end space-x-2">
                <button
                  onClick={() => moveProject(index, -1)}
                  disabled={index === 0}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-30"
                  aria-label="Move project up"
                  title="Move project up"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveProject(index, 1)}
                  disabled={index === projects.length - 1}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-30"
                  aria-label="Move project down"
                  title="Move project down"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removeProject(project.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Delete project"
                  title="Delete project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Project title"
                  aria-label="Project title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  value={project.image}
                  onChange={(e) => updateProject(project.id, 'image', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                  aria-label="Project image URL"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Project description"
                  aria-label="Project description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Live URL</label>
                <input
                  type="url"
                  value={project.liveUrl}
                  onChange={(e) => updateProject(project.id, 'liveUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com"
                  aria-label="Live project URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
                <input
                  type="url"
                  value={project.githubUrl}
                  onChange={(e) => updateProject(project.id, 'githubUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://github.com/username/repo"
                  aria-label="GitHub repository URL"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Technologies (comma-separated)</label>
                <input
                  type="text"
                  value={project.technologies?.join(', ') || ''}
                  onChange={(e) => updateProject(project.id, 'technologies', e.target.value.split(',').map(t => t.trim()))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="React, Node.js, MongoDB"
                  aria-label="Technologies used in project"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Features (one per line)</label>
                <textarea
                  value={project.features?.join('\n') || ''}
                  onChange={(e) => updateProject(project.id, 'features', e.target.value.split('\n').filter(f => f.trim()))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Feature 1\nFeature 2\nFeature 3"
                  aria-label="Project features"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Skills Editor Component
const SkillsEditor = ({ data, onChange }) => {
  const [skills, setSkills] = useState(data || [])

  const addSkill = () => {
    const newSkill = {
      id: Date.now(),
      name: "New Skill",
      level: 50,
      category: "Frontend",
      icon: "⚡",
      projects: ["Project 1"]
    }
    const updated = [...skills, newSkill]
    setSkills(updated)
    onChange(updated)
  }

  const updateSkill = (id, field, value) => {
    const updated = skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    )
    setSkills(updated)
    onChange(updated)
  }

  const removeSkill = (id) => {
    const updated = skills.filter(skill => skill.id !== id)
    setSkills(updated)
    onChange(updated)
  }

  const categories = ["Frontend", "Backend", "Database", "Tools", "Languages", "Other"]

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 sm:mb-6">
        <h3 className="text-lg font-semibold">Skills</h3>
        <button
          onClick={addSkill}
          className="flex items-center justify-center px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
          aria-label="Add new skill"
        >
          <Plus className="w-4 h-4 mr-1 sm:mr-2" />
          Add Skill
        </button>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {skills.map((skill, index) => (
          <div key={skill.id} className="border border-gray-200 rounded-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
              <h4 className="text-lg font-semibold">Skill {index + 1}</h4>
              <button
                onClick={() => removeSkill(skill.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors self-end sm:self-auto"
                aria-label="Delete skill"
                title="Delete skill"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skill Name</label>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Skill name"
                  aria-label="Skill name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={skill.category}
                  onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  aria-label="Skill category"
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skill Level ({skill.level}%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={skill.level}
                  onChange={(e) => updateSkill(skill.id, 'level', parseInt(e.target.value))}
                  className="w-full"
                  aria-label={`Skill level: ${skill.level}%`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                <input
                  type="text"
                  value={skill.icon}
                  onChange={(e) => updateSkill(skill.id, 'icon', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="⚡"
                  aria-label="Skill icon"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Related Projects (comma-separated)</label>
                <input
                  type="text"
                  value={skill.projects?.join(', ') || ''}
                  onChange={(e) => updateSkill(skill.id, 'projects', e.target.value.split(',').map(p => p.trim()))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Project 1, Project 2"
                  aria-label="Related projects"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Experience Editor Component
const ExperienceEditor = ({ data, onChange }) => {
  const [experience, setExperience] = useState(data || [])

  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      position: "Your Position",
      company: "Company Name",
      period: "2023 - Present",
      location: "Location",
      description: "Job description and responsibilities...",
      technologies: ["React", "Node.js"]
    }
    const updated = [...experience, newExp]
    setExperience(updated)
    onChange(updated)
  }

  const updateExperience = (id, field, value) => {
    const updated = experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    )
    setExperience(updated)
    onChange(updated)
  }

  const removeExperience = (id) => {
    const updated = experience.filter(exp => exp.id !== id)
    setExperience(updated)
    onChange(updated)
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 sm:mb-6">
        <h3 className="text-lg font-semibold">Work Experience</h3>
        <button
          onClick={addExperience}
          className="flex items-center justify-center px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
          aria-label="Add new experience"
        >
          <Plus className="w-4 h-4 mr-1 sm:mr-2" />
          Add Experience
        </button>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {experience.map((exp, index) => (
          <div key={exp.id} className="border border-gray-200 rounded-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
              <h4 className="text-lg font-semibold">Experience {index + 1}</h4>
              <button
                onClick={() => removeExperience(exp.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors self-end sm:self-auto"
                aria-label="Delete experience"
                title="Delete experience"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Job position"
                  aria-label="Job position"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Company name"
                  aria-label="Company name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
                <input
                  type="text"
                  value={exp.period}
                  onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="2020 - 2023"
                  aria-label="Employment period"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Location"
                  aria-label="Job location"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Job description and responsibilities"
                  aria-label="Job description"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Technologies (comma-separated)</label>
                <input
                  type="text"
                  value={exp.technologies?.join(', ') || ''}
                  onChange={(e) => updateExperience(exp.id, 'technologies', e.target.value.split(',').map(t => t.trim()))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="React, Node.js, MongoDB"
                  aria-label="Technologies used"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Education Editor Component
const EducationEditor = ({ data, onChange }) => {
  const [education, setEducation] = useState(data || [])

  const addEducation = () => {
    const newEdu = {
      id: Date.now(),
      degree: "Your Degree",
      institution: "University Name",
      period: "2019 - 2023",
      location: "Location",
      description: "Education description...",
      gpa: "3.8/4.0"
    }
    const updated = [...education, newEdu]
    setEducation(updated)
    onChange(updated)
  }

  const updateEducation = (id, field, value) => {
    const updated = education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    )
    setEducation(updated)
    onChange(updated)
  }

  const removeEducation = (id) => {
    const updated = education.filter(edu => edu.id !== id)
    setEducation(updated)
    onChange(updated)
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 sm:mb-6">
        <h3 className="text-lg font-semibold">Education</h3>
        <button
          onClick={addEducation}
          className="flex items-center justify-center px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
          aria-label="Add new education"
        >
          <Plus className="w-4 h-4 mr-1 sm:mr-2" />
          Add Education
        </button>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {education.map((edu, index) => (
          <div key={edu.id} className="border border-gray-200 rounded-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
              <h4 className="text-lg font-semibold">Education {index + 1}</h4>
              <button
                onClick={() => removeEducation(edu.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors self-end sm:self-auto"
                aria-label="Delete education"
                title="Delete education"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Degree name"
                  aria-label="Degree name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Institution name"
                  aria-label="Institution name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
                <input
                  type="text"
                  value={edu.period}
                  onChange={(e) => updateEducation(edu.id, 'period', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="2019 - 2023"
                  aria-label="Education period"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={edu.location}
                  onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Location"
                  aria-label="Institution location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GPA</label>
                <input
                  type="text"
                  value={edu.gpa}
                  onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="3.8/4.0"
                  aria-label="GPA score"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={edu.description}
                  onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Education description"
                  aria-label="Education description"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Courses Editor Component
const CoursesEditor = ({ data, onChange }) => {
  const [courses, setCourses] = useState(data || [])

  const addCourse = () => {
    const newCourse = {
      id: Date.now(),
      title: "Course Title",
      platform: "Platform Name",
      type: "Professional",
      description: "Course description...",
      duration: "40 hours",
      completionDate: "January 2024",
      instructor: "Instructor Name",
      certificateImage: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=600&h=400&fit=crop",
      certificateUrl: "#",
      courseUrl: "#",
      skills: ["Skill 1", "Skill 2"],
      grade: "95%"
    }
    const updated = [...courses, newCourse]
    setCourses(updated)
    onChange(updated)
  }

  const updateCourse = (id, field, value) => {
    const updated = courses.map(course => 
      course.id === id ? { ...course, [field]: value } : course
    )
    setCourses(updated)
    onChange(updated)
  }

  const removeCourse = (id) => {
    const updated = courses.filter(course => course.id !== id)
    setCourses(updated)
    onChange(updated)
  }

  const courseTypes = ["Professional", "Academic", "Certification"]

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 sm:mb-6">
        <h3 className="text-lg font-semibold">Courses & Certifications</h3>
        <button
          onClick={addCourse}
          className="flex items-center justify-center px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
          aria-label="Add new course"
        >
          <Plus className="w-4 h-4 mr-1 sm:mr-2" />
          Add Course
        </button>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {courses.map((course, index) => (
          <div key={course.id} className="border border-gray-200 rounded-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
              <h4 className="text-lg font-semibold">Course {index + 1}</h4>
              <button
                onClick={() => removeCourse(course.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors self-end sm:self-auto"
                aria-label="Delete course"
                title="Delete course"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={course.title}
                  onChange={(e) => updateCourse(course.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Course title"
                  aria-label="Course title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                <input
                  type="text"
                  value={course.platform}
                  onChange={(e) => updateCourse(course.id, 'platform', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Platform name"
                  aria-label="Course platform"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={course.type}
                  onChange={(e) => updateCourse(course.id, 'type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  aria-label="Course type"
                >
                  <option value="">Select type</option>
                  {courseTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <input
                  type="text"
                  value={course.duration}
                  onChange={(e) => updateCourse(course.id, 'duration', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="40 hours"
                  aria-label="Course duration"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Completion Date</label>
                <input
                  type="text"
                  value={course.completionDate}
                  onChange={(e) => updateCourse(course.id, 'completionDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="January 2024"
                  aria-label="Completion date"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instructor</label>
                <input
                  type="text"
                  value={course.instructor}
                  onChange={(e) => updateCourse(course.id, 'instructor', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Instructor name"
                  aria-label="Course instructor"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
                <input
                  type="text"
                  value={course.grade}
                  onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="95%"
                  aria-label="Course grade"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Image URL</label>
                <input
                  type="url"
                  value={course.certificateImage}
                  onChange={(e) => updateCourse(course.id, 'certificateImage', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/certificate.jpg"
                  aria-label="Certificate image URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Certificate URL</label>
                <input
                  type="url"
                  value={course.certificateUrl}
                  onChange={(e) => updateCourse(course.id, 'certificateUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/certificate"
                  aria-label="Certificate URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course URL</label>
                <input
                  type="url"
                  value={course.courseUrl}
                  onChange={(e) => updateCourse(course.id, 'courseUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/course"
                  aria-label="Course URL"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={course.description}
                  onChange={(e) => updateCourse(course.id, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Course description"
                  aria-label="Course description"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills Gained (comma-separated)</label>
                <input
                  type="text"
                  value={course.skills?.join(', ') || ''}
                  onChange={(e) => updateCourse(course.id, 'skills', e.target.value.split(',').map(s => s.trim()))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="React, Node.js, MongoDB"
                  aria-label="Skills gained from course"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Research Editor Component
const ResearchEditor = ({ data, onChange }) => {
  const [research, setResearch] = useState(data || [])

  const addResearch = () => {
    const newResearch = {
      id: Date.now(),
      title: "Research Title",
      description: "Research description...",
      conference: "Conference Name",
      year: "2023",
      type: "Conference Paper",
      status: "Published",
      pdfUrl: "#",
      link: "#"
    }
    const updated = [...research, newResearch]
    setResearch(updated)
    onChange(updated)
  }

  const updateResearch = (id, field, value) => {
    const updated = research.map(res => 
      res.id === id ? { ...res, [field]: value } : res
    )
    setResearch(updated)
    onChange(updated)
  }

  const removeResearch = (id) => {
    const updated = research.filter(res => res.id !== id)
    setResearch(updated)
    onChange(updated)
  }

  const researchTypes = ["Conference Paper", "Journal Article", "Workshop", "Poster", "Thesis"]
  const statusTypes = ["Published", "Under Review", "In Progress", "Accepted"]

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 sm:mb-6">
        <h3 className="text-lg font-semibold">Research & Publications</h3>
        <button
          onClick={addResearch}
          className="flex items-center justify-center px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
          aria-label="Add new research"
        >
          <Plus className="w-4 h-4 mr-1 sm:mr-2" />
          Add Research
        </button>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {research.map((res, index) => (
          <div key={res.id} className="border border-gray-200 rounded-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
              <h4 className="text-lg font-semibold">Research {index + 1}</h4>
              <button
                onClick={() => removeResearch(res.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors self-end sm:self-auto"
                aria-label="Delete research"
                title="Delete research"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={res.title}
                  onChange={(e) => updateResearch(res.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Research title"
                  aria-label="Research title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Conference/Journal</label>
                <input
                  type="text"
                  value={res.conference}
                  onChange={(e) => updateResearch(res.id, 'conference', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Conference or journal name"
                  aria-label="Conference or journal name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <input
                  type="text"
                  value={res.year}
                  onChange={(e) => updateResearch(res.id, 'year', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="2023"
                  aria-label="Publication year"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={res.type}
                  onChange={(e) => updateResearch(res.id, 'type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  aria-label="Research type"
                >
                  <option value="">Select type</option>
                  {researchTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={res.status}
                  onChange={(e) => updateResearch(res.id, 'status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  aria-label="Research status"
                >
                  <option value="">Select status</option>
                  {statusTypes.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">PDF URL</label>
                <input
                  type="url"
                  value={res.pdfUrl}
                  onChange={(e) => updateResearch(res.id, 'pdfUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/research.pdf"
                  aria-label="PDF URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Link</label>
                <input
                  type="url"
                  value={res.link}
                  onChange={(e) => updateResearch(res.id, 'link', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/research"
                  aria-label="Research link"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={res.description}
                  onChange={(e) => updateResearch(res.id, 'description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Research description"
                  aria-label="Research description"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Competitions Editor Component
const CompetitionsEditor = ({ data, onChange }) => {
  const [competitions, setCompetitions] = useState(data || [])

  const addCompetition = () => {
    const newCompetition = {
      id: Date.now(),
      title: "Competition Title",
      description: "Competition description...",
      organizer: "Organizer Name",
      date: "March 2023",
      position: "1st Place",
      certificateUrl: "#",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop"
    }
    const updated = [...competitions, newCompetition]
    setCompetitions(updated)
    onChange(updated)
  }

  const updateCompetition = (id, field, value) => {
    const updated = competitions.map(comp => 
      comp.id === id ? { ...comp, [field]: value } : comp
    )
    setCompetitions(updated)
    onChange(updated)
  }

  const removeCompetition = (id) => {
    const updated = competitions.filter(comp => comp.id !== id)
    setCompetitions(updated)
    onChange(updated)
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 sm:mb-6">
        <h3 className="text-lg font-semibold">Competitions</h3>
        <button
          onClick={addCompetition}
          className="flex items-center justify-center px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
          aria-label="Add new competition"
        >
          <Plus className="w-4 h-4 mr-1 sm:mr-2" />
          Add Competition
        </button>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {competitions.map((comp, index) => (
          <div key={comp.id} className="border border-gray-200 rounded-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
              <h4 className="text-lg font-semibold">Competition {index + 1}</h4>
              <button
                onClick={() => removeCompetition(comp.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors self-end sm:self-auto"
                aria-label="Delete competition"
                title="Delete competition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={comp.title}
                  onChange={(e) => updateCompetition(comp.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Competition title"
                  aria-label="Competition title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organizer</label>
                <input
                  type="text"
                  value={comp.organizer}
                  onChange={(e) => updateCompetition(comp.id, 'organizer', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Organizer name"
                  aria-label="Competition organizer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="text"
                  value={comp.date}
                  onChange={(e) => updateCompetition(comp.id, 'date', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="March 2023"
                  aria-label="Competition date"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position/Award</label>
                <input
                  type="text"
                  value={comp.position}
                  onChange={(e) => updateCompetition(comp.id, 'position', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="1st Place"
                  aria-label="Competition position or award"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Certificate URL</label>
                <input
                  type="url"
                  value={comp.certificateUrl}
                  onChange={(e) => updateCompetition(comp.id, 'certificateUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/certificate"
                  aria-label="Certificate URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  value={comp.image}
                  onChange={(e) => updateCompetition(comp.id, 'image', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                  aria-label="Competition image URL"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={comp.description}
                  onChange={(e) => updateCompetition(comp.id, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Competition description"
                  aria-label="Competition description"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Admin