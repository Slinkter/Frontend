import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      // Include .js and .jsx files
      jsxImportSource: 'react',
      babel: {
        presets: ['@babel/preset-react'],
      },
    }),
  ],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
  },
  base: './',
})