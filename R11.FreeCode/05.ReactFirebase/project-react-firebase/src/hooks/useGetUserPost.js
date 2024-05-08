import React, { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetUserPost = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts } = usePostStore();
  const showToast = useShowToast();
  const userProfile = useUserProfileStore((state) => state.userProfile);

  useEffect(() => {
    const getPost = async () => {
      if (!userProfile) {
        return;
      }
      setIsLoading(true);
      setPosts([]);
      try {
        const q = query(
          collection(firestore, "posts"),
          where("createBy", "==", userProfile.uid)
        );
        const querySnapshot = await getDocs(q);

        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });

        posts.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(posts);
      } catch (error) {
        setPosts([]);
        showToast("Error", error.message, "error");
        console.log(error);
      }
    };
    getPost();
  }, [setPosts, userProfile, showToast]);

  return { isLoading, posts };
};

export default useGetUserPost;
