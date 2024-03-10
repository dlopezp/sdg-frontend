import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/sdg-frontend/',
  test : {
    environment: 'happy-dom'
  }
})
