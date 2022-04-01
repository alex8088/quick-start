import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    build: {
      rollupOptions: {
        external: ['@electron-toolkit/utils']
      }
    }
  },
  preload: {
    build: {
      rollupOptions: {
        external: ['@electron-toolkit/preload']
      }
    }
  },
  renderer: {
    plugins: [react()]
  }
})
