importScripts(
  "https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCFxKGABVXHIiRMSBH_AS4VWVthLqoCvZk",
  authDomain: "operarios-4798f.firebaseapp.com",
  projectId: "operarios-4798f",
  storageBucket: "operarios-4798f.appspot.com",
  messagingSenderId: "687294938443",
  appId: "1:687294938443:web:60cdbbb3d9e3b68b087cce",
  measurementId: "G-RCLNK5TT5D",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
