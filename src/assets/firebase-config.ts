// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseKey = import.meta.env.FIREBASE_APP
initializeApp(firebaseKey);
const db = getFirestore()
export default db
