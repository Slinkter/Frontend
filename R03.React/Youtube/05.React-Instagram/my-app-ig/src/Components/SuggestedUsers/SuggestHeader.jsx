import React from "react";
import useLogOut from "../../hooks/useLogout";
import useAuthStore from "../../store/authStore";
import { Avatar, Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SuggestHeader = () => {
    const { handleLogout, isLoggingOut } = useLogOut();
    const { user } = useAuthStore();

    if (!user) return null;

    return (
        <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
            <Flex alignItems={"center"} gap={2}>
                <Link to={`${user.username}`}>
                    <Avatar size={"lg"} src={user.profilePicURL} />
                </Link>
                <Link to={`${user.username}`}>
                    <Text fontSize={12} fontWeight={"bold"}>
                        {" "}
                        {user.username}
                    </Text>
                </Link>
            </Flex>
            <Button
                size={"xs"}
                background={"transparent"}
                fontSize={14}
                fontWeight={"medium"}
                color={"blue.400"}
                cursor={"pointer"}
                _hover={{ background: "transparent" }}
                onClick={handleLogout}
                isLoading={isLoggingOut}
            >
                Log out
            </Button>
        </Flex>
    );
};

export default SuggestHeader;
