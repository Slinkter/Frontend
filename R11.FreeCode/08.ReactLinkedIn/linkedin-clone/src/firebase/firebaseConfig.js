import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPFDxZbwVUpfEeExTmVWtEfnKvHLMlCYY",
  authDomain: "webarsi2022.firebaseapp.com",
  projectId: "webarsi2022",
  storageBucket: "webarsi2022.appspot.com",
  messagingSenderId: "764909029660",
  appId: "1:764909029660:web:2fc001e2e3552166ae12d9",
  measurementId: "G-KDN25S4MTL",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
