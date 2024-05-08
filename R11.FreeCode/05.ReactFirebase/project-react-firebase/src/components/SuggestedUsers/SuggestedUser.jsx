import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import useFollowUser from "../../hooks/useFollowUser";
import { useAuthState } from "react-firebase-hooks/auth";
import useAuthStore from "../../store/authStore";

const SuggestedUser = ({ user, setUser }) => {
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid);
  const authUser = useAuthStore((state) => state.user);

  //todo : 5:51:54
  const onFollowUser = async () => {
    await handleFollowUser();
    setUser({
      ...user,
      follower: isFollowing
        ? user.followers.filter((follower) => follower.uid !== authUser.uid)
        : [...user.followers, authuser],
    });
  };

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar src={user.profilePicURL} name={name} size={"md"} />
        <VStack spacing={2}>
          <Box fontSize={12} fontWeight={"bold"}>
            {user.fullName}
          </Box>
          <Box fontSize={11} color={"gray.500"}>
            {user.followers.length} followers
          </Box>
        </VStack>
      </Flex>
      {authUser.uid !== user.uid && (
        <Button
          fontSize={13}
          bg={"transparent"}
          p={0}
          h={"max-content"}
          fontWeight={"medium"}
          color={"blue.400"}
          cursor={"pointer"}
          _hover={{ color: "white" }}
          onClick={onFollowUser}
          isLoading={isUpdating}
        >
          {isFollowing ? "unfollow" : "follow"}
        </Button>
      )}
    </Flex>
  );
};

export default SuggestedUser;
