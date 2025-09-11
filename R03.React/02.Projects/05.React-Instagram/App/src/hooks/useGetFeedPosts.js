import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

import usePostStore from "../store/postStore";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";

const useGetFeedPosts = () => {
    // Estado para saber si se están cargando los posts. Inicia en `true`.
    const [isLoading, setIsLoading] = useState(true);
    // Obtiene el usuario autenticado desde el store global de Zustand.
    const authUser = useAuthStore((state) => state.user);

    // Obtiene los posts y la función para actualizarlos desde el store de posts.
    const { posts, setPosts } = usePostStore();
    // Obtiene la función para actualizar el perfil de usuario (aunque no se usa aquí, está en las dependencias).
    const { setUserProfile } = useUserProfileStore();

    // Hook personalizado para mostrar notificaciones (toasts).
    const showToast = useShowToast();

    // useEffect se ejecuta cuando el componente se monta o cuando una de sus dependencias cambia.
    useEffect(() => {
        // Función asíncrona para obtener los posts del feed.
        const getFeedPosts = async () => {
            // Inicia el estado de carga.
            setIsLoading(true);

            // Si el usuario no sigue a nadie, no hay nada que mostrar.
            if (authUser.following.length === 0) {
                setIsLoading(false); // Detiene la carga.
                setPosts([]); // Asegura que no haya posts antiguos.
                return; // Termina la ejecución de la función.
            }

            try {
                // Crea una consulta a Firestore.
                const q = query(
                    collection(firestore, "posts"), // Busca en la colección "posts".
                    // Filtra los documentos donde el campo "createdBy" coincida con alguno de los UIDs
                    // que el usuario actual está siguiendo (`authUser.following`).
                    // NOTA: La cláusula 'in' de Firestore tiene un límite (actualmente 30 elementos).
                    where("createdBy", "in", authUser.following)
                );

                // Ejecuta la consulta y obtiene una "instantánea" de los resultados.
                const querySnapshot = await getDocs(q);
                const feedPosts = [];

                // Itera sobre cada documento en los resultados.
                querySnapshot.forEach((doc) => {
                    // Añade el post al array, incluyendo su ID de documento.
                    feedPosts.push({ id: doc.id, ...doc.data() });
                });

                // Ordena los posts por fecha de creación, del más nuevo al más viejo.
                feedPosts.sort((a, b) => b.createdAt - a.createdAt);

                // Actualiza el estado global con los posts obtenidos.
                setPosts(feedPosts);
            } catch (error) {
                // Si ocurre un error, muestra una notificación.
                showToast("Error", error.message, "error");
            } finally {
                // Este bloque se ejecuta siempre, al final del try/catch.
                // Asegura que el estado de carga se desactive.
                setIsLoading(false);
            }
        };

        // Solo ejecuta la función si hay un usuario autenticado.
        if (authUser) getFeedPosts();
    }, [authUser, showToast, setPosts]); // Dependencias del useEffect.

    // El hook devuelve el estado de carga y la lista de posts para que los componentes los usen.
    return { isLoading, posts };
};

export default useGetFeedPosts;
