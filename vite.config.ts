import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries
          vendor: ["react", "react-dom"],

          // Routing
          router: ["react-router-dom"],

          // UI and animations
          ui: ["framer-motion", "lucide-react"],

          // Content processing
          content: ["gray-matter", "marked"],

          // Radix UI components
          radix: [
            "@radix-ui/react-avatar",
            "@radix-ui/react-dialog",
            "@radix-ui/react-select",
            "@radix-ui/react-separator",
            "@radix-ui/react-slot",
            "@radix-ui/react-switch",
          ],

          // Utility libraries
          utils: ["clsx", "tailwind-merge", "class-variance-authority"],
        },

        // Optimize chunk names
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
          if (facadeModuleId) {
            if (facadeModuleId.includes("pages")) {
              return "assets/pages/[name]-[hash].js"
            }
            if (facadeModuleId.includes("components")) {
              return "assets/components/[name]-[hash].js"
            }
          }
          return "assets/[name]-[hash].js"
        },

        // Optimize asset names
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "assets/css/[name]-[hash][extname]"
          }
          return "assets/[name]-[hash][extname]"
        },
      },
    },
    target: "es2015",
    minify: "terser",
    sourcemap: false,

    // Optimize build performance
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },

    // Set chunk size warning limit
    chunkSizeWarningLimit: 1000,

    // Enable CSS code splitting
    cssCodeSplit: true,
  },
  server: {
    port: 3000,
    open: true,
  },
})
