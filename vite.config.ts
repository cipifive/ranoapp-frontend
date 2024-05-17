import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  VitePWA({ 
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Ranoapp Game',
        short_name: 'Ranoapp',
        theme_color: '#100235',
        icons: [
            {
                src: 'ranoapp.png',
                sizes: '64x64',
                type: 'image/png'
            },
            {
                src: 'ranoapp.png',
                sizes: '192x192',
                type: 'image/png'
            },
            {
                src: 'ranoapp.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: 'ranoapp.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable'
            }
        ],
      }, 
    })],
  
})
