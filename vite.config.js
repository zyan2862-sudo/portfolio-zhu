import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  build: {
    outDir: 'dist/lanyard',
    emptyOutDir: true,
    rollupOptions: {
      input: 'react-lanyard/main.jsx',
      output: {
        entryFileNames: 'lanyard.js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: assetInfo =>
          assetInfo.name?.endsWith('.css')
            ? 'lanyard.css'
            : 'assets/[name]-[hash][extname]'
      }
    }
  }
});
