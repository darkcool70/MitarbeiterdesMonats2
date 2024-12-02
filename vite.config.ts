import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  publicDir: 'frames', // Frames-Ordner als statischen Ordner festlegen
  publicDir: 'public', // Frames-Ordner als statischen Ordner festlegen
});
