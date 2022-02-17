importScripts("https://www.gstatic.com/firebasejs/8.0.2/firebase.js");
importScripts("https://www.gstatic.com/firebasejs/8.0.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.0.2/firebase-messaging.js");
const firebaseConfig = {
    apiKey: "AIzaSyACwOfsHBU_DD-1EdkQaYFsE7aE-9afhcE",
    authDomain: "namaste-nepal-nn.firebaseapp.com",
    databaseURL: "https://namaste-nepal-nn.firebaseio.com",
    projectId: "namaste-nepal-nn",
    storageBucket: "namaste-nepal-nn.appspot.com",
    messagingSenderId: "926974691072",
    appId: "1:926974691072:web:9fbf19ad9a70e77360d5e5",
    measurementId: "G-KSPW12J0JS"
  };
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
     const promiseChain = clients
          .matchAll({
               type: "window",
               includeUncontrolled: true,
          })
          .then((windowClients) => {
               for (let i = 0; i < windowClients.length; i++) {
                    const windowClient = windowClients[i];
                    windowClient.postMessage(payload);
               }
          })
          .then(() => {
               return registration.showNotification("my notification title");
          });
     return promiseChain;
});
self.addEventListener("notificationclick", function(event) {
     console.log(event);
});