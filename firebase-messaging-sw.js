// firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/9.6.7/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.7/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCdhj73cKJc2J2_tDHw2-89EemZx-EGMJQ",
  authDomain: "alamer-526ff.firebaseapp.com",
  projectId: "alamer-526ff",
  messagingSenderId: "523879269039",
  appId: "1:523879269039:web:634861aa34641bfebf8a5a"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification?.title || 'إشعار جديد';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: payload.notification?.icon || '/icon.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
