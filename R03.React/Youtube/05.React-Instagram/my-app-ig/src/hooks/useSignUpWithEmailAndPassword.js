import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { collection, getDocs, query, where } from "firebase/firestore";

const useSignUpWithEmailAndPassword = () => {
    const [createUserWithEmailAndPassword, user, loading, error] =
        useCreateUserWithEmailAndPassword(auth);
    const showToast = useShowToast();
    const loginUser = useAuthStore((state) => state.login);

    const signup = async (inputs) => {
        /* validar */
        if (
            !inputs.email ||
            !inputs.password ||
            !inputs.username ||
            !inputs.fullName
        ) {
            showToast("Error", "Please fill all the fields", "error");
            return;
        }

        /* config query Firestore */
        const usersRef = collection(firestore, "users");
        const qWhere = where("username", "==", inputs.username);
        const q = query(usersRef, qWhere);
        /* go  query */
        const querySnapShot = await getDocs(q);
        if (!querySnapShot.empty) {
            showToast("error", "username alreadey existe", "error");
            return;
        }
        /*  */
        try {
            const newUser = await createUserWithEmailAndPassword(
                inputs.email,
                inputs.password
            );
            if (!newUser && error) {
                showToast("Error");
            }
        } catch (error) {}
    };

    return {};
};

export default useSignUpWithEmailAndPassword;
