import React, { useState } from "react";
import useAuthStore from "../store/authStore";
import { useStatStyles } from "@chakra-ui/react";
import useShowToast from "./useShowToast";
import { auth, firestore } from "../firebase/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const useLikePost = (post) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [likes, setLikes] = useState(post.likes.length);
    const { user } = useAuthStore();
    const [isLiked, setIsLiked] = useState(post.likes.includes(user?.uid));
    const showToast = useShowToast();
    //
    const handleLikePost = async () => {
        if (isUpdating) return;
        if (!auth) return showToast("Error", "you must be logged", "error");
        //
        setIsUpdating(true);
        //
        try {
            // save firebase
            const postRef = doc(firestore, "posts", post.id);
            const updateLikes = {
                likes: isLiked ? arrayRemove(user.id) : arrayUnion(user.id),
            };
            await updateDoc(postRef, updateLikes);
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
