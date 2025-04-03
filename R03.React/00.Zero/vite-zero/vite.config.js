import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        historyApiFallback: true, // Asegura que las rutas sean manejadas por React Router
    },
});
