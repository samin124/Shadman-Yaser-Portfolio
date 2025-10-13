import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')))
app.use('/assets', express.static(path.join(__dirname, '../public/assets')))

// Simple portfolio API endpoint
app.get('/api/portfolio', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, '../data/portfolio.json'), 'utf8')
    const portfolioData = JSON.parse(data)
    res.json(portfolioData)
  } catch (error) {
    console.error('Error reading portfolio data:', error)
    res.status(500).json({ error: 'Failed to load portfolio data' })
  }
})

// Simple contact form endpoint
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, subject, message } = req.body
    console.log('Contact form submission:', { name, email, subject, message })
    
    // In a real application, you would send an email here
    // For now, we'll just log it and return success
    
    res.json({ 
      success: true, 
      message: 'Message received! I will get back to you soon.' 
    })
  } catch (error) {
    console.error('Contact form error:', error)
    res.status(500).json({ error: 'Failed to process contact form' })
  }
})

// Simple admin login endpoint
app.post('/api/admin/login', (req, res) => {
  try {
    const { email, password } = req.body
    
    // Simple hardcoded credentials for demo
    // In production, use proper authentication
    if (email === 'admin@portfolio.com' && password === 'admin123') {
      res.json({ 
        success: true, 
        token: 'demo-token-12345',
        message: 'Login successful' 
      })
    } else {
      res.status(401).json({ error: 'Invalid credentials' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed' })
  }
})

// For development: Serve React app in development mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
  })
}

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`API available at http://localhost:${PORT}/api/portfolio`)
})