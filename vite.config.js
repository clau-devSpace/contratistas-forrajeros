import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/socios-detalle': {
        target: 'https://ensiladores.com.ar/InfoSocios',
        changeOrigin: true,
        rewrite: (path) => {
          // Transformar /api/socios-detalle/57 → /API_Socios_Detalle.php/57
          const newPath = path.replace(/^\/api\/socios-detalle/, '/API_Socios_Detalle.php');
          console.log('🔄 Proxy detalle - Transformando:', path, '→', newPath);
          return newPath;
        },
      },
      '/api/socios': {
        target: 'https://ensiladores.com.ar/InfoSocios/API_Socios.php/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/socios/, ''),
      },
    },
  },
})