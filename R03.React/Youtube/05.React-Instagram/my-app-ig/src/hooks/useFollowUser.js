import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useFollowUser = (userId) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const { user, setUser } = useAuthStore();
    const { userProfile, setUserProfile } = useUserProfileStore();
    const showToast = useShowToast();
    /*  */
    const handleFollowUser = async () => {
        try {
            setIsUpdating(true);
            //
            const currentUserRef = doc(firestore, "users", user.uid);
            const userToFollowUnfollowRef = doc(firestore, "users", userId);
            //
            const objUserIdRef = {
                following: isFollowing
                    ? arrayRemove(userId)
                    : arrayUnion(userId),
            };
            await updateDoc(currentUserRef, objUserIdRef);
            //
            const objUserRef = {
                followers: isFollowing
                    ? arrayRemove(user.id)
                    : arrayUnion(user.id),
            };
            await updateDoc(userToFollowUnfollowRef, objUserRef);
            //
            if (isFollowing) {
                if (user) {
                    const update = user.following.filter(
                        (uid) => uid !== userId
                    );
                    setUser({ ...user, following: update });
                }
                if (userProfile) {
                    const update = userProfile.followers.filter(
                        (uid) => uid !== user.uid
                    );
                    setUserProfile({ ...userProfile, followers: update });
                }
            } else {
                setUser({});
            }
        } catch (error) {
            // Mostrar un mensaje de error si algo sale mal
            showToast("Error", error.message, "error");
        } finally {
            setIsUpdating(false); // Restablecer el estado de actualización a false
        }
    };

    useEffect(() => {
        if (user) {
            const isFollowing = user.following.includes(userId);
            setIsFollowing(isFollowing);
        }
    }, [user, userId]);

    return { isUpdating, isFollowing, handleFollowUser };
};

export default useFollowUser;
