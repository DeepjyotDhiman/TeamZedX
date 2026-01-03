// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({ 
      registerType: 'autoUpdate',
      manifest: {
        name: 'Dayflow HRMS',
        short_name: 'Dayflow',
        theme_color: '#ffffff',
        icons: [ /* ...add your icons here... */ ]
      }
    })
  ]
})