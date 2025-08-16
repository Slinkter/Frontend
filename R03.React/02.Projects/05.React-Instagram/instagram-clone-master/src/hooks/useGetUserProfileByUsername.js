import { useEffect, useState } from "react";
import useShowToast from "./useShowToast"; // Hook personalizado para mostrar notificaciones
import { collection, getDocs, query, where } from "firebase/firestore"; // Funciones de Firestore para manejar consultas
import { firestore } from "../firebase/firebase"; // Instancia de Firestore configurada
import useUserProfileStore from "../store/userProfileStore"; // Store para manejar el perfil de usuario

// Hook personalizado para obtener el perfil de usuario por su nombre de usuario
const useGetUserProfileByUsername = (username) => {
    const [isLoading, setIsLoading] = useState(true); // Estado para controlar si se está cargando el perfil
    const showToast = useShowToast(); // Hook personalizado para mostrar notificaciones
    const { userProfile, setUserProfile } = useUserProfileStore(); // Obtener el perfil del usuario y la función para actualizarlo del store

    useEffect(() => {
        // Función asíncrona para obtener el perfil de usuario
        const getUserProfile = async () => {
            setIsLoading(true); // Marcar que se está cargando el perfil
            try {
                // Crear una consulta para buscar usuarios por nombre de usuario
                const q = query(
                    collection(firestore, "users"),
                    where("username", "==", username)
                );
                // Ejecutar la consulta y obtener los documentos
                const querySnapshot = await getDocs(q);

                // Si no se encuentra ningún documento, establecer el perfil del usuario como null
                if (querySnapshot.empty) return setUserProfile(null);

                let userDoc;
                // Recorrer los documentos obtenidos y guardar el primero (se asume que los usernames son únicos)
                querySnapshot.forEach((doc) => {
                    userDoc = doc.data();
                });

                // Establecer el perfil del usuario en el estado
                setUserProfile(userDoc);
                console.log(userDoc); // Imprimir el perfil del usuario en la consola (opcional)
            } catch (error) {
                // Mostrar un mensaje de error si algo sale mal
                showToast("Error", error.message, "error");
            } finally {
                // Marcar que se ha terminado de cargar el perfil
                setIsLoading(false);
            }
        };

        // Llamar a la función para obtener el perfil de usuario cuando se monta el componente o cambia el username
        getUserProfile();
    }, [setUserProfile, username, showToast]); // Dependencias del useEffect

    // Retornar el estado de carga y el perfil del usuario
    return { isLoading, userProfile };
};

export default useGetUserProfileByUsername;
