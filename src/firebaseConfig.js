import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLBomZ6eOr91gSjm28lszix_7NnBvjyuA",
  authDomain: "do-all-database.firebaseapp.com",
  projectId: "do-all-database",
  storageBucket: "do-all-database.firebasestorage.app",
  messagingSenderId: "507485349204",
  appId: "1:507485349204:web:753f19b54f620e557e54c1",
  measurementId: "G-SFSF7LRVEH"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);