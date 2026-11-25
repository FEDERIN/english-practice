import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(function ({ mode }) {
  var env = loadEnv(mode, process.cwd(), '')
  return {
    base: './',
    plugins: [react()],
    define: {
      __VOICERSS_KEY__: JSON.stringify(env.VOICERSS_KEY || ''),
    },
    build: {
      target: 'safari12',
      cssTarget: 'safari12',
      outDir: 'dist',
    },
  }
})
