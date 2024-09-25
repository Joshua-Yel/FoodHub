import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // Replace with the Actial configuration for the Mamarits Database API
  apiKey: "AIzaSyBEJm7saJ5PfejUmkO4p9gXo_gsINXP-is",
  authDomain: "scoutsotg.firebaseapp.com",
  projectId: "scoutsotg",
  storageBucket: "scoutsotg.appspot.com",
  messagingSenderId: "17391744089",
  appId: "1:17391744089:web:5a938647ea7363e67f2d48",
  measurementId: "G-5WQYD25TH4",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const db = getFirestore();
const auth = getAuth(app);
export { db, auth, storage };
