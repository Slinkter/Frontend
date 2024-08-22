import React, { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import usePostStore from "../store/postStore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const usePostComment = () => {
    const [isCommenting, setisCommenting] = useState(false);
    const showToast = useShowToast();
    const { user } = useAuthStore();
    const { addComment } = usePostStore();
    //
    const handlePostComment = async (postId, comment) => {
        if (isCommenting) return;
        if (!user) return showToast("Error", "You must be logged ", "error");
        //
        let newComment = {};
        newComment.createdAt = Date.now();
        newComment.createdBt = user.uid;
        newComment.postId = postId;
        //
        try {
            addComment(postId, newComment); // store
            const docRef = doc(firestore, "posts", postId);
            const fieldRef = { comments: arrayUnion(newComment) };
            //--->
            await updateDoc(docRef, fieldRef);
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setisCommenting(false);
        }
    };

    return { isCommenting, handlePostComment };
};

export default usePostComment;
