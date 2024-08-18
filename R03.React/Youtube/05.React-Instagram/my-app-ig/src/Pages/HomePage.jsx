import { Box, Container, Flex } from "@chakra-ui/react";
import React from "react";
import FeedPosts from "../Components/FeedPosts/FeedPosts";
import SuggestedUsers from "../Components/SuggestedUsers/SuggestedUsers";

const HomePage = () => {
    document.title = "Home Page";
    return (
        <>
            <Container bg={"blue.500"} maxW={"container.xl"}>
                <Flex gap={20}>
                    <Box flex={2} py={10} bg={"green.500"}>
                        <FeedPosts />
                    </Box>
                    <Box
                        flex={3}
                        mr={20}
                        maxW={"300px"}
                        display={{ base: "block", md: "block" }}
                        bg={"red.500"}
                    >
                        <SuggestedUsers />
                    </Box>
                </Flex>
            </Container>
        </>
    );
};

export default HomePage;
