// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Usa puerto 3000 para coincidir con CORS del backend
    host: true, // Permite conexiones externas
  },
});
