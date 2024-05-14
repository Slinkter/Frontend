import React, { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { Firestore, arrayUnion, doc, updateDoc } from "firebase/firestore";
import usePostStore from "../store/postStore";

const usePostComment = () => {
  const [isCommenting, setIsCommenting] = useState(false);
  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);
  const addComment = usePostStore((state) => state.addComment);

  const handlePostComment = async (postId, comment) => {
    if (isCommenting) return;
    if (!authUser) return showToast("Error", "you must ");
    setIsCommenting(true);
    const newComment = {
      comment,
      createdAt: Date.now(),
      createdBy: authUser.uid,
      postId,
    };

    try {
      await updateDoc(doc(Firestore, "posts", postId), {
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
