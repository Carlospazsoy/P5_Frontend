import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import instance from './src/api'

// https://vitejs.dev/config/
export default defineConfig({ 
  plugins: [react()],
  // base: '/P5_Frontend'
})
