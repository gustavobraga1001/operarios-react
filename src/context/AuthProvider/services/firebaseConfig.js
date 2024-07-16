// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAQLATcqtrCoC4EVD9qtMTHL7Q1eqcjopo",
  authDomain: "operarios-626c5.firebaseapp.com",
  projectId: "operarios-626c5",
  storageBucket: "operarios-626c5.appspot.com",
  messagingSenderId: "657283109041",
  appId: "1:657283109041:web:3a999c47a6dd2efa4b5290",
  measurementId: "G-B1CMDEB3M5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  console.log(permission);

  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BMuJvknRnFOl3ugMAg9DsSCF9UIxME6fFARGACsuWB2sbLEB6ieKwhEuap-tJ07jHejbVvvTMDjjl-amq7fCblQ",
    });
    console.log(token);
  }
};

export { messaging };
