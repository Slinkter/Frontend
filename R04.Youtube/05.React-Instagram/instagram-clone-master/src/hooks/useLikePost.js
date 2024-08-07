import { useState } from "react";
import useAuthStore from "../store/authStore"; // Importar el store de autenticación
import useShowToast from "./useShowToast"; // Hook personalizado para mostrar notificaciones
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"; // Funciones de Firestore para manejar documentos y actualizaciones
import { firestore } from "../firebase/firebase"; // Instancia de Firestore configurada

// Hook personalizado para manejar el "like" de un post
const useLikePost = (post) => {
  const [isUpdating, setIsUpdating] = useState(false); // Estado para controlar si se está actualizando el "like"
  const authUser = useAuthStore((state) => state.user); // Obtener el usuario autenticado del store
  const [likes, setLikes] = useState(post.likes.length); // Estado para la cantidad de "likes" del post
  const [isLiked, setIsLiked] = useState(post.likes.includes(authUser?.uid)); // Estado para verificar si el usuario autenticado ha dado "like" al post
  const showToast = useShowToast(); // Hook personalizado para mostrar notificaciones

  // Función para manejar el "like" o "unlike" de un post
  const handleLikePost = async () => {
    if (isUpdating) return; // Si ya se está actualizando, no hacer nada
    if (!authUser) {
      return showToast(
        "Error",
        "You must be logged in to like a post",
        "error"
      ); // Mostrar un mensaje de error si el usuario no está autenticado
    }
    setIsUpdating(true); // Establecer el estado de actualización a true

    try {
      const postRef = doc(firestore, "posts", post.id); // Referencia al documento del post en Firestore
      // Actualizar el documento del post en Firestore para añadir o quitar el uid del usuario autenticado de la lista de "likes"
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
      });

      // Actualizar los estados locales
      setIsLiked(!isLiked); // Invertir el estado de "isLiked"
      isLiked ? setLikes(likes - 1) : setLikes(likes + 1); // Actualizar la cantidad de "likes"
    } catch (error) {
      // Mostrar un mensaje de error si algo sale mal
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false); // Restablecer el estado de actualización a false
    }
  };

  // Retornar el estado de "like", la cantidad de "likes", la función handleLikePost y el estado de actualización
  return { isLiked, likes, handleLikePost, isUpdating };
};

export default useLikePost;
