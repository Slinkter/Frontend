import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useUserProfileStore from "../store/userProfileStore";

const useGetUserProfileByUsername = (username) => {
    const [isLoading, setIsLoading] = useState(true);
    // Obtenemos el perfil de usuario y la función para actualizarlo desde nuestro store de Zustand.
    const { userProfile, setUserProfile } = useUserProfileStore();
    const showToast = useShowToast();

    useEffect(() => {
        // Definimos la función asíncrona para obtener los datos dentro del useEffect.
        const getUserProfile = async () => {
            // Empezamos el proceso de carga y
            // limpiamos el perfil anterior para no mostrar datos obsoletos.
            setIsLoading(true);
            setUserProfile(null);
            try {
                // Creamos una consulta a Firestore para encontrar al usuario por su 'username'.
                const q = query(
                    collection(firestore, "users"),
                    where("username", "==", username)
                );
                const querySnapshot = await getDocs(q);

                // Si la consulta no devuelve resultados, significa que el usuario no existe.
                if (querySnapshot.empty) {
                    setUserProfile(null);
                    return;
                }

                // Como el 'username' es único, solo habrá un documento. Lo extraemos y actualizamos el estado global.
                const userDoc = querySnapshot.docs[0].data();
                setUserProfile(userDoc);
            } catch (error) {
                // Si algo sale mal, mostramos una notificación de error.
                showToast("Error", error.message, "error");
            } finally {
                // Al final, ya sea con éxito o error, terminamos el estado de carga.
                setIsLoading(false);
            }
        };
        // Ejecutamos la función para obtener el perfil.
        getUserProfile();
    }, [setUserProfile, username, showToast]);

    return { isLoading, userProfile };
};

export default useGetUserProfileByUsername;
