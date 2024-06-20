import { useState } from "react"; // Importa useState para manejar el estado local
import useShowToast from "./useShowToast"; // Importa el hook personalizado para mostrar notificaciones
import useAuthStore from "../store/authStore"; // Importa el store de autenticación para obtener información del usuario
import { arrayUnion, doc, updateDoc } from "firebase/firestore"; // Importa funciones de Firestore para actualizar documentos
import { firestore } from "../firebase/firebase"; // Importa la configuración de Firestore
import usePostStore from "../store/postStore"; // Importa el store de posts para manejar comentarios

// Hook personalizado para manejar la publicación de comentarios
const usePostComment = () => {
  const [isCommenting, setIsCommenting] = useState(false); // Estado para controlar si se está publicando un comentario
  const showToast = useShowToast(); // Hook personalizado para mostrar notificaciones
  const authUser = useAuthStore((state) => state.user); // Obtiene el usuario autenticado del store
  const addComment = usePostStore((state) => state.addComment); // Obtiene la función para agregar un comentario del store de posts

  // Función para manejar la publicación de un comentario
  const handlePostComment = async (postId, comment) => {
    if (isCommenting) return; // Si ya se está publicando un comentario, no hacer nada
    if (!authUser)
      // Si no hay un usuario autenticado, mostrar un error
      return showToast("Error", "You must be logged in to comment", "error");
    setIsCommenting(true); // Establecer el estado de publicación a true

    // Crear un nuevo objeto de comentario
    const newComment = {
      comment,
      createdAt: Date.now(),
      createdBy: authUser.uid,
      postId,
    };

    try {
      // Actualizar el documento del post en Firestore para agregar el nuevo comentario
      await updateDoc(doc(firestore, "posts", postId), {
        comments: arrayUnion(newComment),
      });

      addComment(postId, newComment); // Agregar el nuevo comentario al store local de posts
    } catch (error) {
      showToast("Error", error.message, "error"); // Mostrar un mensaje de error si algo sale mal
    } finally {
      setIsCommenting(false); // Restablecer el estado de publicación a false
    }
  };

  // Retornar el estado isCommenting y la función handlePostComment
  return { isCommenting, handlePostComment };
};

export default usePostComment;
