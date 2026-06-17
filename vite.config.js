import { defineConfig } from 'vite'

export default defineConfig({
  // Phase 2: src/ becomes the project root; Vite builds into dist/
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
})
