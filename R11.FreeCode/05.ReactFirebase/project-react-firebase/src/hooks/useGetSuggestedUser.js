import React, { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetSuggestedUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();

  useEffect(() => {
    const getSuggestedUser = async () => {
      setIsLoading(true);

      try {
        const userRef = collection(firestore, "users");
        const q = query(
          userRef,
          where("uid", "not-in", [authUser.uid, ...authUser.following]),
          orderBy("uid"),
          limit(3)
        );
        const querySnapshot = await getDocs(q);
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({ ...doc.data, id: doc.id });
        });
        setSuggestedUsers(users);
      } catch (error) {
        showToast("Error", error.message, "error");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (authUser) {
      getSuggestedUser();
    }
    return () => {};
  }, [authUser, showToast]);

  return { isLoading, suggestedUsers };
};

export default useGetSuggestedUser;
