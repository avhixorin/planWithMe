import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      manifest: {
        name: "Weekendly - Weekend Planner",
        short_name: "Weekendly",
        description: "An app to help you plan the perfect weekend.",
        theme_color: "#0d9488",
        background_color: "#f8fafc",
        icons: [
          {
            src: "weekendly.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "weekendly.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
