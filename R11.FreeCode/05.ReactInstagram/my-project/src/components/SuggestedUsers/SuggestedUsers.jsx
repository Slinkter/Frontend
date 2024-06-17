import React from "react";
import { Avatar, Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useFollowUser from "../../hooks/useFollowUser";
import useAuthStore from "../../store/authStore";
import useGetSuggestedUser from "../../hooks/useGetSuggestedUser";
import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser";

const SuggestedUsers = () => {
  const { isLoading, suggestedUser } = useGetSuggestedUser();

  console.log("suggestedUser", suggestedUser);

  if (isLoading) return null;

  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />
      {suggestedUser.length !== 0 && (
        <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
          <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
            Suggested for you{" "}
          </Text>
          <Text
            fontSize={12}
            fontWeight={"bold"}
            _hover={{ color: "gray.400" }}
            cursor={"pointer"}
          >
            See all
          </Text>
        </Flex>
      )}
      {suggestedUser.map((user) => (
        <SuggestedUser user={user} key={user.id} />
      ))}
      <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
        © 2024 Built By
        <Link
          href="https://www.youtube.com/@"
          target="_blank"
          color="blue.500"
          fontSize={14}
        >
          As a Someone
        </Link>
      </Box>
    </VStack>
  );
};

export default SuggestedUsers;
