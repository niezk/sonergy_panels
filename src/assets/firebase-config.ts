// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebase_key_local={
  apiKey: "AIzaSyDw7RlRTfWhBgepVFsZdkOLBculX66S2q8",
  authDomain: "dummy-electic-consume.firebaseapp.com",
  projectId: "dummy-electic-consume",
  storageBucket: "dummy-electic-consume.firebasestorage.app",
  messagingSenderId: "140474622883",
  appId: "1:140474622883:web:c9dbaca4dbcaf6e5d7f016",
  measurementId: "G-KYL148P57Z"
};


initializeApp(firebase_key_local);
const db = getFirestore()
export default db
