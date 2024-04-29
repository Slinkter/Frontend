import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDPFDxZbwVUpfEeExTmVWtEfnKvHLMlCYY",
  authDomain: "webarsi2022.firebaseapp.com",
  projectId: "webarsi2022",
  storageBucket: "webarsi2022.appspot.com",
  messagingSenderId: "764909029660",
  appId: "1:764909029660:web:53ff61e465e322a2ae12d9",
  measurementId: "G-8QG7N5143V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize services conexion
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
