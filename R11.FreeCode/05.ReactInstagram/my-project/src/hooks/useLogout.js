import React from "react";
import useShowToast from "./useShowToast";
import { auth } from "../firebase/config";
import { useSignOut } from "react-firebase-hooks/auth";
import useAuthStore from "../store/authStore";

const useLogout = () => {
    const showToast = useShowToast();

    const [signOut, loading, error] = useSignOut(auth);
    const logoutUser = useAuthStore((state) => state.logout);

    const handleLogout = async () => {
        try {
            await signOut();
            localStorage.removeItem("user-info");
            logoutUser();
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    return { handleLogout, loading, error };
};

export default useLogout;
