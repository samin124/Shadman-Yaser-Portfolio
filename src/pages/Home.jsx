import React from 'react'
import { useApp } from '../context/AppContext'
import Hero from '../components/Sections/Hero'
import About from '../components/Sections/About'
import Skills from '../components/Sections/Skills'
import Projects from '../components/Sections/Projects'
import Experience from '../components/Sections/Experience'
import Education from '../components/Sections/Education'
import Courses from '../components/Sections/Courses'
import Research from '../components/Sections/Research'
import Competitions from '../components/Sections/Competitions'
import Contact from '../components/Sections/Contact'

const Home = () => {
  const { state } = useApp()

  // Show loading state
  if (state.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (state.error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error loading portfolio data</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  // Show nothing if no data
  if (!state.portfolioData) {
    return null
  }

  return (
    <div>
      <section id="home">
        <Hero data={state.portfolioData.about} />
      </section>
      
      <section id="about">
        <About data={state.portfolioData.about} />
      </section>
      
      <section id="education">
        <Education data={state.portfolioData.education} />
      </section>

      <section id="skills">
        <Skills data={state.portfolioData.skills} />
      </section>
      
      <section id="projects">
        <Projects data={state.portfolioData.projects} />
      </section>
      
      <section id="experience">
        <Experience data={state.portfolioData.experience} />
      </section>
      
      <section id="courses">
        <Courses data={state.portfolioData.courses} />
      </section>
      
      <section id="research">
        <Research data={state.portfolioData.research} />
      </section>
      
      <section id="competitions">
        <Competitions data={state.portfolioData.competitions} />
      </section>
      
      <section id="contact">
        <Contact data={state.portfolioData.contact} />
      </section>
    </div>
  )
}

export default Home