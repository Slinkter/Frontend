import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { useState } from "react";
import { useEffect } from "react";

const useGetSuggestedUsers = () => {
    const [isLoading, setIsLoading] = useState(true); // Estado para controlar si se están cargando los usuarios sugeridos
    const [suggestedUsers, setSuggestedUsers] = useState([]); // Estado para almacenar los usuarios sugeridos
    const authUser = useAuthStore((state) => state.user); // Obtener el usuario autenticado del store de autenticación
    const showToast = useShowToast(); // Hook personalizado para mostrar mensajes de notificación

    useEffect(() => {
        const getSuggestedUsers = async () => {
            setIsLoading(true); // Marcar que se están cargando los usuarios sugeridos

            try {
                const usersRef = collection(firestore, "users"); // Referencia a la colección "users" en Firestore

                // Crear una consulta para obtener usuarios que no sean el usuario autenticado ni los que ya sigue
                const q = query(
                    usersRef,
                    where("uid", "not-in", [
                        authUser.uid,
                        ...authUser.following,
                    ]), // Filtrar usuarios que no sean el usuario autenticado ni los que sigue
                    orderBy("uid"), // Ordenar los resultados por el campo "uid"
                    limit(3) // Limitar los resultados a 3 usuarios
                );

                const querySnapshot = await getDocs(q); // Ejecutar la consulta y obtener el snapshot de resultados
                const users = [];

                // Iterar sobre los documentos obtenidos y agregarlos al array de usuarios sugeridos
                querySnapshot.forEach((doc) => {
                    users.push({ ...doc.data(), id: doc.id }); // Incluir los datos del usuario y su ID en el array
                });

                setSuggestedUsers(users); // Actualizar el estado de usuarios sugeridos con los resultados obtenidos
            } catch (error) {
                // Manejar errores mostrando un mensaje de toast con el error
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false); // Marcar que se ha completado la carga de los usuarios sugeridos
            }
        };

        // Llamar a getSuggestedUsers solo si authUser está definido (autenticado)
        if (authUser) {
            getSuggestedUsers();
        }
    }, [authUser, showToast]); // Dependencias del efecto useEffect

    // Retornar el estado de isLoading y el array de usuarios sugeridos
    return { isLoading, suggestedUsers };
};

export default useGetSuggestedUsers;
