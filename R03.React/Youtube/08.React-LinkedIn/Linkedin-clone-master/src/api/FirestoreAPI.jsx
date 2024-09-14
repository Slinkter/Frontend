// Importamos las configuraciones de Firestore desde un archivo de configuración
import { firestore } from "../../firebaseConfig";
// Importamos funciones de Firebase Firestore necesarias para realizar operaciones CRUD y consultas
import {
    addDoc, // Función para agregar documentos a las colecciones
    collection, // Función para obtener una referencia a una colección
    onSnapshot, // Función para escuchar cambios en tiempo real en una colección o documento
    doc, // Función para obtener una referencia a un documento
    updateDoc, // Función para actualizar un documento existente
    query, // Función para crear consultas
    where, // Función para filtrar resultados en una consulta
    setDoc, // Función para establecer un documento con un ID específico
    deleteDoc, // Función para eliminar un documento
    orderBy, // Función para ordenar los resultados de una consulta
    serverTimestamp, // Función para obtener la marca de tiempo del servidor
} from "firebase/firestore";
// Importamos la librería de notificaciones
import { toast } from "react-toastify";

// Referencias a las colecciones en Firestore
let postsRef = collection(firestore, "posts"); // Referencia a la colección "posts"
let userRef = collection(firestore, "users"); // Referencia a la colección "users"
let likeRef = collection(firestore, "likes"); // Referencia a la colección "likes"
let commentsRef = collection(firestore, "comments"); // Referencia a la colección "comments"
let connectionRef = collection(firestore, "connections"); // Referencia a la colección "connections"

// Función para agregar un nuevo post a la colección 'posts'
export const postStatus = (object) => {
    addDoc(postsRef, object) // Agrega un nuevo documento a la colección "posts" con los datos del objeto proporcionado
        .then(() => {
            toast.success("Post has been added successfully"); // Muestra una notificación de éxito si el post se agrega correctamente
        })
        .catch((err) => {
            console.log(err); // Muestra un error en la consola si ocurre algún problema
        });
};

// Función para obtener todos los posts, ordenados por la marca de tiempo
export const getStatus = (setAllStatus) => {
    const q = query(postsRef, orderBy("timeStamp")); // Crea una consulta que ordena los documentos en "posts" por el campo "timeStamp"
    onSnapshot(q, (response) => {
        // Escucha cambios en tiempo real de la consulta
        setAllStatus(
            response.docs.map((docs) => {
                // Mapea los documentos recibidos en un formato más manejable
                return { ...docs.data(), id: docs.id }; // Devuelve los datos del documento junto con su ID
            })
        );
    });
};

// Función para obtener todos los usuarios
export const getAllUsers = (setAllUsers) => {
    onSnapshot(userRef, (response) => {
        // Escucha cambios en tiempo real en la colección "users"
        setAllUsers(
            response.docs.map((docs) => {
                // Mapea los documentos recibidos en un formato más manejable
                return { ...docs.data(), id: docs.id }; // Devuelve los datos del documento junto con su ID
            })
        );
    });
};

// Función para obtener los posts de un usuario específico
export const getSingleStatus = (setAllStatus, id) => {
    const singlePostQuery = query(postsRef, where("userID", "==", id)); // Crea una consulta para obtener posts con un userID específico
    onSnapshot(singlePostQuery, (response) => {
        // Escucha cambios en tiempo real de la consulta
        setAllStatus(
            response.docs.map((docs) => {
                // Mapea los documentos recibidos en un formato más manejable
                return { ...docs.data(), id: docs.id }; // Devuelve los datos del documento junto con su ID
            })
        );
    });
};

// Función para obtener un usuario específico por su correo electrónico
export const getSingleUser = (setCurrentUser, email) => {
    const singleUserQuery = query(userRef, where("email", "==", email)); // Crea una consulta para obtener usuarios con un email específico
    onSnapshot(singleUserQuery, (response) => {
        // Escucha cambios en tiempo real de la consulta
        setCurrentUser(
            response.docs.map((docs) => {
                // Mapea los documentos recibidos en un formato más manejable
                return { ...docs.data(), id: docs.id }; // Devuelve los datos del documento junto con su ID
            })[0] // Devuelve el primer resultado de la consulta (se espera que solo haya uno)
        );
    });
};

// Función para agregar datos de usuario a la colección 'users'
export const postUserData = (object) => {
    addDoc(userRef, object) // Agrega un nuevo documento a la colección "users" con los datos del objeto proporcionado
        .then(() => {}) // No hace nada adicional en caso de éxito
        .catch((err) => {
            console.log(err); // Muestra un error en la consola si ocurre algún problema
        });
};

// Función para obtener los datos del usuario actual, utilizando el correo almacenado en localStorage
export const getCurrentUser = (setCurrentUser) => {
    onSnapshot(userRef, (response) => {
        // Escucha cambios en tiempo real en la colección "users"
        setCurrentUser(
            response.docs
                .map((docs) => {
                    // Mapea los documentos recibidos en un formato más manejable
                    return { ...docs.data(), id: docs.id }; // Devuelve los datos del documento junto con su ID
                })
                .filter((item) => {
                    // Filtra los documentos para encontrar el usuario con el correo almacenado en localStorage
                    return item.email === localStorage.getItem("userEmail");
                })[0] // Devuelve el primer resultado del filtro (se espera que solo haya uno)
        );
    });
};

