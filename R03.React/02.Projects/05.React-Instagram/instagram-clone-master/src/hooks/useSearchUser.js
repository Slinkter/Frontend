import { useState } from "react"; // Importa useState para manejar el estado local
import useShowToast from "./useShowToast"; // Importa el hook personalizado para mostrar notificaciones
import { collection, getDocs, query, where } from "firebase/firestore"; // Importa funciones de Firestore
import { firestore } from "../firebase/firebase"; // Importa la instancia de Firestore

// Hook personalizado para buscar un usuario por su nombre de usuario
const useSearchUser = () => {
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar si se está cargando la búsqueda
    const [user, setUser] = useState(null); // Estado para almacenar la información del usuario encontrado
    const showToast = useShowToast(); // Hook personalizado para mostrar notificaciones

    // Función para obtener el perfil de usuario por su nombre de usuario
    const getUserProfile = async (username) => {
        setIsLoading(true); // Establece isLoading a true para indicar que se está cargando
        setUser(null); // Reinicia el estado de usuario a null

        try {
            const q = query(
                collection(firestore, "users"),
                where("username", "==", username)
            ); // Construye la consulta a Firestore para buscar usuarios con el username proporcionado

            const querySnapshot = await getDocs(q); // Ejecuta la consulta y obtiene el snapshot de resultados

            if (querySnapshot.empty) {
                // Si no se encuentra ningún usuario
                showToast("Error", "User not found", "error"); // Muestra un mensaje de error
                return;
            }

            querySnapshot.forEach((doc) => {
                // Itera sobre los documentos encontrados (debería ser solo uno)
                setUser(doc.data()); // Establece el estado de usuario con los datos del documento encontrado
            });
        } catch (error) {
            showToast("Error", error.message, "error"); // Captura y muestra cualquier error ocurrido durante la búsqueda
            setUser(null); // Reinicia el estado de usuario a null en caso de error
        } finally {
            setIsLoading(false); // Establece isLoading a false después de que la búsqueda haya terminado (ya sea éxito o error)
        }
    };

    // Retorna el estado de carga, la función para obtener el perfil de usuario, el estado del usuario encontrado y la función para establecer el estado de usuario
    return { isLoading, getUserProfile, user, setUser };
};

export default useSearchUser;
