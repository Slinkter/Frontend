import { useEffect, useState } from "react";
import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import SuggestedUsers from "../Components/SuggestedUsers/SuggestedUsers";

const useGetSuggestedUsers = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const { user } = useAuthStore();
    const showToast = useShowToast();
    //
    const getSuggestedUser = async () => {
        try {
            setIsLoading(true);
            const userRef = collection(firestore, "users");
            const whereRef = where("uid", "not-in", [
                user.uid,
                ...user.following,
            ]);
            const q = query(userRef, whereRef, orderBy("uid"), limit(3));
            // exec
            const querySnapshot = await getDocs(q);
            //
            const users = [];
            querySnapshot.forEach((doc) => {
                users.push({ ...doc.data(), id: doc.id });
            });
            setSuggestedUsers(users);
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsLoading(false);
        }
    };
    //
    useEffect(() => {
        if (user) {
            getSuggestedUser();
        }
    }, [user, showToast]);

    return { isLoading, suggestedUsers };
};

export default useGetSuggestedUsers;
