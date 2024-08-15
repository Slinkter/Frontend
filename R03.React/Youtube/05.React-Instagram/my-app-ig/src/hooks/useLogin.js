import { useSignInWithEmailAndPassword as loginEP } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import useShowToast from "./useShowToast";
import { auth, firestore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";

const useLogin = () => {
    const showToast = useShowToast();
    const loginUser = useAuthStore((state) => state.login);
    const [signInWithEmailAndPassword, loading, error] = loginEP(auth);
    /*  */
    const login = async (inputs) => {
        /* validad */
        if (!inputs.email || !inputs.password) {
            return showToast("error", "please fill all the fields", "error");
        }
        /*  */
        try {
            const userCred = await signInWithEmailAndPassword(
                inputs.email,
                inputs.password
            );
            if (userCred) {
                const docRef = doc(firestore, "users", userCred.user.uid);
                const docSnap = await getDoc(docRef);
                const userInfo = docSnap.data();
                loginUser(userInfo);
                localStorage.setItem("user-info", JSON.stringify(userInfo));
            }
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };
    /*  */
    return { loading, error, login };
};

export default useLogin;
