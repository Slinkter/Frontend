import {
  Box,
  Container,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
import FeedPost from "./FeedPost";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";

const FeedPosts = () => {
  const { isLoading, posts } = useGetFeedPosts();

  console.log("FeedPosts - posts:", posts);

  return (
    <>
      <Container maxW={"container.sm"} py={10} px={2}>
        {isLoading && <ContainerSkeleton />}
        {!isLoading && posts.length > 0 && <ContainerPosts posts={posts} />}
        {!isLoading && posts.length === 0 && <ContainerZero />}
      </Container>
    </>
  );
};

export default FeedPosts;

const ContainerSkeleton = (isLoading) => {
  return (
    <div>
      {isLoading &&
        [0, 1].map((_, idx) => (
          <VStack key={idx} gap={4} alignContent={"flex-start"} mb={10}>
            <Flex gap={2}>
              <SkeletonCircle size={10} />
              <VStack>
                <Skeleton height={"10px"} w={"200px"} />
                <Skeleton height={"10px"} w={"200px"} />
              </VStack>
            </Flex>
            <Skeleton w={"full"}>
              <Box h={"400px"}>contents wrapped</Box>
            </Skeleton>
          </VStack>
        ))}
    </div>
  );
};

const ContainerZero = () => {
  return (
    <>
      <Text fontSize={"md"} color={"red.400"}>
        Dayymm . Looks like you dont have any friends
      </Text>
      <Text color={"red.400"}>Stop codding and go make some!</Text>
    </>
  );
};

const ContainerPosts = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <FeedPost key={post.id} post={post} />
      ))}
    </>
  );
};
