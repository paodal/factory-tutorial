import path from "path"
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Factory Starter App',
        short_name: 'FactoryApp',
        description: 'A Factory Starter App with React and PWA support',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        start_url: '/',
        orientation: 'portrait',
        categories: ['productivity', 'utilities']
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // Vite server options
  server: {
    port: 1420,
    // Listen on all addresses to allow connections from mobile devices
    host: '0.0.0.0',
  },
  
  // Build configuration
  build: {
    // Output directory for the build
    outDir: 'dist',
    // Generate sourcemaps for better debugging
    sourcemap: true,
    // Target modern browsers
    target: 'es2021',
    // Minify the output for production
    minify: true,
    // Empty the output directory before building
    emptyOutDir: true,
  },
  
  // Optimize dependencies
  optimizeDeps: {
    // Include dependencies that need optimization
    include: ['react', 'react-dom'],
  },
});
