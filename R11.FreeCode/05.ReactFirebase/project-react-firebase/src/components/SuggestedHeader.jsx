import { Avatar, Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";

import { Link as RouterLink } from "react-router-dom";
import useLogOut from "../hooks/useLogOut";
import useAuthStore from "../store/authStore";

const SuggestedHeader = () => {
  const { handleLogoutf, isLoggingOut } = useLogOut();
  const authUser = useAuthStore((state) => state.user);

  if (!authUser) {
    return null;
  }

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Link to={`${authUser?.username}`}>
          <Avatar size={"lg"} src={authUser?.profilePicURL} />
        </Link>
        <Link to={`${authUser?.username}`}>
          <Text fontSize={12} fontWeight={"bold"}>
            {authUser?.username}
          </Text>
        </Link>
      </Flex>
      <Button
        size={"xs"}
        background={"transparent"}
        _hover={{ background: "transparent" }}
        fontSize={14}
        fontWeight={"medium"}
        color={"blue.400"}
        onClick={handleLogoutf}
        isLoading={isLoggingOut}
        cursor={"pointer"}
      >
        Log out
      </Button>
    </Flex>
  );
};

export default SuggestedHeader;
