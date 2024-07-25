const VERSION = "1.0.1"; // Atualize esta versão para cada nova atualização

importScripts(
  "https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js"
);

// Inicialize o Firebase no service worker
firebase.initializeApp({
  apiKey: "AIzaSyAQLATcqtrCoC4EVD9qtMTHL7Q1eqcjopo",
  authDomain: "operarios-626c5.firebaseapp.com",
  projectId: "operarios-626c5",
  storageBucket: "operarios-626c5.appspot.com",
  messagingSenderId: "657283109041",
  appId: "1:657283109041:web:3a999c47a6dd2efa4b5290",
  measurementId: "G-B1CMDEB3M5",
});

const messaging = firebase.messaging();

// Handler para mensagens em segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);

  // Verifica se o payload tem as propriedades corretas
  const notificationTitle = payload.data.title || "Notificação sem título";
  const notificationOptions = {
    body: payload.data.body || "Sem corpo de notificação.",
    icon: payload.data.icon || "/firebase-logo.png", // Ícone padrão se não especificado
    data: {
      click_action:
        payload.data.click_action ||
        "https://operarios-react.vercel.app/calendar", // URL padrão
    },
  };

  // Exibe a notificação
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handler para cliques na notificação
self.addEventListener("notificationclick", function (event) {
  console.log("Notification click received: ", event.notification.data);

  // Fecha a notificação ao clicar nela
  event.notification.close();

  const clickAction = event.notification.data.click_action;

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        for (let i = 0; i < windowClients.length; i++) {
          const client = windowClients[i];

          // Se a janela já está aberta e a URL bate com clickAction, então foca nela
          if (client.url.includes(clickAction) && "focus" in client) {
            return client.focus();
          }
        }

        // Caso contrário, abre uma nova janela com a URL de clickAction
        if (clients.openWindow) {
          return clients.openWindow(clickAction);
        }
      })
  );
});

// // Controla atualizações do Service Worker manualmente
// self.addEventListener("install", (event) => {
//   // Skip waiting para ativar imediatamente
//   self.skipWaiting();
//   console.log("Service Worker instalado");
// });

// self.addEventListener("activate", (event) => {
//   console.log("Service Worker ativado");
//   // Assume o controle de todos os clientes imediatamente
//   return self.clients.claim();
// });
