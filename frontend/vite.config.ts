import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  plugins: [react()],
  // scss support for vite
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/scss/utilities/_variables.scss";`,
      },
    },
  },
});
