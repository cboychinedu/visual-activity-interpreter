// Importing the necessary modules 
import path from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    // basicSsl()
  ],
  resolve: {
    alias: {
      // Maps "@components" to your actual folder path
      '@components': path.resolve(__dirname, './src/Components'),
      '@images': path.resolve(__dirname, './src/Images'),
    },
  },
  // --- ADDED SOLUTION BELOW ---
  server: {
    // host: true, 
    // https: true,
    watch: {
      // Forces Vite to check for file changes every 100ms
      // Essential for WSL2, Docker, or networked drives
      usePolling: true,
    },
    // Optional: ensures HMR (Hot Module Replacement) uses the correct protocol
    hmr: {
      overlay: true, // Shows error overlay in browser
    }
  },
})