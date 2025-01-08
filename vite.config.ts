import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Cargar las variables de entorno basadas en el modo (development, production, etc.)
  const env = loadEnv(mode, process.cwd(), "REACT_APP_");

  return {
    server: {
      host: "::",
      port: 8000,
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      // Exponer las variables de entorno al cliente
      "process.env": env,
    },
  };
});
