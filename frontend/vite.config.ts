import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  // scss support for vite
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/scss/utilities/_variables.scss";`,
      },
    },
  },
});
