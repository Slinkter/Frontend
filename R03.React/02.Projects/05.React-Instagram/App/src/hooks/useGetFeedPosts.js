import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

import usePostStore from "../store/postStore";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";

const useGetFeedPosts = () => {
    const [isLoading, setIsLoading] = useState(true);

    const authUser = useAuthStore((state) => state.user); // Obtiene el usuario autenticado desde el store
    const { posts, setPosts } = usePostStore(); // Obtiene los posts desde el store de posts.

    const showToast = useShowToast();

    // useEffect se ejecuta cuando el componente se monta o cuando una de sus dependencias cambia.
    useEffect(() => {
        // F-asíncrona para obtener los posts .
        const getFeedPosts = async () => {
            setIsLoading(true);

            // Si el usuario no sigue a nadie, no hay nada que mostrar.

            if (authUser.following.length === 0) {
                setIsLoading(false);
                setPosts([]);
                return; // Termina la ejecución de la función.
            }

            const examplepost = {
                id: "string", // ID único del documento del post en Firestore.
                caption: "string", // El texto o descripción que acompaña a la imagen (inferido).
                imageURL: "string", // La URL de la imagen de la publicación (inferido).
                createdBy: "string", // El `uid` del usuario que creó el post.
                createdAt: "number", // Fecha de creación del post, en formato timestamp.
                likes: ["array"], // Un array con los `uid` de los usuarios que le han dado "me gusta".
                comments: ["array"], // Un array de objetos `comment`.
            };

            try {
                const feedPosts = [];
                // Crea una consulta a Firestore.
                // Busca en la colección "posts".
                // traer los posts de los usuario al que sigue el usuario logeado ,
                // filtra por  "createdBy"
                const q = query(
                    collection(firestore, "posts"),
                    where("createdBy", "in", authUser.following)
                );
                // Ejecuta la consulta y obtiene una "instantánea" de los resultados.
                const querySnapshot = await getDocs(q);
                // Itera sobre cada documento en los resultados.
                querySnapshot.forEach((doc) => {
                    // Añade el post al array, incluyendo su ID de documento.
                    const post = { id: doc.id, ...doc.data() };
                    feedPosts.push(post);
                });

                // Ordena los posts por fecha de creación, del más nuevo al más viejo.
                feedPosts.sort((a, b) => b.createdAt - a.createdAt);

                // Actualiza el estado global con los posts .
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
        if (authUser) {
            getFeedPosts();
        }
    }, [authUser, showToast, setPosts]); // Dependencias del useEffect.

    // El hook devuelve el estado de carga y la lista de posts para que los componentes los usen.
    return { isLoading, posts };
};

export default useGetFeedPosts;
