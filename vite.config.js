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
      '/api/eco-pf': {
        target: 'https://ensiladores.com.ar/InfoSocios',
        changeOrigin: true,
        rewrite: (path) => {
          const newPath = path.replace(/^\/api\/eco-pf/, '/API_EcoPF.php');
          console.log('🔄 Proxy Eco PF - Transformando:', path, '→', newPath);
          return newPath;
        },
      },
      '/api/eco-cs': {
        target: 'https://ensiladores.com.ar/InfoSocios',
        changeOrigin: true,
        rewrite: (path) => {
          const newPath = path.replace(/^\/api\/eco-cs/, '/API_EcoCS.php');
          console.log('🔄 Proxy Eco CS - Transformando:', path, '→', newPath);
          return newPath;
        },
      },
    },
  },
})