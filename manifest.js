export const manifestForPlugIn = {
  manifest: {
    name: "Operários",
    short_name: "Operários",
    description: "Aplicação para operários e líderes da Igreja Bom Pastor",
    icons: [
      {
        src: "/android-chrome-192x192.jng",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.jng",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-touch-icon.jng",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/maskable_icon.jng",
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
  workbox: {
    skipWaiting: true,
    clientsClaim: true,
    runtimeCaching: [
      {
        urlPattern: ({ request }) => request.mode === "navigate",
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
        urlPattern: /^https:\/\/api\.example\.com\/.*$/, // Substitua pela URL real da sua API
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
  registerType: "prompt",
  injectRegister: "auto",
};
