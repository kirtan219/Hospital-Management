// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARYo4nMyB8CA4KSo_n5Bss_OU9s4mD7Bw",
  authDomain: "hospital-mangement-b23b6.firebaseapp.com",
  projectId: "hospital-mangement-b23b6",
  storageBucket: "hospital-mangement-b23b6.firebasestorage.app",
  messagingSenderId: "377136155693",
  appId: "1:377136155693:web:f121b96e04a8505a8cfca4",
  measurementId: "G-GHMKBV1RPT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app; 