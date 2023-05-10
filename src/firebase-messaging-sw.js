importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAlIrWoQDWII6A5YanNkf0Z3v2e9r1jqaI",
  authDomain: "tess-511a2.firebaseapp.com",
  projectId: "tess-511a2",
  storageBucket: "tess-511a2.appspot.com",
  messagingSenderId: "556245538675",
  appId: "1:556245538675:web:59b7cdd44f24ad64979706",
  measurementId: "G-VLGFQKBHNG"
});

const messaging = firebase.messaging();