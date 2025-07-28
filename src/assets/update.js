import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  writeBatch,
  doc,
} from "firebase/firestore";

const firebase_key_local={
  apiKey: "AIzaSyDw7RlRTfWhBgepVFsZdkOLBculX66S2q8",
  authDomain: "dummy-electic-consume.firebaseapp.com",
  projectId: "dummy-electic-consume",
  storageBucket: "dummy-electic-consume.firebasestorage.app",
  messagingSenderId: "140474622883",
  appId: "1:140474622883:web:c9dbaca4dbcaf6e5d7f016",
  measurementId: "G-KYL148P57Z"
};

const app = initializeApp(firebase_key_local);
const db = getFirestore(app);

async function updateBills() {
  const collectionRef = collection(db, "forecasting_data");

  const snapshot = await getDocs(collectionRef);

  if (snapshot.empty) {
    console.log("No matching documents.");
    return;
  }

  const batch = writeBatch(db);

  snapshot.forEach((document) => {
    const data = document.data();
    if (data.consume != null) {
      const bill = "Panel A";
      const docRef = doc(db, "forecasting_data", document.id);
      batch.update(docRef, { name: bill });
    }
  });

  await batch.commit();
  console.log("All documents updated with bill.");
}

updateBills().catch(console.error);
