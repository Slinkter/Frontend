import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userStore";
import useShowToast from "./useShowToast";
import { firestore } from "../firebase/config";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const useFollowUser = (userId) => {
    //
    const authUser = useAuthStore((state) => state.user);
    const setAuthUser = useAuthStore((state) => state.setUser);
    //
    const [isUpdating, setIsUpdating] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    //
    const { userProfile, setUserProfile } = useUserProfileStore();
    //
    const showToast = useShowToast();
    /*  */
    const handleFollowUser = async () => {
        try {
            const currentUserRef = doc(firestore, "users", authUser.uid);
            const userToFollowOrUnFollowRef = doc(firestore, "users", userId);
            //
            await updateDoc(currentUserRef, {
                following: isFollowing
                    ? arrayRemove(userId)
                    : arrayUnion(userId),
            });
            await updateDoc(userToFollowOrUnFollowRef, {
                followers: isFollowing
                    ? arrayRemove(authUser.uid)
                    : arrayUnion(authUser.uid),
            });

            if (isFollowing) {
                // unfollow is isFollowing
                // .......
                setAuthUser({
                    following: authUser.following.filter(
                        (uid) => uid !== userId
                    ),
                    ...authUser,
                });
                // .......
                if (userProfile) {
                    setUserProfile({
                        following: userProfile.followers.filter(
                            (uid) => uid !== authUser.uid
                        ),
                        ...userProfile,
                    });
                }
                //......
                localStorage.setItem(
                    "user-info",
                    JSON.stringify({
                        following: authUser.following.filter(
                            (uid) => uid !== userId
                        ),
                        ...authUser,
                    })
                );
                console.log("unFollow");
            } else {
                // follow is not isFollowing
                setAuthUser({
                    following: [userId, ...authUser.following],
                    ...authUser,
                });
                if (userProfile) {
                    setUserProfile({
                        followers: [authUser.id, ...userProfile.followers],
                        ...userProfile,
                    });
                }
                localStorage.setItem(
                    "user-info",
                    JSON.stringify({
                        following: [userId, ...authUser.following],
                        ...authUser,
                    })
                );
                setIsFollowing(true);
                console.log("Follow");
            }
            //
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsUpdating(false);
        }
    };
    /*  */
    useEffect(() => {
        if (authUser) {
            setIsFollowing(authUser.following.includes(userId));
        }
    }, [authUser, userId]);

    return { isUpdating, isFollowing, handleFollowUser };
};

export default useFollowUser;
