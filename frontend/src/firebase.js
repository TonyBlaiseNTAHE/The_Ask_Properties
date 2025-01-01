// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "askproperties-63fd8.firebaseapp.com",
  projectId: "askproperties-63fd8",
  storageBucket: "askproperties-63fd8.firebasestorage.app",
  messagingSenderId: "826545343805",
  appId: "1:826545343805:web:6585b96efb9412b31e8954",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
