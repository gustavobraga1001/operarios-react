import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAQLATcqtrCoC4EVD9qtMTHL7Q1eqcjopo",
  authDomain: "operarios-626c5.firebaseapp.com",
  projectId: "operarios-626c5",
  storageBucket: "operarios-626c5.appspot.com",
  messagingSenderId: "657283109041",
  appId: "1:657283109041:web:3a999c47a6dd2efa4b5290",
  measurementId: "G-B1CMDEB3M5",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey:
      "BMuJvknRnFOl3ugMAg9DsSCF9UIxME6fFARGACsuWB2sbLEB6ieKwhEuap-tJ07jHejbVvvTMDjjl-amq7fCblQ",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        // Perform any other necessary action with the token
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

// Listener para mensagens em primeiro plano
export const onMessageListener = () =>
  new Promise((resolve, reject) => {
    onMessage(messaging, (payload) => {
      console.log("Mensagem recebida em primeiro plano: ", payload);
      if (payload) {
        resolve(payload);
      } else {
        reject("Payload sem notificação");
      }
    });
  });
