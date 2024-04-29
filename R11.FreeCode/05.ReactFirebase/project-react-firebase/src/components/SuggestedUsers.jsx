import React from "react";
import SuggestedHeader from "./SuggestedHeader";
import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react";
import SuggestedUser from "./SuggestedUser";

const SuggestedUsers = () => {
  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />
      <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
        <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
          Suggested for you
        </Text>
        <Text
          fontSize={12}
          fontWeight={"bold"}
          _hover={{ color: "gray.400" }}
          cursor={"pointer"}
        >
          See All
        </Text>
      </Flex>

      <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start "}>
        2023 Build Bby {""}
        <Link href="" target="_blank">
          as a a Programmer
        </Link>
      </Box>
      <SuggestedUser
        name="Dan Abramov"
        followers={1392}
        avatar="https://bit.ly/dan-abramov"
      />
      <SuggestedUser
        name="Ryan Florence"
        followers={567}
        avatar="https://bit.ly/ryan-florence"
      />
      <SuggestedUser
        name="Christian Nwamba"
        followers={739}
        avatar="https://bit.ly/code-beast"
      />
    </VStack>
  );
};

export default SuggestedUsers;
