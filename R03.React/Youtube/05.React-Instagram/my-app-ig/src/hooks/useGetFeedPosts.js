import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { firestore } from "../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const useGetFeedPosts = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { posts, setPosts } = usePostStore();
    const { user } = useAuthStore();
    const { setUserProfile } = useUserProfileStore();
    const showToast = useShowToast();

    const getFeedPosts = async () => {
        setIsLoading(true);
        if (user.following.length === 0) {
            setIsLoading(false);
            setPosts([]);
            return;
        }
        /*  */

        try {
            const refCollectionPost = collection(firestore, "posts");
            const qwhere = where("createdBy", "in", user.following);
            const q = query(refCollectionPost, qwhere);
            const querySnapShot = await getDocs(q);
            const feedPosts = [];
            querySnapShot.forEach((doc) => {
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

    useEffect(() => {
        if (user) {
            getFeedPosts();
        }
    }, [user, showToast, setPosts, setUserProfile]);

    console.log("user:", user);

    return { isLoading, posts };
};

export default useGetFeedPosts;
