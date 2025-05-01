
// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_XlabPpfYnWuBukUG8g30GptMZoepq3s",
  authDomain: "shayam-venchers.firebaseapp.com",
  projectId: "shayam-venchers",
  storageBucket: "shayam-venchers.appspot.com",
  messagingSenderId: "471766079761",
  appId: "1:471766079761:web:9a2ca76df9f4771e44cf2e",
  measurementId: "G-DGKXNBC5RZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
