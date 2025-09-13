// Importamos el hook `useState` de React para poder manejar el estado dentro de nuestro componente funcional.
import { useState } from "react";
// Importamos nuestro hook personalizado `useShowToast` para mostrar notificaciones (toasts) al usuario.
import useShowToast from "./useShowToast";

// Definimos una constante para el tamaño máximo permitido del archivo en bytes.
// 2 * 1024 * 1024 equivale a 2 Megabytes (MB).
const maxFileSizeInBytes = 2 * 1024 * 1024; // 2MB

// Definimos nuestro hook personalizado `usePreviewImg`.
// Los hooks personalizados en React son funciones que empiezan con "use" y pueden llamar a otros hooks.
const usePreviewImg = () => {
    // Usamos `useState` para crear una variable de estado `selectedFile`.
    // `selectedFile` almacenará la URL de datos de la imagen previsualizada.
    // `setSelectedFile` es la función para actualizar este estado.
    // Lo inicializamos en `null` porque al principio no hay ningún archivo seleccionado.
    const [selectedFile, setSelectedFile] = useState(null);
    // Obtenemos la función `showToast` de nuestro hook `useShowToast` para mostrar mensajes.
    const showToast = useShowToast();

    // Esta función se ejecutará cuando el usuario seleccione un archivo en el input.
    const handleImageChange = (e) => {
        // Obtenemos el primer archivo del array de archivos seleccionados.
        const file = e.target.files[0];
        // Verificamos si se seleccionó un archivo y si su tipo MIME comienza con "image/".
        if (file && file.type.startsWith("image/")) {
            // Si es una imagen, verificamos si su tamaño supera el máximo permitido.
            if (file.size > maxFileSizeInBytes) {
                // Si el archivo es demasiado grande, mostramos un toast de error.
                showToast("Error", "File size must be less than 2MB", "error");
                // Reseteamos el estado `selectedFile` a `null`.
                setSelectedFile(null);
                // Salimos de la función.
                return;
            }
            // Si el archivo es válido, creamos una instancia de `FileReader`.
            // `FileReader` nos permite leer el contenido de los archivos de forma asíncrona.
            const reader = new FileReader();

            // `onloadend` es un evento que se dispara cuando la lectura del archivo ha finalizado.
            reader.onloadend = () => {
                // `reader.result` contiene la URL de datos (en formato base64) del archivo.
                // Actualizamos el estado `selectedFile` con esta URL.
                setSelectedFile(reader.result);
            };

            // Iniciamos la lectura del archivo. `readAsDataURL` convierte el archivo en una URL de datos.
            reader.readAsDataURL(file);
        } else {
            // Si no se seleccionó un archivo o el archivo no es una imagen, mostramos un error.
            showToast("Error", "Please select an image file", "error");
            setSelectedFile(null);
        }
    };

    // El hook devuelve el estado `selectedFile`, la función `handleImageChange` para manejar el cambio,
    // y la función `setSelectedFile` para poder resetear la previsualización desde fuera si es necesario.
    return { selectedFile, handleImageChange, setSelectedFile };
};

export default usePreviewImg;
