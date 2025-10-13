import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { LogOut, Save, Plus, Trash2 } from 'lucide-react'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('about')

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-600">Manage your portfolio content</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex space-x-4 overflow-x-auto">
              {['about', 'projects', 'skills', 'experience', 'education', 'research', 'competitions'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg font-medium capitalize whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  } transition-colors`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 capitalize">
                {activeTab}
              </h2>
              <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                <Plus className="w-4 h-4 mr-2" />
                Add New
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600 text-center py-8">
                Admin panel for managing {activeTab} content. 
                This is where you can add, edit, or remove items from your portfolio.
              </p>
              
              {/* Example form for About section */}
              {activeTab === 'about' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Your Title"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Your description"
                    />
                  </div>
                  
                  <button className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminDashboard