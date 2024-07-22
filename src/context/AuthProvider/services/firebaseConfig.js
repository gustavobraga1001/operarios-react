import { initializeApp } from "firebase/app";
import {
  getMessaging,
  onMessage,
  getToken,
  deleteToken,
} from "firebase/messaging";
import Api from "./api";

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

export const requestForToken = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey:
        "BMuJvknRnFOl3ugMAg9DsSCF9UIxME6fFARGACsuWB2sbLEB6ieKwhEuap-tJ07jHejbVvvTMDjjl-amq7fCblQ",
    });
    if (token) {
      console.log("Token retrieved: ", token);
      return { option: true, token };
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
      return false;
    }
  } catch (err) {
    console.error("An error occurred while retrieving token. ", err);
    return false;
  }
};
// export const requestForToken = async (callback) => {
//   try {
//     const token = await getToken(messaging, {
//       vapidKey:
//         "BMuJvknRnFOl3ugMAg9DsSCF9UIxME6fFARGACsuWB2sbLEB6ieKwhEuap-tJ07jHejbVvvTMDjjl-amq7fCblQ",
//     });

//     if (token) {
//       console.log("Notification token:", token);
//       if (callback) callback(token);
//     } else {
//       console.log(
//         "No registration token available. Request permission to generate one."
//       );
//     }

//     return token;
//   } catch (error) {
//     console.error("Error generating token:", error);
//   }
// };

export const unsubscribeFromNotifications = async () => {
  try {
    const currentToken = await getToken(messaging);
    if (currentToken) {
      await deleteToken(messaging, currentToken);
      return currentToken;
    } else {
      console.log("No token found to delete.");
    }
  } catch (err) {
    if (
      err.code === "messaging/token-unsubscribe-failed" &&
      err.message.includes("Requested entity was not found")
    ) {
      console.warn(
        "Token not found. It might have been already deleted or invalid."
      );
    } else {
      console.error("An error occurred while deleting token. ", err);
    }
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      resolve(payload);
    });
  });
