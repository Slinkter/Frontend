import React, { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetUserPosts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { posts, setPosts } = usePostStore();
    const userProfile = useUserProfileStore((state) => state.userProfile);
    const showToast = useShowToast();
    //
    console.log(userProfile);
    //
    const getPosts = async () => {
        try {
            if (!userProfile) return;
            setIsLoading(true);
            setPosts([]);
            const q = query(
                collection(firestore, "posts"),
                where("createdBy", "==", userProfile.uid)
            );
            const querySnapshot = await getDocs(q);
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push({ id: doc.id, ...doc.data() });
            });
            posts.sort((a, b) => b.createdAt - a.createdAt);
            setPosts(posts);
        } catch (error) {
            showToast("Error", error.message, "error");
            setPosts([]);
        } finally {
            setIsLoading(false);
        }
    };
    //
    useEffect(() => {
        getPosts();
    }, [setPosts, userProfile, showToast]);

    return { isLoading, posts };
};
export default useGetUserPosts;
