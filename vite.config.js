import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer'; // For analyzing bundle size

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }), // Automatically opens a bundle analysis report
  ],
  build: {
    outDir: 'dist', // Ensure this matches your Vercel deployment config
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Create a separate chunk for node_modules
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit to 1000 kB
  },
});
