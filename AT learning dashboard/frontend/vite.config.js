// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  appType: 'spa',
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      // Proxy to Learning Dashboard backend
      '/api/auth': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
      '/api/discussions': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
      '/api/analytics': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
      // Proxy to Admin Dashboard backend for videos
      '/api/videos': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
});
