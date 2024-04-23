import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgLoader from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgLoader()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "src/assets/styles/variables";`,
      },
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
})
