export const uploadPostImage = (
    file, // Archivo de imagen a subir. (file.name)
    setPostImage, // Función para establecer la URL de la imagen del post.
    setProgress // Función para actualizar el progreso de la subida.
) => {
    // Crea una referencia en el almacenamiento de Firebase para la imagen del post con el nombre del archivo.
    const postPicsRef = ref(storage, `postImages/${file.name}`);
    // Inicia la tarea de subida del archivo.
    const uploadTask = uploadBytesResumable(postPicsRef, file);

    // Define los manejadores de eventos para la tarea de subida.
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            // Calcula el progreso de la subida en porcentaje.
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            // Actualiza el estado del progreso.
            setProgress(progress);
        },
        () => {
            // Obtiene la URL de descarga una vez que la subida ha finalizado.
            getDownloadURL(uploadTask.snapshot.ref).then((res) => {
                setPostImage(res); // Establece la URL de la imagen del post.
            });
        },
        (error) => {
            console.error(error); // Maneja errores durante la subida.
        }
    );
};
