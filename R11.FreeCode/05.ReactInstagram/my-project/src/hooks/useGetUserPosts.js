import React, { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/config";

const useGetUserPosts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { posts, setPosts } = usePostStore();
    const showToast = useShowToast();
    const userProfile = useUserProfileStore((state) => state.userProfile);

    useEffect(() => {
        setIsLoading(true);
        const getPosts = async () => {
            if (!userProfile) {
                return;
            }
            setPosts([]);

            try {
                const posts = [];
                const q = query(
                    collection(firestore, "posts"),
                    where("createdBy", "==", userProfile.uid)
                );
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    posts.push({ id: doc.id, ...doc.data() });
                });

                posts.sort((a, b) => b.createdAt - a.createdAt);
                setPosts(posts);
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        };
        getPosts();
    }, [setPosts, userProfile, showToast]);

    return { isLoading, posts };
};

export default useGetUserPosts;
