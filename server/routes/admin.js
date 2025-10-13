import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import fs from 'fs/promises'
import path from 'path'

const router = express.Router()
const dataFile = path.join(process.cwd(), 'data', 'portfolio.json')

// Admin credentials (in production, use environment variables)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@portfolio.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// Helper function to read data
async function readData() {
  try {
    const data = await fs.readFile(dataFile, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    return {}
  }
}

// Helper function to write data
async function writeData(data) {
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2))
}

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '24h' })
      res.json({ success: true, token })
    } else {
      res.status(401).json({ error: 'Invalid credentials' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed' })
  }
})

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

// Update portfolio data
router.put('/update', verifyToken, async (req, res) => {
  try {
    const { section, data } = req.body
    const portfolioData = await readData()
    
    portfolioData[section] = data
    await writeData(portfolioData)
    
    res.json({ success: true, message: 'Data updated successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to update data' })
  }
})

export default router