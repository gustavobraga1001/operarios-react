// firebaseConfig.js

import { initializeApp } from "firebase/app";
import {
  deleteToken,
  getMessaging,
  getToken,
  onMessage,
} from "firebase/messaging";

// Suas configurações Firebase
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

// Inicialize o Firebase Messaging
const messaging = getMessaging(app);

// async function ensureServiceWorkerActive() {
//   if ("serviceWorker" in navigator) {
//     const registration = await navigator.serviceWorker.register(
//       "/firebase-messaging-sw.js"
//     ); // Certifique-se de que o caminho esteja correto
//     await navigator.serviceWorker.ready; // Espera até que o Service Worker esteja ativo
//     console.log("Service Worker registrado:", registration);
//     return registration;
//   } else {
//     throw new Error("Service Worker não é suportado neste navegador.");
//   }
// }

export const requestForToken = async () => {
  try {
    // const registration = await ensureServiceWorkerActive();

    // Obtém o token de notificação
    const currentToken = await getToken(messaging, {
      vapidKey:
        "BMuJvknRnFOl3ugMAg9DsSCF9UIxME6fFARGACsuWB2sbLEB6ieKwhEuap-tJ07jHejbVvvTMDjjl-amq7fCblQ",
      // serviceWorkerRegistration: registration,
    });

    if (currentToken) {
      console.log("Token recebido:", currentToken);
      return { option: true, currentToken };
    } else {
      console.log("Nenhum token disponível. Solicite permissão para gerar um.");
      return { option: false };
    }
  } catch (err) {
    console.error("Erro ao obter o token:", err);
    throw err;
  }
};

export const unsubscribeFromNotifications = async () => {
  try {
    const currentToken = await getToken(messaging);
    if (currentToken) {
      await deleteToken(messaging, currentToken);
      console.log("Token deletado com sucesso.");
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

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log(
        "Mensagem recebida enquanto o app está em primeiro plano:",
        payload
      );
      resolve(payload);
    });
  });
