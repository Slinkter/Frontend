import { query } from "firebase/database";
import { collection, getDocs, where } from "firebase/firestore";
import React, { useState } from "react";
import { firestore } from "../firebase/config";
import useShowToast from "./useShowToast";

const useSearchUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const showToast = useShowToast();

    const getUserProfile = async (username) => {
        try {
            setIsLoading(true);
            setUser(null);
            const q = query(
                collection(firestore, "users"),
                where("username", "==", username)
            );
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty)
                return showToast("Error", "user not found", "error");
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (error) {
            showToast("Error", error.message, "error");
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, getUserProfile, user, setUser };
};

export default useSearchUser;
