import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetUserProfileById = (userId) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userProfile, setUserProfile] = useState(null);
    const showToast = useShowToast();
    /*  */
    const getUserProfile = async () => {
        try {
            setIsLoading(true);
            setUserProfile(null);
            const docRef = doc(firestore, "users", userId);
            const userRef = await getDoc(docRef);

            /*  */
            if (userRef.exists()) {
                setUserProfile(userRef.data());
            }
        } catch (error) {
            // Mostrar un mensaje de error si algo sale mal
            showToast("Error", error.message, "error");
        } finally {
            setIsLoading(false); // Marcar que se ha terminado de cargar el perfil
        }
    };

    useEffect(() => {
        getUserProfile();
    }, [showToast, setUserProfile, userId]);

    return { isLoading, userProfile, setUserProfile };
};

export default useGetUserProfileById;
