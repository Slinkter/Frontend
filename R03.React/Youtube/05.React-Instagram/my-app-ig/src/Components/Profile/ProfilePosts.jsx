import React from "react";
import { Box, Flex, Grid, Skeleton, Text, VStack } from "@chakra-ui/react";
import useGetUserPosts from "../../hooks/useGetUserPosts";
import ProfilePost from "./ProfilePost";

const ProfilePosts = () => {
    const { isLoading, posts } = useGetUserPosts();

    const nopostfound = !isLoading && posts.length === 0;

    if (nopostfound) return <NoPostsFound />;

    console.log(isLoading, posts);

    return (
        <div>
            <Grid
                templateColumns={{ sm: "repeat(1,1fr)", md: "repeat(3,1fr)" }}
            >
                {isLoading &&
                    [0, 1, 2].map((_, idx) => (
                        <VStack key={idx} alignItems={"flex-start"} gap={4}>
                            <Skeleton w={"full"}>
                                <Box h={"300px"}>contente wrapped</Box>
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
        </div>
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
