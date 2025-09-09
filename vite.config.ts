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
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          ui: ["framer-motion", "lucide-react"],
          content: ["gray-matter", "marked"],
        },
      },
    },
    target: "es2015",
    minify: "terser",
    sourcemap: false,
  },
  server: {
    port: 3000,
    open: true,
  },
})
