import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'safari12',
    cssTarget: 'safari12',
    outDir: 'dist',
  },
})
