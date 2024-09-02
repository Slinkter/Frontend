import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetFeedPosts = () => {
    const [isLoading, setIsLoading] = useState(true); // Estado para controlar si se están cargando las publicaciones del feed
    const authUser = useAuthStore((state) => state.user); // Obtener el usuario autenticado del store de autenticación
    const { posts, setPosts } = usePostStore(); // Obtener el estado global de las publicaciones y la función para actualizarlo
    const { setUserProfile } = useUserProfileStore(); // Función para actualizar el perfil de usuario en el store de perfiles
    const showToast = useShowToast(); // Hook personalizado para mostrar mensajes de notificación

    const getFeedPosts = async () => {
        setIsLoading(true);

        // Si el usuario no sigue a nadie, no hay necesidad de hacer la consulta
        if (authUser.following.length === 0) {
            setIsLoading(false); // Establecer isLoading a false ya que no hay posts que cargar
            setPosts([]); // Vaciar el array de posts en el estado global
            return;
        }

        try {
            // Consulta Firestore para obtener los posts de los usuarios seguidos por el usuario logeado
            const q = query(
                collection(firestore, "posts"), // Referencia a la colección "posts" en Firestore
                where("createdBy", "in", authUser.following) // del usuario logeado, Filtrar los posts creados por usuarios en la lista de following
            );

            const querySnapshot = await getDocs(q); // Ejecutar la consulta y obtener el snapshot de resultados
            const feedPosts = [];
            // Iterar sobre los documentos obtenidos y agregarlos al array de feedPosts
            querySnapshot.forEach((doc) => {
                feedPosts.push({ id: doc.id, ...doc.data() }); // Incluir el ID del documento y los datos del post en el array
            });

            // Ordenar los posts por fecha de creación (opcional)
            feedPosts.sort((a, b) => b.createdAt - a.createdAt);

            // Actualizar el estado global de posts con los posts del feed obtenidos
            setPosts(feedPosts);
        } catch (error) {
            // Manejar errores mostrando un mensaje de toast con el error
            showToast("Error", error.message, "error");
        } finally {
            setIsLoading(false); // Marcar que se ha completado la carga de los posts del feed
        }
    };

    useEffect(() => {
        // Llamar a getFeedPosts solo si authUser está definido (autenticado)
        if (authUser) {
            getFeedPosts();
        }
    }, [authUser, showToast, setPosts, setUserProfile]);

    // Retornar el estado de isLoading y el array de posts obtenidos del feed
    return { isLoading, posts };
};

export default useGetFeedPosts;
