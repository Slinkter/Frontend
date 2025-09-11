import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetFeedPosts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const authUser = useAuthStore((state) => state.user);
    //
    const { posts, setPosts } = usePostStore();
    const { setUserProfile } = useUserProfileStore();
    //
    const showToast = useShowToast();

    useEffect(() => {
        const getFeedPosts = async () => {
            setIsLoading(true);

            try {
                if (authUser.following.length === 0) {
                    setIsLoading(false);
                    setPosts([]);
                    return;
                }
                const q = query(
                    collection(firestore, "posts"),
                    where("createdBy", "in", authUser.following)
                );
                const querySnapshot = await getDocs(q);
                const feedPosts = [];

                querySnapshot.forEach((doc) => {
                    feedPosts.push({ id: doc.id, ...doc.data() });
                });

                feedPosts.sort((a, b) => b.createdAt - a.createdAt);
                setPosts(feedPosts);
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        };

        if (authUser) getFeedPosts();
    }, [authUser, showToast, setPosts, setUserProfile]);

    return { isLoading, posts };
};

export default useGetFeedPosts;
