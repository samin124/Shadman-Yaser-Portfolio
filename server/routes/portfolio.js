import express from 'express'
import fs from 'fs/promises'
import path from 'path'

const router = express.Router()
const dataFile = path.join(process.cwd(), 'data', 'portfolio.json')

// Helper function to read data
async function readData() {
  try {
    const data = await fs.readFile(dataFile, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    // Return default data if file doesn't exist
    return {
      about: {
        name: "Your Name",
        title: "Full Stack Developer",
        description: "Passionate developer creating amazing web experiences",
        image: "/assets/images/profile.jpg",
        email: "your.email@example.com",
        github: "https://github.com/yourusername",
        linkedin: "https://linkedin.com/in/yourusername"
      },
      projects: [],
      skills: [],
      experience: [],
      education: [],
      research: [],
      competitions: [],
      contact: {
        email: "your.email@example.com",
        phone: "+1234567890",
        location: "Your City, Country"
      }
    }
  }
}

// Get all portfolio data
router.get('/', async (req, res) => {
  try {
    const data = await readData()
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to load portfolio data' })
  }
})

// Get specific section
router.get('/:section', async (req, res) => {
  try {
    const data = await readData()
    const section = req.params.section
    
    if (data[section]) {
      res.json(data[section])
    } else {
      res.status(404).json({ error: 'Section not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to load section data' })
  }
})

export default router