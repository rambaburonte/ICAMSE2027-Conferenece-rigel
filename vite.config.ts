import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Use relative paths for assets
  build: {
    assetsInlineLimit: 0, // Don't inline assets, keep them as separate files
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      }
    }
  },
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.webp']
})
