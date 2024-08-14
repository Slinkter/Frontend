import { Box, Container, Flex, Image, VStack } from "@chakra-ui/react";
import React from "react";
import AuthForm from "../Components/AuthForm/AuthForm";

const AuthPage = () => {
    return (
        <Flex
            minH={"100vh"}
            justifyContent={"center"}
            alignItems={"center"}
            px={4}
        >
            <Container maxW={"container.md"} padding={0}>
                <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
                    <Box display={{ base: "none", md: "block" }}>
                        <Image src="./auth.png" alt="logo" h={650} />
                    </Box>
                    <VStack spacing={4} align={"stretch"}>
                        <AuthForm />
                        <Box>Get the app</Box>
                        <Flex>
                            <Image src="./playstore.png" alt="logo" h={10} />
                            <Image src="./microsoft.png" alt="logo" h={10} />
                        </Flex>
                    </VStack>
                </Flex>
            </Container>
        </Flex>
    );
};

export default AuthPage;
