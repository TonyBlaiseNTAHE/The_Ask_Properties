// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blogapp-a3167.firebaseapp.com",
  projectId: "blogapp-a3167",
  storageBucket: "blogapp-a3167.appspot.com",
  messagingSenderId: "454326536202",
  appId: "1:454326536202:web:e97509a0b5e657c476f7f3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
