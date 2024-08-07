import { useEffect, useState } from "react";
import usePostStore from "../store/postStore"; // Hook personalizado para el store de publicaciones
import useShowToast from "./useShowToast"; // Hook personalizado para mostrar notificaciones
import useUserProfileStore from "../store/userProfileStore"; // Hook personalizado para el store del perfil de usuario
import { collection, getDocs, query, where } from "firebase/firestore"; // Funciones de Firestore para manejar datos
import { firestore } from "../firebase/firebase"; // Instancia de Firestore configurada

const useGetUserPosts = () => {
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar si se están cargando las publicaciones
  const { posts, setPosts } = usePostStore(); // Obtener y establecer el estado de publicaciones desde el store
  const showToast = useShowToast(); // Hook personalizado para mostrar notificaciones
  const userProfile = useUserProfileStore((state) => state.userProfile); // Obtener el perfil del usuario desde el store

  useEffect(() => {
    const getPosts = async () => {
      if (!userProfile) return; // Si no hay perfil de usuario, no hacer nada
      setIsLoading(true); // Marcar que se están cargando las publicaciones
      setPosts([]); // Limpiar el estado de publicaciones

      try {
        // Crear una consulta para obtener las publicaciones creadas por el usuario
        const q = query(
          collection(firestore, "posts"),
          where("createdBy", "==", userProfile.uid)
        );
        const querySnapshot = await getDocs(q); // Ejecutar la consulta y obtener los documentos

        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id }); // Añadir cada publicación al array de publicaciones
        });

        // Ordenar las publicaciones por fecha de creación, de más reciente a más antigua
        posts.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(posts); // Actualizar el estado de publicaciones con los datos obtenidos
      } catch (error) {
        showToast("Error", error.message, "error"); // Mostrar un mensaje de error si algo sale mal
        setPosts([]); // Limpiar el estado de publicaciones en caso de error
      } finally {
        setIsLoading(false); // Marcar que se ha terminado de cargar las publicaciones
      }
    };

    getPosts(); // Llamar a la función para obtener las publicaciones cuando se monta el componente
  }, [setPosts, userProfile, showToast]); // Ejecutar el efecto cuando cambian estas dependencias

  return { isLoading, posts }; // Retornar el estado de carga y las publicaciones
};

export default useGetUserPosts;
