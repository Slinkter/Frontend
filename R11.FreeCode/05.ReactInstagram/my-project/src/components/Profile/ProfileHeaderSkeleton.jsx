import { Flex, Skeleton, SkeletonCircle, VStack } from "@chakra-ui/react";
import React from "react";

const ProfileHeaderSkeleton = () => {
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: "column", sm: "row" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <SkeletonCircle size={"24"} />
      <VStack
        alignItems={{ base: "center", sm: "flex-start" }}
        gap={2}
        mx={"auto"}
        flex={1}
      >
        <Skeleton height={"12px"} width={"150px"} />
        <Skeleton height={"12px"} width={"150px"} />
        <Skeleton height={"12px"} width={"150px"} />
      </VStack>
    </Flex>
  );
};

export default ProfileHeaderSkeleton;
