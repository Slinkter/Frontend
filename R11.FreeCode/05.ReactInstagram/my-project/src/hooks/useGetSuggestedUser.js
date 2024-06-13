import { useEffect, useState } from "react";
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
import { firestore } from "../firebase/config";

const useGetSuggestedUser = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [suggestedUser, setSuggestedUser] = useState([]);
    const authUser = useAuthStore((state) => state.user);
    const showToast = useShowToast();

    useEffect(() => {
        const getSuggestedUser = async () => {
            try {
                const users = [];
                const q = query(
                    collection(firestore, "users"),
                    where("uid", "not-in", [
                        authUser.uid,
                        ...authUser.following,
                    ]),
                    orderBy("uid"),
                    limit(3)
                );
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    users.push({ id: doc.id, ...doc.data() });
                });
                setSuggestedUser(users);
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        };
        if (authUser) {
            getSuggestedUser();
        }
    }, [authUser, showToast]);

    return { isLoading, suggestedUser };
};

export default useGetSuggestedUser;
