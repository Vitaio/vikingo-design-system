import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      // In dev/Storybook, use source CSS directly (avoids dist font path issues)
      '@vikingo/ui/styles': resolve(__dirname, '../../packages/ui/src/styles/globals.css'),
      '@vikingo/ui/fonts': resolve(__dirname, '../../packages/ui/src/styles/fonts.css'),
    },
  },
})
