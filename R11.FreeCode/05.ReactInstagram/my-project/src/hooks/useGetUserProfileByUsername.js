import React, { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/config";

const useGetUserProfileByUsername = (username) => {
    const [isLoading, setIsLoading] = useState(true);
    const showToast = useShowToast();
    const { userProfile, setUserProfile } = useUserProfileStore();

    useEffect(() => {
        const getUserProfile = async () => {
            setIsLoading(true);
            try {
                let userDoc;
                const q = query(
                    collection(firestore, "users"),
                    where("username", "==", username)
                );
                const querySnapShot = await getDocs(q);
                if (querySnapShot.empty) return setUserProfile(null);
                querySnapShot.forEach((doc) => {
                    userDoc = doc.data();
                });
                setUserProfile(userDoc);
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        };
        getUserProfile();
    }, [setUserProfile, username, showToast]);

    return { isLoading, userProfile };
};

export default useGetUserProfileByUsername;
