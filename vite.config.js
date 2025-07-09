// vite.config.js
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Usa puerto 3000 para coincidir con CORS del backend
    host: true, // Permite conexiones externas
  },
});
