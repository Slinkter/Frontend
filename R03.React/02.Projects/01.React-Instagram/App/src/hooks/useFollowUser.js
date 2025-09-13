import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";
import { arrayRemove, arrayUnion, doc, writeBatch } from "firebase/firestore";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";

const useFollowUser = (userId) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    //
    const authUser = useAuthStore((state) => state.user);
    const setAuthUser = useAuthStore((state) => state.setUser);
    //
    const { userProfile, setUserProfile } = useUserProfileStore();
    const showToast = useShowToast();

    const handleFollowUser = async () => {
        setIsUpdating(true);
        try {
            const batch = writeBatch(firestore);
            const currentUserRef = doc(firestore, "users", authUser.uid);
            const userToFollowOrUnfollorRef = doc(firestore, "users", userId);

            batch.update(currentUserRef, {
                following: isFollowing
                    ? arrayRemove(userId)
                    : arrayUnion(userId),
            });

            batch.update(userToFollowOrUnfollorRef, {
                followers: isFollowing
                    ? arrayRemove(authUser.uid)
                    : arrayUnion(authUser.uid),
            });

            await batch.commit();

            if (isFollowing) {
                // unfollow
                const updatedAuthUser = {
                    ...authUser,
                    following: authUser.following.filter(
                        (uid) => uid !== userId
                    ),
                };
                setAuthUser(updatedAuthUser);

                if (userProfile)
                    setUserProfile({
                        ...userProfile,
                        followers: userProfile.followers.filter(
                            (uid) => uid !== authUser.uid
                        ),
                    });

                localStorage.setItem(
                    "user-info",
                    JSON.stringify(updatedAuthUser)
                );
                setIsFollowing(false);
            } else {
                // follow
                const updatedAuthUser = {
                    ...authUser,
                    following: [...authUser.following, userId],
                };
                setAuthUser(updatedAuthUser);

                if (userProfile)
                    setUserProfile({
                        ...userProfile,
                        followers: [...userProfile.followers, authUser.uid],
                    });

                localStorage.setItem(
                    "user-info",
                    JSON.stringify(updatedAuthUser)
                );
                setIsFollowing(true);
            }
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsUpdating(false);
        }
    };

    useEffect(() => {
        if (authUser) {
            const isFollowing = authUser.following.includes(userId);
            setIsFollowing(isFollowing);
        }
    }, [authUser, userId]);

    return { isUpdating, isFollowing, handleFollowUser };
};

export default useFollowUser;
