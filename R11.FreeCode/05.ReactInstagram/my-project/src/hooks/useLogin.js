import React from "react";
import useShowToast from "./useShowToast";

import { useSignInWithEmailAndPassword as loginEmail } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/config";
import useAuthStore from "../store/authStore";
import { doc, getDoc } from "firebase/firestore";

const useLogin = () => {
    const showToast = useShowToast();
    const loginUser = useAuthStore((state) => state.login);
    const [signInWithEmailAndPassword, user, loading, error] = loginEmail(auth);

    const login = async (inputs) => {
        if (!inputs.email || !inputs.password) {
            return;
        }

        try {
            const userCred = await signInWithEmailAndPassword(
                inputs.email,
                inputs.password
            );

            if (userCred) {
                const docRef = doc(firestore, "users", userCred.user.uid);
                const docSnap = await getDoc(docRef);
                localStorage.setItem(
                    "user-info",
                    JSON.stringify(docSnap.data())
                );
                loginUser(docSnap.data());
            }
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            showToast("finally", "finally", "finally");
        }
    };

    return { loading, error, login };
};

export default useLogin;
