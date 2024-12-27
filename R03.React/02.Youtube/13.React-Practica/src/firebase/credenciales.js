// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBhSkVXGYjECfkse8u7DlLkHv9u51f9gak",
    authDomain: "fullstackreact-dd1cd.firebaseapp.com",
    projectId: "fullstackreact-dd1cd",
    storageBucket: "fullstackreact-dd1cd.appspot.com",
    messagingSenderId: "293597689038",
    appId: "1:293597689038:web:839120fc29b76a71d64c9f",
    measurementId: "G-C26Z9QRJWJ",
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(FirebaseApp);
export const db = getFirestore(FirebaseApp);
export default FirebaseApp;
