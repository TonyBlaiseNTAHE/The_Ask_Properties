// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-ce64f.firebaseapp.com",
  projectId: "blog-ce64f",
  storageBucket: "blog-ce64f.appspot.com",
  messagingSenderId: "567820394656",
  appId: "1:567820394656:web:3626e0107ae58f9635a9c5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
