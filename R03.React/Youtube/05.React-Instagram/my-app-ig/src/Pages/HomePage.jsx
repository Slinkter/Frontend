import { Box, Container, Flex } from "@chakra-ui/react";
import React from "react";
import FeedPosts from "../Components/FeedPosts/FeedPosts";
import SuggestedUsers from "../Components/SuggestedUsers/SuggestedUsers";

const HomePage = () => {
    document.title = "Home Page";
    return (
        <>
            <Container maxW={"container.lg"} border={"1px solid white"}>
                <Flex gap={20}>
                    <Box flex={2} py={10}>
                        <FeedPosts />
                    </Box>
                    <Box
                        flex={3}
                        mr={20}
                        maxW={"300px"}
                        display={{ base: "none", md: "block" }}
                    >
                        <SuggestedUsers />
                    </Box>
                </Flex>
            </Container>
        </>
    );
};

export default HomePage;
