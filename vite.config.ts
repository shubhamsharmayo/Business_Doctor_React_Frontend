import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import tailwindcss from "@tailwindcss/vite"
import path from "path"

export default defineConfig({
  plugins: [react()],
  base:"/",
   build: {
    chunkSizeWarningLimit: 1000, // kB
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // ✅ No need for historyApiFallback
    port: 5173, // optional
    allowedHosts: true,
  }
})
