import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    fs: {
      // Allow Vite dev server to serve files from the monorepo root
      // (needed for packages/ui/assets/fonts/* and assets/*.svg)
      allow: ['../..'],
    },
  },
  resolve: {
    alias: [
      // Specifikus subpath alias-ok az általános elé kell kerüljenek
      {
        find: '@vikingo/ui/styles',
        replacement: resolve(__dirname, '../../packages/ui/src/styles/globals.css'),
      },
      {
        find: '@vikingo/ui/fonts',
        replacement: resolve(__dirname, '../../packages/ui/src/styles/fonts.css'),
      },
      // TypeScript forrás közvetlen használata — elkerüli a dist externalization
      // hibákat (recharts és más jövőbeli @vikingo/ui függőségek esetén)
      {
        find: '@vikingo/ui',
        replacement: resolve(__dirname, '../../packages/ui/src/index.ts'),
      },
    ],
  },
})
