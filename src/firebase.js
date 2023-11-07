// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDy8F8tzX7WqHcU1Pfce2EITFmkuqa2-RY",
  authDomain: "drag-n-drop-andemosa.firebaseapp.com",
  projectId: "drag-n-drop-andemosa",
  storageBucket: "drag-n-drop-andemosa.appspot.com",
  messagingSenderId: "505305453534",
  appId: "1:505305453534:web:7f213f6127638b0689034f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;