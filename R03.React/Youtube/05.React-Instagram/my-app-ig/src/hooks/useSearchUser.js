import React, { useState } from "react";
import useShowToast from "../../../instagram-clone-master/src/hooks/useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useSearchUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const showToast = useShowToast();
    //
    const getUserProfile = async (username) => {
        try {
            setIsLoading(true);
            setUser(null);
            const q = query(
                collection(firestore, "users"),
                where("username", "==", username)
            );
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                showToast("Error", "User not found", "error"); // Muestra un mensaje de error
                return;
            }
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (error) {
            showToast("Error", error.message, "error");
            setUser(null);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, getUserProfile, user, setUser };
};

export default useSearchUser;
