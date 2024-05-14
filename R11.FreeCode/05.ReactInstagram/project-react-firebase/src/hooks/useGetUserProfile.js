import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useUserProfileStore from "../store/userProfileStore";

const useGetUserProfile = (username) => {
  const [isLoading, setIsLoading] = useState(true);
  const showToast = useShowToast();
  const { userProfile, setUserProfile } = useUserProfileStore();
  console.log("useGetUserProfile : username = ", username);

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      try {
        const q = query(
          collection(firestore, "users"),
          where("username", "==", username)
        );
        console.log("q : ", q);
        const querySnapshot = await getDocs(q);
        console.log("querySnapshot : ", querySnapshot);
        //
        if (querySnapshot.empty) return setUserProfile(null);
        //

        let userDoc;
        querySnapshot.forEach((doc) => {
          userDoc = doc.data();
        });
        setUserProfile(userDoc);
        console.log("userDoc", userDoc);
      } catch (error) {
        showToast("Error", error.message, "error");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getUserProfile();
  }, []);

  //setUserProfile, username, showToast

  return { isLoading, userProfile };
};

export default useGetUserProfile;
