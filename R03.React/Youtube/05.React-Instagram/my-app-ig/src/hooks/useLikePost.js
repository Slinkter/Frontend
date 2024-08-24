import React, { useState } from "react";
import useAuthStore from "../store/authStore";
import { useStatStyles } from "@chakra-ui/react";
import useShowToast from "./useShowToast";
import { auth, firestore } from "../firebase/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const useLikePost = (post) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [likes, setLikes] = useState(post.likes.length);
    const authUser = useAuthStore((state) => state.user);
    const [isLiked, setIsLiked] = useState(post.likes.includes(authUser?.uid));
    const showToast = useShowToast();
    //
    const handleLikePost = async () => {
        if (isUpdating) return;
        if (!authUser) return showToast("Error", "you must be logged", "error");
        //
        setIsUpdating(true);
        //
        try {
            // save firebase
            const postRef = doc(firestore, "posts", post.id);

            await updateDoc(postRef, {
                likes: isLiked
                    ? arrayRemove(authUser.uid)
                    : arrayUnion(authUser.uid),
            });
            // save store
            setIsLiked(!isLiked);
            isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsUpdating(false);
        }
    };

    return { isLiked, likes, handleLikePost, isUpdating };
};

export default useLikePost;
