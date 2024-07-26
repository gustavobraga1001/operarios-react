export const manifestForPlugIn = {
  // Manifesto PWA
  manifest: {
    name: "Operários",
    short_name: "Operários",
    description: "Aplicação para operários e líderes da Igreja Bom Pastor",
    icons: [
      {
        src: "/android-chrome-192x192.png", // Ajustado para PNG
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png", // Ajustado para PNG
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-touch-icon.png", // Ajustado para PNG
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/maskable_icon.png", // Ajustado para PNG
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    theme_color: "#000000",
    background_color: "#000000",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },

  // Configurações do Workbox
  workbox: {
    skipWaiting: true, // Aplicar atualizações imediatamente
    clientsClaim: true, // Assumir controle dos clientes
    runtimeCaching: [
      {
        urlPattern: ({ request }) => request.mode === "navigate", // Cache de navegação
        handler: "NetworkFirst",
        options: {
          cacheName: "pages-cache",
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24, // 1 dia
          },
        },
      },
      {
        urlPattern: /^https:\/\/api\.example\.com\/.*$/, // Cache para requisições de API
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

  // Configuração de registro do Service Worker
  registerType: "prompt", // Prompt para atualizações
  injectRegister: "auto",
};
