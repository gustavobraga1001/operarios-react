import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import mkcert from "vite-plugin-mkcert";
import manifestForPlugIn from "./manifest";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://192.168.11.239:8080",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    https: true,
  },
  plugins: [react(), VitePWA(manifestForPlugIn), mkcert()],
});
