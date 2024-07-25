// firebase-messaging-sw.js

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

self.addEventListener("install", (event) => {
  console.log("Service Worker instalado");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker ativado");
  return self.clients.claim();
});

messaging.onBackgroundMessage((payload) => {
  console.log("Mensagem em segundo plano recebida: ", payload);

  const notificationTitle = payload.data.title || "Notificação sem título";
  const notificationOptions = {
    body: payload.data.body || "Sem corpo de notificação.",
    icon: payload.data.icon || "/firebase-logo.png",
    data: {
      click_action:
        payload.data.click_action ||
        "https://operarios-react.vercel.app/calendar",
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  console.log("Clique na notificação recebido: ", event.notification.data);

  event.notification.close();

  const clickAction = event.notification.data.click_action;

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        for (let i = 0; i < windowClients.length; i++) {
          const client = windowClients[i];
          if (client.url.includes(clickAction) && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(clickAction);
        }
      })
  );
});
