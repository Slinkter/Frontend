import React from "react";
import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useFollowUser from "../../hooks/useFollowUser";
import useAuthStore from "../../store/authStore";

const SuggestedUsers = ({ user, setUser }) => {
    const { isUpdating, isFollowing, handleFollowUser } = useFollowUser(
        user?.uid
    );
    const authUser = useAuthStore((state) => state.user);
    const onFollowUser = async () => {};

    return (
        <Flex>
            <Flex>
                <Link>
                    <Avatar />
                </Link>
            </Flex>
        </Flex>
    );
};

export default SuggestedUsers;
