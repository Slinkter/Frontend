import React, { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import usePostStore from "../store/postStore";
import { update } from "firebase/database";
import { arrayUnion, doc } from "firebase/firestore";
import { firestore } from "../firebase/config";

const usePostComment = () => {
    const [isCommenting, setIsCommenting] = useState(false);
    const showToast = useShowToast();
    const authUser = useAuthStore((state) => state.user);
    const addComment = usePostStore((state) => state.addComment);
    const handlePostComment = async (postId, comment) => {
        if (isCommenting) return;
        if (!authUser) return;

        setIsCommenting(true);
        const newComment = {
            postId: postId,
            comment: comment,
            createdAt: Date.now(),
            createdBy: authUser.uid,
        };

        try {
            await update(doc(firestore, "posts", postId), {
                comments: arrayUnion(newComment),
            });
            addComment(postId, newComment);
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsCommenting(false);
        }
    };

    return { isCommenting, handlePostComment };
};

export default usePostComment;
