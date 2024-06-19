import { useEffect, useState } from "react";
import useShowToast from "./useShowToast"; // Hook personalizado para mostrar notificaciones
import { doc, getDoc } from "firebase/firestore"; // Funciones de Firestore para manejar documentos
import { firestore } from "../firebase/firebase"; // Instancia de Firestore configurada

// Hook personalizado para obtener el perfil de usuario por su ID
const useGetUserProfileById = (userId) => {
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar si se está cargando el perfil
  const [userProfile, setUserProfile] = useState(null); // Estado para almacenar el perfil del usuario

  const showToast = useShowToast(); // Hook personalizado para mostrar notificaciones

  useEffect(() => {
    // Función asíncrona para obtener el perfil de usuario
    const getUserProfile = async () => {
      setIsLoading(true); // Marcar que se está cargando el perfil
      setUserProfile(null); // Limpiar el estado del perfil del usuario
      try {
        // Obtener la referencia al documento del usuario en Firestore
        const userRef = await getDoc(doc(firestore, "users", userId));
        if (userRef.exists()) {
          // Si el documento existe, establecer los datos en el estado de userProfile
          setUserProfile(userRef.data());
        }
      } catch (error) {
        // Mostrar un mensaje de error si algo sale mal
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false); // Marcar que se ha terminado de cargar el perfil
      }
    };
    getUserProfile(); // Llamar a la función para obtener el perfil de usuario cuando se monta el componente
  }, [showToast, setUserProfile, userId]); // Ejecutar el efecto cuando cambian estas dependencias

  // Retornar el estado de carga, el perfil del usuario y la función para establecer el perfil
  return { isLoading, userProfile, setUserProfile };
};

export default useGetUserProfileById;