// Función para editar el perfil de un usuario específico
export const editProfile = (userID, payload) => {
    let userToEdit = doc(userRef, userID); // Obtiene una referencia al documento del usuario a editar

    updateDoc(userToEdit, payload) // Actualiza el documento del usuario con los datos proporcionados en el payload
        .then(() => {
            toast.success("Profile has been updated successfully"); // Muestra una notificación de éxito si el perfil se actualiza correctamente
        })
        .catch((err) => {
            console.log(err); // Muestra un error en la consola si ocurre algún problema
        });
};

// Función para gestionar los likes en los posts
export const likePost = (userId, postId, liked) => {
    try {
        let docToLike = doc(likeRef, `${userId}_${postId}`); // Crea una referencia al documento de like usando una combinación de userId y postId
        if (liked) {
            deleteDoc(docToLike); // Si el post ya está liked, elimina el documento de like
        } else {
            setDoc(docToLike, { userId, postId }); // Si el post no está liked, crea un nuevo documento de like
        }
    } catch (err) {
        console.log(err); // Muestra un error en la consola si ocurre algún problema
    }
};

// Función para obtener los likes de un post específico y verificar si el usuario actual ha dado like
export const getLikesByUser = (userId, postId, setLiked, setLikesCount) => {
    try {
        let likeQuery = query(likeRef, where("postId", "==", postId)); // Crea una consulta para obtener los likes de un post específico

        onSnapshot(likeQuery, (response) => {
            // Escucha cambios en tiempo real de la consulta
            let likes = response.docs.map((doc) => doc.data()); // Mapea los documentos recibidos en un formato más manejable
            let likesCount = likes?.length; // Cuenta el número de likes

            const isLiked = likes.some((like) => like.userId === userId); // Verifica si el usuario actual ha dado like

            setLikesCount(likesCount); // Actualiza el estado del contador de likes
            setLiked(isLiked); // Actualiza el estado de si el usuario ha dado like o no
        });
    } catch (err) {
        console.log(err); // Muestra un error en la consola si ocurre algún problema
    }
};

// Función para agregar un comentario a un post
export const postComment = (postId, comment, timeStamp, name) => {
    try {
        addDoc(commentsRef, {
            postId, // ID del post al que se le agrega el comentario
            comment, // Texto del comentario
            timeStamp, // Marca de tiempo del comentario
            name, // Nombre del usuario que hace el comentario
        });
    } catch (err) {
        console.log(err); // Muestra un error en la consola si ocurre algún problema
    }
};

// Función para obtener los comentarios de un post específico

export const getComments = (postId, setComments) => {
    try {
        let singlePostQuery = query(commentsRef, where("postId", "==", postId)); // Crea una consulta para obtener comentarios de un post específico

        onSnapshot(singlePostQuery, (response) => {
            // Escucha cambios en tiempo real de la consulta
            const comments = response.docs.map((doc) => {
                // Mapea los documentos recibidos en un formato más manejable
                return {
                    id: doc.id, // ID del comentario
                    ...doc.data(), // Datos del comentario
                };
            });

            setComments(comments); // Actualiza el estado de los comentarios
        });
    } catch (err) {
        console.log(err); // Muestra un error en la consola si ocurre algún problema
    }
};

// Función para actualizar un post específico
export const updatePost = (id, status, postImage) => {
    let docToUpdate = doc(postsRef, id); // Obtiene una referencia al documento del post a actualizar
    try {
        updateDoc(docToUpdate, { status, postImage }); // Actualiza el documento del post con el nuevo estado y la nueva imagen
        toast.success("Post has been updated!"); // Muestra una notificación de éxito si el post se actualiza correctamente
    } catch (err) {
        console.log(err); // Muestra un error en la consola si ocurre algún problema
    }
};

// Función para eliminar un post específico
export const deletePost = (id) => {
    let docToDelete = doc(postsRef, id); // Obtiene una referencia al documento del post a eliminar
    try {
        deleteDoc(docToDelete); // Elimina el documento del post
        toast.success("Post has been Deleted!"); // Muestra una notificación de éxito si el post se elimina correctamente
    } catch (err) {
        console.log(err); // Muestra un error en la consola si ocurre algún problema
    }
};

// Función para agregar una conexión entre dos usuarios
export const addConnection = (userId, targetId) => {
    try {
        let connectionToAdd = doc(connectionRef, `${userId}_${targetId}`); // Crea una referencia al documento de conexión usando una combinación de userId y targetId

        setDoc(connectionToAdd, { userId, targetId }); // Crea un nuevo documento de conexión

        toast.success("Connection Added!"); // Muestra una notificación de éxito si la conexión se agrega correctamente
    } catch (err) {
        console.log(err); // Muestra un error en la consola si ocurre algún problema
    }
};

// Función para obtener conexiones y verificar si hay una conexión entre dos usuarios específicos
export const getConnections = (userId, targetId, setIsConnected) => {
    try {
        let connectionsQuery = query(
            connectionRef, // Crea una consulta en la colección "connections"
            where("targetId", "==", targetId) // Filtra las conexiones por el targetId
        );

        onSnapshot(connectionsQuery, (response) => {
            // Escucha cambios en tiempo real de la consulta
            let connections = response.docs.map((doc) => doc.data()); // Mapea los documentos recibidos en un formato más manejable

            const isConnected = connections.some(
                (connection) => connection.userId === userId // Verifica si el userId está en las conexiones
            );

            setIsConnected(isConnected); // Actualiza el estado de si hay una conexión o no
        });
    } catch (err) {
        console.log(err); // Muestra un error en la consola si ocurre algún problema
    }
};
