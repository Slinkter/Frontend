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

// Función para obtener todos los posts,
// Crea una consulta que ordena los documentos en "posts" por el campo "timeStamp"
// Escucha cambios en tiempo real de la consulta
export const getStatus = (setAllStatus) => {
    const q = query(postsRef, orderBy("timeStamp"));
    onSnapshot(q, (response) => {
        setAllStatus(
            response.docs.map((docs) => {
                return { ...docs.data(), id: docs.id };
            })
        );
    });
};

// Función para obtener todos los usuarios
// Escucha cambios en tiempo real en la colección "users"
// Mapea los documentos recibidos en un formato más manejable
// Devuelve los datos del documento junto con su ID
export const getAllUsers = (setAllUsers) => {
    onSnapshot(userRef, (response) => {
        setAllUsers(
            response.docs.map((docs) => {
                return { ...docs.data(), id: docs.id };
            })
        );
    });
};

// Función para obtener los posts de un usuario específico
// Crea una consulta para obtener posts con un userID específico
// Escucha cambios en tiempo real de la consulta
// Mapea los documentos recibidos en un formato más manejable
// Devuelve los datos del documento junto con su ID
export const getSingleStatus = (setAllStatus, id) => {
    const singlePostQuery = query(postsRef, where("userID", "==", id));
    onSnapshot(singlePostQuery, (response) => {
        setAllStatus(
            response.docs.map((docs) => {
                return { ...docs.data(), id: docs.id };
            })
        );
    });
};

// Función para obtener un usuario específico por su correo electrónico
// Crea una consulta para obtener usuarios con un email específico
// Escucha cambios en tiempo real de la consulta
// Mapea los documentos recibidos en un formato más manejable
// Devuelve los datos del documento junto con su ID
// Devuelve el primer resultado de la consulta (se espera que solo haya uno)
export const getSingleUser = (setCurrentUser, email) => {
    const singleUserQuery = query(userRef, where("email", "==", email));
    onSnapshot(singleUserQuery, (response) => {
        setCurrentUser(
            response.docs.map((docs) => {
                return { ...docs.data(), id: docs.id };
            })[0]
        );
    });
};

// Función para agregar datos de usuario a la colección 'users'
// Agrega un nuevo documento a la colección "users" con los datos del objeto proporcionado
// No hace nada adicional en caso de éxito
// Muestra un error en la consola si ocurre algún problema
export const postUserData = (object) => {
    addDoc(userRef, object)
        .then(() => {})
        .catch((err) => {
            console.log(err);
        });
};

// Función para obtener los datos del usuario actual, utilizando el correo almacenado en localStorage
// Escucha cambios en tiempo real en la colección "users"
// Mapea los documentos recibidos en un formato más manejable
// Devuelve los datos del documento junto con su ID
// Filtra los documentos para encontrar el usuario con el correo almacenado en localStorage
// Devuelve el primer resultado del filtro (se espera que solo haya uno)
export const getCurrentUser = (setCurrentUser) => {
    onSnapshot(userRef, (response) => {
        setCurrentUser(
            response.docs
                .map((docs) => {
                    return { ...docs.data(), id: docs.id };
                })
                .filter((item) => {
                    return item.email === localStorage.getItem("userEmail");
                })[0]
        );
    });
};

// Función para editar el perfil de un usuario específico
// Obtiene una referencia al documento del usuario a editar
// Actualiza el documento del usuario con los datos proporcionados en el payload
// Muestra una notificación de éxito si el perfil se actualiza correctamente
// Muestra un error en la consola si ocurre algún problema
export const editProfile = (userID, payload) => {
    let userToEdit = doc(userRef, userID);
    updateDoc(userToEdit, payload)
        .then(() => {
            toast.success("Profile has been updated successfully");
        })
        .catch((err) => {
            console.log(err);
        });
};

// Función para gestionar los likes en los posts
// Crea una referencia al documento de like usando una combinación de userId y postId
// Si el post ya está liked, elimina el documento de like
// Si el post no está liked, crea un nuevo documento de like
// Muestra un error en la consola si ocurre algún problema
export const likePost = (userId, postId, liked) => {
    try {
        let docToLike = doc(likeRef, `${userId}_${postId}`);
        if (liked) {
            deleteDoc(docToLike);
        } else {
            setDoc(docToLike, { userId, postId });
        }
    } catch (err) {
        console.log(err);
    }
};

// Función para obtener los likes de un post específico y verificar si el usuario actual ha dado like
// Crea una consulta para obtener los likes de un post específico
// Escucha cambios en tiempo real de la consulta
// Mapea los documentos recibidos en un formato más manejable
// Cuenta el número de likes
// Verifica si el usuario actual ha dado like
// Actualiza el estado del contador de likes
// Actualiza el estado de si el usuario ha dado like o no
// Muestra un error en la consola si ocurre algún problema
export const getLikesByUser = (userId, postId, setLiked, setLikesCount) => {
    try {
        let likeQuery = query(likeRef, where("postId", "==", postId));
        onSnapshot(likeQuery, (response) => {
            let likes = response.docs.map((doc) => doc.data());
            let likesCount = likes?.length;
            const isLiked = likes.some((like) => like.userId === userId);
            setLikesCount(likesCount);
            setLiked(isLiked);
        });
    } catch (err) {
        console.log(err);
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
        console.log(err);
    }
};

// Función para obtener los comentarios de un post específico
// Crea una consulta para obtener comentarios de un post específico
// Escucha cambios en tiempo real de la consulta
// Mapea los documentos recibidos en un formato más manejable
// ID del comentario
// Datos del comentario
// Actualiza el estado de los comentarios
export const getComments = (postId, setComments) => {
    try {
        let singlePostQuery = query(commentsRef, where("postId", "==", postId));
        //
        onSnapshot(singlePostQuery, (response) => {
            const comments = response.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                };
            });
            setComments(comments);
        });
    } catch (err) {
        console.log(err); // Muestra un error en la consola si ocurre algún problema
    }
};

// Función para actualizar un post específico
// Obtiene una referencia al documento del post a actualizar
// Actualiza el documento del post con el nuevo estado y la nueva imagen
// Muestra una notificación de éxito si el post se actualiza correctamente
// Muestra un error en la consola si ocurre algún problema
export const updatePost = (id, status, postImage) => {
    try {
        let docToUpdate = doc(postsRef, id);
        updateDoc(docToUpdate, { status, postImage });
        toast.success("Post has been updated!");
    } catch (err) {
        console.log(err);
    }
};

// Función para eliminar un post específico
// Obtiene una referencia al documento del post a eliminar
// Elimina el documento del post
// Muestra una notificación de éxito si el post se elimina correctamente
// Muestra un error en la consola si ocurre algún problema
export const deletePost = (id) => {
    let docToDelete = doc(postsRef, id);
    try {
        deleteDoc(docToDelete);
        toast.success("Post has been Deleted!");
    } catch (err) {
        console.log(err);
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
