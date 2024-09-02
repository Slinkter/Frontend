import { useSignInWithEmailAndPassword as loginHook } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast"; // Hook personalizado para mostrar notificaciones
import { auth, firestore } from "../firebase/firebase"; // Importar autenticación y Firestore configurados
import { doc, getDoc } from "firebase/firestore"; // Funciones de Firestore para manejar documentos
import useAuthStore from "../store/authStore"; // Importar el store de autenticación

// Hook personalizado para manejar el inicio de sesión de un usuario
const useLogin = () => {
    //
    const [signInWithEmailAndPassword, , loading, error] = loginHook(auth); // Hook para iniciar sesión con correo y contraseña
    const loginUser = useAuthStore((state) => state.login); // Obtener la función de login del store
    const showToast = useShowToast(); // Hook personalizado para mostrar notificaciones

    // Función para manejar el inicio de sesión
    const login = async (inputs) => {
        // validacion
        if (!inputs.email || !inputs.password) {
            return showToast("Error", "Please fill all the fields", "error"); // Mostrar mensaje de error si faltan campos
        }
        try {
            // Intentar iniciar sesión
            const userCred = await signInWithEmailAndPassword(
                inputs.email,
                inputs.password
            );
            // validar
            if (userCred) {
                const docRef = doc(firestore, "users", userCred.user.uid); // Referencia al documento del usuario en Firestore
                const docSnap = await getDoc(docRef); // Obtener el documento del usuario
                const user = docSnap.data();
                // Guardar la información del usuario en localStorage
                localStorage.setItem("user-info", JSON.stringify(user));
                // Actualizar el estado del usuario en el store
                loginUser(user);
            }
        } catch (error) {
            showToast("Error", error.message, "error"); // Mostrar mensaje de error si algo sale mal
        }
    };

    // Retornar el estado de carga, error y la función de login
    return { loading, error, login };
};

export default useLogin;
