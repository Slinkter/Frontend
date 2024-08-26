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
        console.log(inputs);

        // Validar campos de entrada
        if (
            !inputs.email ||
            !inputs.password ||
            !inputs.username ||
            !inputs.fullName
        ) {
            showToast("Error", "Please fill all the fields", "error");
            console.log("Validation failed:", inputs);
            return;
        }

        // Configurar la consulta para verificar si el nombre de usuario ya existe
        const usersRef = collection(firestore, "users");
        const q = query(usersRef, where("username", "==", inputs.username));
        const querySnapshot = await getDocs(q);

        // Comprobar si el nombre de usuario ya está en uso
        if (!querySnapshot.empty) {
            showToast("Error", "Username already exists", "error");
            return;
        }

        try {
            // Crear el nuevo usuario con email y contraseña
            const newUser = await createUserWithEmailAndPassword(
                inputs.email,
                inputs.password
            );
            if (!newUser) {
                if (error) {
                    showToast("Error", error.message, "error");
                }
                return;
            }

            // Configurar los datos del nuevo usuario
            const userDoc = {
                uid: newUser.user.uid,
                email: inputs.email,
                username: inputs.username,
                fullName: inputs.fullName,
                bio: "",
                profilePicURL: "",
                followers: [],
                following: [],
                posts: [],
                createdAt: Date.now(),
            };

            // Guardar los datos del usuario en Firestore
            await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
            localStorage.setItem("user-info", JSON.stringify(userDoc));
            loginUser(userDoc);
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;
