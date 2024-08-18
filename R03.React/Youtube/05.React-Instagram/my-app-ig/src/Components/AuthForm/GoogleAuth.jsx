import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Flex, Image, Text } from "@chakra-ui/react";

const GoogleAuth = ({ prefix }) => {
    const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
    const showToast = useShowToast();
    const loginUser = useAuthStore((state) => state.login);
    //
    const handleGoogleAuth = async () => {
        try {
            const newUser = await signInWithGoogle();
            if (!newUser && error) {
                showToast("error", error.message, "error");
                return;
            }

            const userRef = doc(firestore, "users", newUser.user.uid);
            const userSnap = await getDoc(userRef); // exec
            if (userSnap.exists()) {
                const userDoc = userSnap.data();
                loginUser(userDoc);
                localStorage.setItem("user-info", JSON.stringify(userDoc));
            } else {
                let userDoc = {};
                userDoc.uid = newUser.user.uid;
                userDoc.email = newUser.user.email;
                userDoc.username = newUser.user.email.split("@")[0];
                userDoc.fullName = newUser.user.displayName;
                userDoc.bio = "";
                userDoc.profilePicURL = newUser.user.photoURL;
                userDoc.followers = [];
                userDoc.following = [];
                userDoc.posts = [];
                userDoc.createdAt = Date.now();
                //
                const userRef2 = doc(firestore, "users", newUser.user.uid);
                await setDoc(userRef2, userDoc);
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc);
            }
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    return (
        <Flex
            justifyContent={"center"}
            alignItems={"center"}
            cursor={"pointer"}
            onClick={handleGoogleAuth}
        >
            <Image src="/google.png" w={5} alt="google logo" />
            <Text mx={2} color={"blue.500"}>
                {prefix} with google
            </Text>
        </Flex>
    );
};

export default GoogleAuth;
