import React, { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetUserProfileByUsername = (username) => {
    const [isLoading, setIsLoading] = useState(true);
    const showToast = useShowToast();
    const { userProfile, setUserProfile } = useUserProfileStore();

    const getUserProfile = async () => {
        try {
            setIsLoading(true);
            //
            const collectionRef = collection(firestore, "users");
            const q = query(collectionRef, where("username", "==", username));
            // exec
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot);
            //
            if (querySnapshot.empty) return setUserProfile(null);
            let userDoc = "";
            querySnapshot.forEach((doc) => {
                userDoc = doc.data();
            });

            setUserProfile(userDoc);
            console.log(userDoc);
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getUserProfile();
    }, [setUserProfile, username, showToast]);

    return { isLoading, userProfile };
};

export default useGetUserProfileByUsername;
