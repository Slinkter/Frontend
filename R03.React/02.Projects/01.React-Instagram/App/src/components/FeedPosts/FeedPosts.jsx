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

    const examplepost = {
        id: "string", // ID único del documento del post en Firestore.
        caption: "string", // El texto o descripción que acompaña a la imagen (inferido).
        imageURL: "string", // La URL de la imagen de la publicación (inferido).
        createdBy: "string", // El `uid` del usuario que creó el post.
        createdAt: "number", // Fecha de creación del post, en formato timestamp.
        likes: ["array"], // Un array con los `uid` de los usuarios que le han dado "me gusta".
        comments: ["array"], // Un array de objetos `comment`.
    };

    return (
        <Container maxW={"container.sm"} py={10} px={2}>
            {/*  */}
            {isLoading &&
                [0, 1, 2].map((_, idx) => (
                    <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
                        <Flex gap="2">
                            <SkeletonCircle size="10" />
                            <VStack gap={2} alignItems={"flex-start"}>
                                <Skeleton height="10px" w={"200px"} />
                                <Skeleton height="10px" w={"200px"} />
                            </VStack>
                        </Flex>
                        <Skeleton w={"full"}>
                            <Box h={"400px"}>contents wrapped</Box>
                        </Skeleton>
                    </VStack>
                ))}

            {!isLoading &&
                posts.length > 0 &&
                posts.map((post) => <FeedPost key={post.id} post={post} />)}
            {/*  */}
            {!isLoading && posts.length === 0 && (
                <>
                    <Text fontSize={"md"} color={"red.400"}>
                        Dayuum. Looks like you don&apos;t have any friends.
                    </Text>
                    <Text color={"red.400"}>
                        Stop coding and go make some!!
                    </Text>
                </>
            )}
        </Container>
    );
};

export default FeedPosts;
