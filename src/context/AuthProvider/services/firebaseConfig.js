// firebaseConfig.js

import { initializeApp } from "firebase/app";
import {
  deleteToken,
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";

// Suas configurações do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAQLATcqtrCoC4EVD9qtMTHL7Q1eqcjopo",
  authDomain: "operarios-626c5.firebaseapp.com",
  projectId: "operarios-626c5",
  storageBucket: "operarios-626c5.appspot.com",
  messagingSenderId: "657283109041",
  appId: "1:657283109041:web:3a999c47a6dd2efa4b5290",
  measurementId: "G-B1CMDEB3M5",
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

let messaging;

(async () => {
  const supported = await isSupported();
  if (supported) {
    messaging = getMessaging(app);
  } else {
    console.warn("Firebase Messaging não é suportado neste navegador.");
  }
})();

// Função para garantir que o Service Worker está ativo antes de obter o token
async function ensureServiceWorkerActive() {
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.ready;
    console.log("Service Worker está ativo:", registration);
    return registration;
  } else {
    throw new Error("Service Worker não é suportado neste navegador.");
  }
}

// Função para solicitar permissão de notificação
export const requestForToken = async () => {
  try {
    const registration = await ensureServiceWorkerActive();

    if (Notification.permission === "granted") {
      const currentToken = await getToken(messaging, {
        vapidKey:
          "BMuJvknRnFOl3ugMAg9DsSCF9UIxME6fFARGACsuWB2sbLEB6ieKwhEuap-tJ07jHejbVvvTMDjjl-amq7fCblQ",
        serviceWorkerRegistration: registration,
      });

      if (currentToken) {
        console.log("Token de notificação recebido:", currentToken);
        return { option: true, currentToken };
      } else {
        console.warn("Nenhum token disponível.");
        return { option: false };
      }
    } else if (Notification.permission === "default") {
      const permissionResult = await Notification.requestPermission();
      if (permissionResult === "granted") {
        const currentToken = await getToken(messaging, {
          vapidKey:
            "BMuJvknRnFOl3ugMAg9DsSCF9UIxME6fFARGACsuWB2sbLEB6ieKwhEuap-tJ07jHejbVvvTMDjjl-amq7fCblQ",
          serviceWorkerRegistration: registration,
        });

        if (currentToken) {
          console.log("Token de notificação recebido:", currentToken);
          return { option: true, currentToken };
        } else {
          console.warn("Nenhum token disponível após permissão.");
          return { option: false };
        }
      } else {
        console.warn("Permissão de notificação negada.");
        return { option: false };
      }
    } else {
      console.warn("Permissão de notificação foi bloqueada.");
      return { option: false };
    }
  } catch (err) {
    console.error("Erro ao obter o token de notificação:", err);
    throw err;
  }
};

// Função para cancelar inscrição das notificações
export const unsubscribeFromNotifications = async () => {
  try {
    const currentToken = await getToken(messaging);
    if (currentToken) {
      await deleteToken(messaging, currentToken);
      console.log("Token de notificação deletado com sucesso.");
      return currentToken;
    } else {
      console.log("Nenhum token encontrado para deletar.");
      return null;
    }
  } catch (err) {
    if (
      err.code === "messaging/token-unsubscribe-failed" &&
      err.message.includes("Requested entity was not found")
    ) {
      console.warn(
        "Token não encontrado. Pode já ter sido deletado ou é inválido."
      );
    } else {
      console.error("Erro ao deletar o token.", err);
    }
  }
};

// Listener para mensagens em primeiro plano
export const onMessageListener = () =>
  new Promise((resolve) => {
    if (messaging) {
      onMessage(messaging, (payload) => {
        console.log(
          "Mensagem recebida enquanto o app está em primeiro plano:",
          payload
        );
        resolve(payload);
      });
    }
  });
