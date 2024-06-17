import React from "react";
import useGetUserPosts from "../../hooks/useGetUserPosts";
import { Box, Flex, Grid, Skeleton, Text, VStack } from "@chakra-ui/react";
import ProfilePost from "./ProfilePost";

const ProfilePosts = () => {
  const { isLoading, posts } = useGetUserPosts();

  const noPostsFound = !isLoading && posts.length === 0;
  if (noPostsFound) return <NoPostsFound />;

  return (
    <>
      <Grid
        templateColumns={{
          sm: "repeat(1,1fr)",
          md: "repeat(3,1fr)",
        }}
        gap={4}
        columnGap={1}
      >
        {isLoading &&
          [0, 1, 2].map((_, idx) => (
            <VStack key={idx} alignItems={"flex-start"} gap={4}>
              <Skeleton w={"full"}>
                <Box h={"300px"}>Contente wrapped</Box>
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
    </>
  );
};

export default ProfilePosts;

const NoPostsFound = () => {
  return (
    <Flex flexDir={"column"} textAlign={"center"} mx={"auto"} mt={10}>
      <Text fontSize={"2xl"}>No Posts Found</Text>
    </Flex>
  );
};
