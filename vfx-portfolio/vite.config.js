import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',

  build: {
    // Raise the warning threshold slightly (default 500kb is very conservative)
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // Split vendor code into a separate chunk — cached separately by the browser
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
})
