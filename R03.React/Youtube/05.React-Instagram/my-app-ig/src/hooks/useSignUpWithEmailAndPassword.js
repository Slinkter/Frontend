import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    where,
} from "firebase/firestore";

const useSignUpWithEmailAndPassword = () => {
    const [createUserWithEmailAndPassword, , loading, error] =
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
        const qFilter = where("username", "==", inputs.username);
        const q = query(usersRef, qFilter);
        const querySnapShot = await getDocs(q); // exec  query
        /* check user  */
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
                showToast("Error", error.message, "error");
                return;
            }
            if (newUser) {
                //
                let userDoc = {};
                userDoc.uid = newUser.user.uid;
                userDoc.emial = inputs.email;
                userDoc.username = inputs.username;
                userDoc.fullName = inputs.fullName;
                userDoc.bio = "";
                userDoc.profilePicUrl = "";
                userDoc.followers = [];
                userDoc.following = [];
                userDoc.posts = [];
                userDoc.createdAt = Date.now();
                //
                const docRef = doc(firestore, "users", newUser.user.uid);
                await setDoc(docRef, userDoc);
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc);
            }
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;
