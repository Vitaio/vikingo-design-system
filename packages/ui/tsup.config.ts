import { defineConfig } from 'tsup'
import { copyFileSync, mkdirSync } from 'fs'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  treeshake: true,
  outDir: 'dist',
  async onSuccess() {
    // Copy CSS files to dist so consumers can import '@vikingo/ui/styles'
    mkdirSync('dist', { recursive: true })
    copyFileSync('src/styles/globals.css', 'dist/globals.css')
    copyFileSync('src/styles/fonts.css', 'dist/fonts.css')
    console.log('✓ CSS files copied to dist/')
  },
})
