import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt", // Prompt para atualizações
      injectRegister: "auto",
      workbox: {
        skipWaiting: true, // Aplicar atualizações imediatamente
        clientsClaim: true, // Assumir controle dos clientes
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api.example.com\/.*$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24, // 1 dia
              },
            },
          },
        ],
      },
    }),
  ],
  server: {
    https: true,
  },
});
