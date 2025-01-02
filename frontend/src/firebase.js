// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estateproject-927ad.firebaseapp.com",
  projectId: "estateproject-927ad",
  storageBucket: "estateproject-927ad.firebasestorage.app",
  messagingSenderId: "945202121503",
  appId: "1:945202121503:web:6aeba895c8780bd712fe2a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
