import React, { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useFollowUser = (userId) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const { userProfile, setUserProfile } = useUserProfileStore();
  const showToast = useShowToast();

  const handleFollowUser = async () => {
    setIsUpdating(true);
    try {
      const currentUserRef = doc(firestore, "users", authUser.uid);
      const userToFollowOrUnfollowrRef = doc(firestore, "users", userId);

      await updateDoc(currentUserRef, {
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
      });
      await updateDoc(userToFollowOrUnfollowrRef, {
        followers: isFollowing
          ? arrayRemove(authUser.uid)
          : arrayUnion(authUser.uid),
      });

      if (isFollowing) {
        // unfollwos
        setAuthUser({
          ...authUser,
          following: authUser.following.filter((uid) => uid !== userId),
        });

        if (userProfile) {
          setUserProfile({
            ...userProfile,
            followers: userProfile.followers.filter(
              (uid) => uid !== authUser.uid
            ),
          });
        }

        localStorage.setItem(
          "user-info",
          JSON.stringify({
            ...authUser,
            following: authUser.following.filter((uid) => uid !== userId),
          })
        );

        setIsFollowing(false);
      } else {
        //follow
        setAuthUser({
          ...authUser,
          followers: [...userProfile.followers, authUser.uid],
        });
        if (userProfile) {
          setUserProfile({
            ...userProfile,
            followers: [...userProfile.followers, authUser.uid],
          });
        }

        localStorage.setItem(
          "user-info",
          JSON.stringify({
            ...authUser,
            following: [...authUser.followin, userId],
          })
        );
        setIsFollowing(true);
      }
    } catch (error) {
      console.log(error);
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
