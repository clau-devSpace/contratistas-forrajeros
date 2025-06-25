import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/socios': {
        target: 'https://ensiladores.com.ar/WebNEW/public/data/API_Socios.php',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/socios/, ''),
      },
    },
  },
})