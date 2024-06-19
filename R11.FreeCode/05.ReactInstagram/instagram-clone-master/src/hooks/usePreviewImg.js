import { useState } from "react"; // Importa useState para manejar el estado local
import useShowToast from "./useShowToast"; // Importa el hook personalizado para mostrar notificaciones

// Hook personalizado para manejar la vista previa de imágenes seleccionadas
const usePreviewImg = () => {
  const [selectedFile, setSelectedFile] = useState(null); // Estado para almacenar el archivo de imagen seleccionado
  const showToast = useShowToast(); // Hook personalizado para mostrar notificaciones
  const maxFileSizeInBytes = 2 * 1024 * 1024; // Tamaño máximo del archivo en bytes (2MB)

  // Función para manejar el cambio de imagen seleccionada
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Obtiene el primer archivo seleccionado
    if (file && file.type.startsWith("image/")) {
      // Verifica si el archivo es una imagen
      if (file.size > maxFileSizeInBytes) {
        // Verifica si el tamaño del archivo es mayor que el permitido
        showToast("Error", "File size must be less than 2MB", "error"); // Muestra un mensaje de error si el archivo es demasiado grande
        setSelectedFile(null); // Establece el archivo seleccionado a null
        return;
      }
      const reader = new FileReader(); // Crea una nueva instancia de FileReader

      // Función que se ejecuta cuando FileReader termina de leer el archivo
      reader.onloadend = () => {
        setSelectedFile(reader.result); // Establece el archivo seleccionado al resultado leído (Data URL)
      };

      reader.readAsDataURL(file); // Lee el archivo como una Data URL
    } else {
      showToast("Error", "Please select an image file", "error"); // Muestra un mensaje de error si el archivo no es una imagen
      setSelectedFile(null); // Establece el archivo seleccionado a null
    }
  };

  // Retorna el archivo seleccionado, la función para manejar el cambio de imagen y la función para establecer el archivo seleccionado
  return { selectedFile, handleImageChange, setSelectedFile };
};

export default usePreviewImg;
