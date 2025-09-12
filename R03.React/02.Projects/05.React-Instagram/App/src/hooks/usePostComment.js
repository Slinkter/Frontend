import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/postStore";

const usePostComment = () => {
    // state simple
    const [isCommenting, setIsCommenting] = useState(false);
    // state zunstand
    const authUser = useAuthStore((state) => state.user);
    const addComment = usePostStore((state) => state.addComment);
    const showToast = useShowToast();

    const handlePostComment = async (postId, comment) => {
        if (isCommenting) return;
        if (!authUser)
            return showToast(
                "Error",
                "You must be logged in to comment",
                "error"
            );
        setIsCommenting(true);

        try {
            const newComment = {
                postId,
                comment,
                createdAt: Date.now(),
                createdBy: authUser.uid,
            };
            const q = doc(firestore, "posts", postId);
            await updateDoc(q, {
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
