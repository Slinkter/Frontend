import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCbJKI0tgutuipVY73Kr_mwnJI7S1u3qbg",
    authDomain: "fullstackreact-dd1cd.firebaseapp.com",
    projectId: "fullstackreact-dd1cd",
    storageBucket: "fullstackreact-dd1cd.appspot.com",
    messagingSenderId: "293597689038",
    appId: "1:293597689038:web:11051bae7042dc3fd64c9f",
    measurementId: "G-46MDFQP2D5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
