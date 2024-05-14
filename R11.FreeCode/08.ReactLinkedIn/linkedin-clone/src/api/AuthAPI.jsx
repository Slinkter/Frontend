import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

export const LoginAPI = (email, password) => {
  try {
    let res = signInWithEmailAndPassword(auth, email, password);
    return res;
  } catch (error) {
    return error;
  }
};

export const RegisterAPI = (email, password) => {
  try {
    let res = createUserWithEmailAndPassword(auth, email, password);
    return res;
  } catch (error) {
    return error;
  }
};
