import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase/firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { json } from "react-router-dom";

const GoogleAuth = ({ prefix }) => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);

  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle();
      if (!newUser && error) {
        showToast("Error", error.message, "error");
        return;
      }

      const userRef = doc(firestore, "users", newUser.user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        // login
        const userDoc = userSnap.data();
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      } else {
        // sign up
        const userDoc = {
          uid: newUser.user.uid,
          email: newUser.user.email,
          username: newUser.user.email.split("@")[0],
          fullName: newUser.user.displayName,
          bio: "",
          profilePicURL: "",
          followrs: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(doc(firestore, "user", newUser.user.uid), userDoc);
        localStorage.setItem("users-info", JSON.stringify(userDoc));
        loginUser(userDoc);
        console.log();
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      cursor={"pointer"}
      onClick={handleGoogleAuth}
    >
      <Image src="/google.png" w={5} alt="Google logo" />
      <Text mx={2} color={"blue.500"}>
        {prefix} In with google
      </Text>
    </Flex>
  );
};

export default GoogleAuth;
