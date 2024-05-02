import { useCreateUserWithEmailAndPassword as useCreateUser } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";

import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

const useSignUpWithEmailAndPassword = () => {
  const [createUserWithEmailAndPassword, loading, error] = useCreateUser(auth);

  const showToast = useShowToast();

  const loginUser = useAuthStore((state) => state.login);
  const logoutUser = useAuthStore((state) => state.logout);

  const signup = async (inputs) => {
    const isFill =
      !inputs.email || !inputs.password || !inputs.username || !inputs.fullName;
    if (isFill) {
      showToast("Error", "please fill all the fields", "error");
      return;
    }
    /* check on firestore username */

    const usersRef = collection(firestore, "users");
    const query = query(usersRef, where("username", "==", inputs.username));
    const querySnapshot = await getDocs(query);

    if (!querySnapshot.empty) {
      showToast("Error", "username already exists", "error");
    }

    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      if (!newUser && error) {
        showToast("Error", error.message, "error");
        return;
      }

      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          username: inputs.username,
          fullName: inputs.fullName,
          bio: "",
          profilePicURL: "",
          followrs: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(doc(firestore, "user", newUser.user.uid), userDoc);
        localStorage.setItem("users-info", JSON.stringify(userDoc));
        loginUser(userDoc);
        console.log();
      }
    } catch (error) {
      console.log(error);
      showToast("Error", error.message + " trycatch", "error");
    }
  };

  return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;
