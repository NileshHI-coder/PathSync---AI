
const firebaseConfig = {
  apiKey: "AIzaSyDcWsW8mfW2MjSGot0OklrxvR2FAD1mfGU",
  authDomain: "pathsyns-ai.firebaseapp.com",
  projectId: "pathsyns-ai",
  storageBucket: "pathsyns-ai.firebasestorage.app",
  messagingSenderId: "948080920893",
  appId: "1:948080920893:web:7899a7696849f3068d5d54",
  measurementId: "G-6XZQTB26G0"
};

/// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firestore
const db = firebase.firestore();

// Auth
const auth = firebase.auth();

// Enable Firestore Offline Persistence
db.enablePersistence({ synchronizeTabs: true })
  .catch((err) => {

      if (err.code == 'failed-precondition') {

          console.log('Persistence failed: Multiple tabs open');

      } else if (err.code == 'unsupported-browser') {

          console.log('Persistence not supported in this browser');
      }
  });