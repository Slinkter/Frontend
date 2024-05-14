import { Box, Flex, Grid, Skeleton, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ProfilePost from "./ProfilePost";
import useGetUserPost from "../../hooks/useGetUserPost";

const ProfilePosts = () => {
  const { isLoading, posts } = useGetUserPost();
  const noPostsFound = !isLoading && posts.length === 0;
  if (noPostsFound) {
    return <NoPostsFound />;
  }

  return (
    <Grid
      templateColumns={{
        sm: "repeat(1,1fr)",
        md: "repeat(3,1fr)",
      }}
      gap={1}
      columnGap={1}
    >
      {isLoading &&
        [0, 1, 2].map((_, idx) => (
          <VStack key={idx}>
            <Skeleton w={"full"}>
              <Box h={"300px"}>contents wrapped</Box>
            </Skeleton>
          </VStack>
        ))}

      {!isLoading && (
        <>
          {posts.map((post) => (
            <ProfilePost key={post.id} post={post} />
          ))}
        </>
      )}
    </Grid>
  );
};

export default ProfilePosts;

const NoPostsFound = () => {
  return (
    <Flex flexDir={"column"} textAlign={"center"} mx={"auto"} mt={10}>
      <Text fontSize={"2xl"}> No Posts Found </Text>
    </Flex>
  );
};
