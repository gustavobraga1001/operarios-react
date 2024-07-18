// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import { VitePWA } from "vite-plugin-pwa";
// import { manifestForPlugIn } from "./manifest";
// import mkcert from "vite-plugin-mkcert";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), VitePWA(manifestForPlugIn), mkcert()],
// });


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { manifestForPlugIn } from "./manifest";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
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
    https: true, // Ativa HTTPS para o servidor de desenvolvimento
  },
  plugins: [react(), VitePWA(manifestForPlugIn), mkcert()],
});
