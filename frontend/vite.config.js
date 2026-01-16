// Importing the necessary modules 
import path from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  resolve: {
    alias: {
      // Maps "@components" to your actual folder path
      '@components': path.resolve(__dirname, './src/Components'),
      '@images': path.resolve(__dirname, './src/Images'),
    },
  },
})
