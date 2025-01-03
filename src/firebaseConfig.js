import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6cDIw94tU7keNxEDaqlZtENdjcgQDPA0",
  authDomain: "icon-f657d.firebaseapp.com",
  projectId: "icon-f657d",
  storageBucket: "icon-f657d.firebasestorage.app",
  messagingSenderId: "358068723026",
  appId: "1:358068723026:web:0ffd1c7185b11ee2d3ee8b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };