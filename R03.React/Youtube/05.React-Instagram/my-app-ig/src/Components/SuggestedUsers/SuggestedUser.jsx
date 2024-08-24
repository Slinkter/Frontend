import React from "react";
import useFollowUser from "../../hooks/useFollowUser";
import useAuthStore from "../../store/authStore";

const SuggestedUser = ({ user, setUser }) => {
    const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(
        user.uid
    );
    const authUser = useAuthStore((state) => state.user);

    return <div>SuggestedUser</div>;
};

export default SuggestedUser;
