import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useFollowUser = (userId) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const setAuthUser = useAuthStore((state) => state.setUser);
    const { userProfile, setUserProfile } = useUserProfileStore();
    const showToast = useShowToast();
    /*  */
    const handleFollowUser = async () => {
        setIsUpdating(true); // Establecer el estado de actualización a true
        try {
            // Referencias a los documentos de Firestore para el usuario autenticado y
            // el usuario a seguir/dejar de seguir
            const currentUserRef = doc(firestore, "users", authUser.uid);
            const userToFollowOrUnfollowRef = doc(firestore, "users", userId);

            // Actualizar el documento del usuario autenticado para añadir o quitar el userId de la lista de following
            await updateDoc(currentUserRef, {
                following: isFollowing
                    ? arrayRemove(userId)
                    : arrayUnion(userId),
            });

            // Actualizar el documento del usuario seguido para añadir o quitar el uid del usuario autenticado de la lista de followers
            await updateDoc(userToFollowOrUnfollowRef, {
                followers: isFollowing
                    ? arrayRemove(authUser.uid)
                    : arrayUnion(authUser.uid),
            });

            if (isFollowing) {
                // Si el usuario ya sigue al userId, dejar de seguir
                setAuthUser({
                    ...authUser,
                    following: authUser.following.filter(
                        (uid) => uid !== userId
                    ),
                });
                if (userProfile) {
                    setUserProfile({
                        ...userProfile,
                        followers: userProfile.followers.filter(
                            (uid) => uid !== authUser.uid
                        ),
                    });
                }

                // Actualizar la información del usuario autenticado en localStorage
                localStorage.setItem(
                    "user-info",
                    JSON.stringify({
                        ...authUser,
                        following: authUser.following.filter(
                            (uid) => uid !== userId
                        ),
                    })
                );
                setIsFollowing(false); // Actualizar el estado de seguimiento a false
            } else {
                // Si el usuario no sigue al userId, empezar a seguir
                setAuthUser({
                    ...authUser,
                    following: [...authUser.following, userId],
                });

                if (userProfile) {
                    setUserProfile({
                        ...userProfile,
                        followers: [...userProfile.followers, authUser.uid],
                    });
                }

                // Actualizar la información del usuario autenticado en localStorage
                localStorage.setItem(
                    "user-info",
                    JSON.stringify({
                        ...authUser,
                        following: [...authUser.following, userId],
                    })
                );
                setIsFollowing(true); // Actualizar el estado de seguimiento a true
            }
        } catch (error) {
            // Mostrar un mensaje de error si algo sale mal
            showToast("Error", error.message, "error");
        } finally {
            setIsUpdating(false); // Restablecer el estado de actualización a false
        }
    };

    useEffect(() => {
        if (authUser) {
            const isFollowing = authUser.following.includes(userId);
            setIsFollowing(isFollowing);
        }
    }, [authUser, userId]);

    return { isUpdating, isFollowing, handleFollowUser };
};

export default useFollowUser;
