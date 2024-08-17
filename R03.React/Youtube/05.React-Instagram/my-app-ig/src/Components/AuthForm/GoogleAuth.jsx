import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";

const GoogleAuth = () => {
    const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
    const showToast = useShowToast();

    return <div>GoogleAuth</div>;
};

export default GoogleAuth;
