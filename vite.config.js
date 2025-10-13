import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    allowedHosts: [
      'shadman-yaser-portfolio.onrender.com',
      'localhost',
      '127.0.0.1'
    ]
  }
})