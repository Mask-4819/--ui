import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@--ui': fileURLToPath(
        new URL('./packages/src/index.ts', import.meta.url)
      )
    }
  },
  optimizeDeps: {
    // include: ["**/gulpfile.js"]
  }
})
