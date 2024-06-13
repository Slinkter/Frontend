import { useState } from "react";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userStore";
import useShowToast from "./useShowToast";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../firebase/config";

const useEditProfile = () => {
    //Hook
    const [isUpdating, setIsUpdating] = useState(false);
    // Zunstand
    const authUser = useAuthStore((state) => state.user);
    const setAuthUser = useAuthStore((state) => state.setUser);
    const setUserProfile = useUserProfileStore((state) => state.setUserProfile);
    // Show Alert
    const showToast = useShowToast();

    const editProfile = async (inputs, selectedFile) => {
        if (isUpdating || !authUser) {
            return;
        }
        setIsUpdating(true);
        //
        const storageRef = ref(storageRef, `profilePics/${authUser.uid}`);
        const userDocRef = doc(firestore, "users", authUser.uid);
        let URL = "";
        try {
            if (selectedFile) {
                await uploadString(storageRef, selectedFile, "data_url");
                URL = await getDownloadURL(
                    ref(storage, `profilePics/${authUser.uid}`)
                );
            }
            const updateUser = {
                fullName: inputs.fullName || authUser.fullName,
                username: inputs.username || authUser.username,
                bio: inputs.bio || authUser.bio,
                profilePicURL: URL || authUser.profilePicURL,
                ...authUser,
            };
            // update
            localStorage.setItem("user-info", JSON.stringify(updateUser));
            await updateDoc(userDocRef, updateUser);
            setAuthUser(updateUser);
            setUserProfile(updateUser);
            //
            showToast("Success", "Profile update successfully", "success");
        } catch (error) {
            console.log(error);
            showToast("Error", error.message, "error");
        }
    };

    return { isUpdating, editProfile };
};

export default useEditProfile;
