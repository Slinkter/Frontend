// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBytes,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
// llaves en forma privada , esta en el archivo .env
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// funciones
export async function userExists(uid) {
  // consultar un documento  si existe  en la base de datos-Collecion "users",uid:uso de liberia uuid
  const docRef = doc(db, "users", uid);
  const res = await getDoc(docRef); //
  return res.exists(); // si el documento existe o no
}

export async function existsUsername(username) {
  try {
    const users = [];
    // se va a buscar a una collecion no un documento
    const collRef = collection(db, "users");
    const q = query(collRef, where("username", "==", username));
    const query_snapShot = await getDocs(q); // error 2
    query_snapShot.forEach((doc) => {
      users.push(doc.data());
    });
    return users.length > 0 ? users[0].uid : null;
  } catch (error) {
    console.log(error);
  }
}

export async function registerNewUser(user) {
  // crear la plantilla de user , cuando se logea por primera vez
  try {
    // crear la collection users
    const collectionRef = collection(db, "users");
    // crear documento con uid
    const docRef = doc(collectionRef, user.uid);
    // insertar el nuevo usuario en la collection
    await setDoc(docRef, user);
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(user) {
  console.log(user);
  try {
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  } catch (error) {
    console.error(error);
  }
}

export async function getUserInfo(uid) {
  const docRef = doc(db, "users", uid); // queremos un documento, por medio del uid
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function insertNewLink(link) {
  try {
    const docRef = collection(db, "links");
    const res = await addDoc(docRef, link);
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function getLinks(uid) {
  const links = [];
  try {
    const collectionRef = collection(db, "links");
    const q = query(collectionRef, where("uid", "==", uid));
    const querySnapsnot = await getDocs(q);

    querySnapsnot.forEach((doc) => {
      const link = { ...doc.data() };
      link.docId = doc.id;
      links.push(link);
    });
    return links;
  } catch (error) {
    console.error(error);
  }
}

export async function updateLink(docId, link) {
  try {
    const docRef = doc(db, "links", docId);
    const res = await setDoc(docRef, link);
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteLink(docId) {
  try {
    const docRef = doc(db, "links", docId);
    const res = await deleteDoc(docRef);
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function setUserProfilePhoto(uid, file) {
  try {
    const imageRef = ref(storage, `images/${uid}`);
    const resUpload = await uploadBytes(imageRef, file);
    return resUpload;
  } catch (error) {
    console.error(error);
  }
}

/* obtener url de la imagen */

export async function getProfilePhotoUrl(profilePicture) {
  try {
    const imageRef = ref(storage, profilePicture);
    const url = await getDownloadURL(imageRef);
    /*    console.log(url); */
    return url;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserPublicProfileInfo(uid) {
  const profileInfo = await getUserInfo(uid);
  const linksInfo = await getLinks(uid);

  return { profileInfo: profileInfo, linksInfo: linksInfo };
}

export async function logout() {
  await auth.signOut();
}
