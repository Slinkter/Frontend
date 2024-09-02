import { useCreateUserWithEmailAndPassword as signupHook } from "react-firebase-hooks/auth"; // Importa el hook para crear usuario con correo y contraseña desde Firebase Authentication
import { auth, firestore } from "../firebase/firebase"; // Importa la instancia de auth y firestore desde Firebase
import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    where,
} from "firebase/firestore"; // Importa funciones de Firestore para manejar colecciones, documentos, consultas y establecimiento de documentos
import useShowToast from "./useShowToast"; // Importa el hook personalizado para mostrar notificaciones
import useAuthStore from "../store/authStore"; // Importa el store para manejar el estado de autenticación

const useSignUpWithEmailAndPassword = () => {
    const [createUserWithEmailAndPassword, , loading, error] = signupHook(auth); // Obtiene la función para crear usuario con correo y contraseña desde Firebase Authentication
    const showToast = useShowToast(); // Obtiene la función para mostrar notificaciones
    const loginUser = useAuthStore((state) => state.login); // Obtiene la función para actualizar el estado de autenticación en el store

    const signup = async (inputs) => {
        // Validar
        if (
            !inputs.email ||
            !inputs.password ||
            !inputs.username ||
            !inputs.fullName
        ) {
            // Valida que todos los campos necesarios estén llenos
            showToast("Error", "Please fill all the fields", "error"); // Muestra un mensaje de error si falta algún campo
            return;
        }
        // validar
        const usersRef = collection(firestore, "users"); // Referencia a la colección "users"
        const whereRef = where("username", "==", inputs.username);
        const q = query(usersRef, whereRef); // Construye la consulta para verificar si el nombre de usuario ya existe
        const querySnapshot = await getDocs(q); // Ejecuta la consulta y obtiene el snapshot de resultados
        // Si la consulta no está vacía, significa que el nombre de usuario ya está en uso
        if (!querySnapshot.empty) {
            showToast("Error", "Username already exists", "error"); // Muestra un mensaje de error indicando que el nombre de usuario ya existe
            return;
        }

        try {
            // Crea un nuevo usuario utilizando el correo y contraseña proporcionados
            const newUser = await createUserWithEmailAndPassword(
                inputs.email,
                inputs.password
            );
            // Si no se crea el nuevo usuario y hay un error, muestra un mensaje de error
            if (!newUser && error) {
                showToast("Error", error.message, "error");
                return;
            }
            // Si se crea el nuevo usuario correctamente
            if (newUser) {
                // Objeto con los datos del usuario a almacenar en Firestore
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
                const docRef = doc(firestore, "users", newUser.user.uid);
                await setDoc(docRef, userDoc); // Establece los datos del usuario en el documento correspondiente en Firestore
                localStorage.setItem("user-info", JSON.stringify(userDoc)); // Guarda los datos del usuario en el almacenamiento local
                loginUser(userDoc); // Actualiza el estado de autenticación en el store con los datos del usuario registrado
            }
        } catch (error) {
            showToast("Error", error.message, "error"); // Captura y muestra cualquier error ocurrido durante el proceso de registro
        }
    };

    return { loading, error, signup }; // Retorna el estado de carga, errores y la función de registro
};

export default useSignUpWithEmailAndPassword; // Exporta el hook personalizado de registro con correo y contraseña
