import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000,
    proxy: {
      '/api/': 'https://exerstore.onrender.com',
      '/uploads/': 'https://exerstore.onrender.com',
    },
  },

  build: {
    chunkSizeWarningLimit: 1500,
  },
});
