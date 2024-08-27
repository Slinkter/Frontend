import React, { useState } from "react";
import useAuthStore from "../store/authStore";
import usePostStore from "../store/postStore";
import useUserProfileStore from "../store/userProfileStore";
import { useLocation } from "react-router-dom";
import useShowToast from "./useShowToast";
import {
    addDoc,
    arrayUnion,
    collection,
    doc,
    updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";

const useCreatePost = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthStore();
    const { createPost } = usePostStore();
    const { addPost } = useUserProfileStore();
    const { userProfile } = useUserProfileStore();
    const { pathname } = useLocation();
    const showToast = useShowToast();
    //
    const handleCreatePost = async (selectedFile, caption) => {
        if (isLoading) return;
        if (!selectedFile) {
            throw new Error("Please select an image");
        }
        setIsLoading(true);
        const newPost = {
            caption: caption,
            likes: [],
            comments: [],
            createdAt: Date.now(),
            createdBy: user.uid,
        };
        try {
            setIsLoading(true);

            //
            const postCollectionRef = collection(firestore, "posts");
            const postDocRef = await addDoc(postCollectionRef, newPost);
            const imageRef = ref(storage, `posts/${postDocRef.id}`);
            //
            const userDocRef = doc(firestore, "users", user.uid);
            const updatePosts = { posts: arrayUnion(postDocRef.id) };
            await updateDoc(userDocRef, updatePosts);
            //
            await uploadString(imageRef, selectedFile, "data_url");
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(postDocRef, { imageURL: downloadURL });
            newPost.imageURL = downloadURL;
            if (userProfile.uid === user.uid) {
                createPost({ ...newPost, id: postDocRef.id });
            }
            if (pathname !== "/" && userProfile.uid === user.uid) {
                addPost({ ...newPost, id: postDocRef.id });
            }
            showToast("Success", "Post created successfully", "error");
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, handleCreatePost };
};

export default useCreatePost;
