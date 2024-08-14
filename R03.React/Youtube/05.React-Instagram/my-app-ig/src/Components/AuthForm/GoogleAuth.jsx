import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";

const GoogleAuth = () => {
    const [] = useSignInWithGoogle(auth);
    const showToast = useShowToast();
    /*    const loginUser = useAuthStore(state => state.login)
     */
    return <div>GoogleAuth</div>;
};

export default GoogleAuth;
