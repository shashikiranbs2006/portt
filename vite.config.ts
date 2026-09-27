import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Ignore binary assets in both raw/ and public/ to prevent EBUSY crashes
      ignored: [
        `${import.meta.dirname}/raw/**`,
        `${import.meta.dirname}/public/*.mp3`,
        `${import.meta.dirname}/public/*.jpg`,
        `${import.meta.dirname}/public/*.jpeg`,
        `${import.meta.dirname}/public/*.png`,
        `${import.meta.dirname}/public/*.gif`,
        `${import.meta.dirname}/public/*.webp`,
        `${import.meta.dirname}/public/*.pdf`,
      ]
    }
  }
})
