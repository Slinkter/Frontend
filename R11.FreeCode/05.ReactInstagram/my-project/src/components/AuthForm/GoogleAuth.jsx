import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/config";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { json } from "react-router-dom";
import { Flex, Image, Text } from "@chakra-ui/react";

const GoogleAuth = ({ prefix }) => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const showToast = useShowToast();
    const loginUser = useAuthStore((state) => state.login);
    /*  */
    const handleGoogleAuth = async () => {
        try {
            const newuser = await signInWithGoogle();
            if (!newuser && error) {
                showToast("Error", error.message, "error");
                return;
            }
            const userRef = doc(firestore, "users", newuser.user.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                const userDoc = userSnap.data();
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc);
            } else {
                const userDoc = {
                    uid: newuser.user.uid,
                    email: newuser.user.email,
                    username: newuser.user.email.split("@")[0],
                    fullName: newuser.user.displayName,
                    bio: "",
                    profilePicURL: newuser.user.photoURL,
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now(),
                };
                await setDoc(
                    doc(firestore, "users", newuser.user.uid),
                    userDoc
                );
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc);
            }
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            console.log("handleGoogleAuth : finish google auth");
        }
    };
    console.log("user, loading, error : ", user, loading, error);
    return (
        <Flex
            justifyContent={"center"}
            alignItems={"center"}
            cursor={"pointer"}
            onClick={handleGoogleAuth}
        >
            <Image src="/google.png" w={5} alt="Google Logo" />
            <Text mx={2} color={"blue.500"}>
                {prefix} with Google
            </Text>
        </Flex>
    );
};

export default GoogleAuth;
