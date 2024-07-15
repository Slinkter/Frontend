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
    appId: "1:764909029660:web:2fc001e2e3552166ae12d9",
    measurementId: "G-KDN25S4MTL",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
