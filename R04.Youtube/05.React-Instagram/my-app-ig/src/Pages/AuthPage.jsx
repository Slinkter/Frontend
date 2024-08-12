import { Box, Container, Flex, Image, VStack } from "@chakra-ui/react";
import React from "react";

const AuthPage = () => {
    return (
        <Flex
            minH={"100vh"}
            justifyContent={"center"}
            alignItems={"center"}
            px={4}
        >
            <Container
                maxW={"container.md"}
                border={"1px solid white"}
                padding={0}
            >
                <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
                    <Box display={{ base: "block", md: "block" }}>
                        <Image src="./auth.png" alt="logo" />
                    </Box>
                    <VStack></VStack>
                </Flex>
            </Container>
        </Flex>
    );
};

export default AuthPage;
