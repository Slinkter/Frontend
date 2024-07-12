import { useSignOut } from "react-firebase-hooks/auth"; // Hook para manejar la salida del usuario
import { auth } from "../firebase/firebase"; // Importar la autenticación configurada
import useShowToast from "./useShowToast"; // Hook personalizado para mostrar notificaciones
import useAuthStore from "../store/authStore"; // Importar el store de autenticación

// Hook personalizado para manejar el cierre de sesión de un usuario
const useLogout = () => {
  const [signOut, isLoggingOut, error] = useSignOut(auth); // Hook para cerrar sesión, además de los estados de cierre de sesión y error
  const showToast = useShowToast(); // Hook personalizado para mostrar notificaciones
  const logoutUser = useAuthStore((state) => state.logout); // Obtener la función de logout del store

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      await signOut(); // Intentar cerrar sesión
      localStorage.removeItem("user-info"); // Eliminar la información del usuario de localStorage
      logoutUser(); // Actualizar el estado del usuario en el store
    } catch (error) {
      showToast("Error", error.message, "error"); // Mostrar mensaje de error si algo sale mal
    }
  };

  // Retornar la función handleLogout y los estados isLoggingOut y error
  return { handleLogout, isLoggingOut, error };
};

export default useLogout;
