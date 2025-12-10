import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/DocIntelliHub/',
  build: {
    outDir: '../docs',
    emptyDir: true
  }
})
