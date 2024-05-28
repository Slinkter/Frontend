import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase/firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

const useLogin = () => {
  const showToast = useShowToast();
  // hook firebase
  const [signInWithEmailAndPassword, loading, error] =
    useSignInWithEmailAndPassword(auth);
  // hook custom
  const loginUser = useAuthStore((state) => state.login);
  // function aux
  const login = async (inputs) => {
    if (!inputs.email || !inputs.password) {
      return showToast("Error", "please  fill all the fields", "error");
    }
    try {
      const userCred = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      if (userCred) {
        const docRef = doc(firestore, "users", userCred.user.uid);
        const docSnap = await getDoc(docRef);
        localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
        loginUser(docSnap.data());
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  // export
  return { loading, error, login };
};

export default useLogin;
