import React from "react";
import AuthForm from "../components/AuthForm/AuthForm";
import { Box, Container, Flex, Image, VStack } from "@chakra-ui/react";

const AuthPage = () => {
    return (
        <div>
            <h1>AuthPage</h1>
            <Flex>
                <Container border={"1px solid red"}>
                    <Box display={{ base: "none", md: "block" }}>
                        <Image src="/auth.png" h={650} alt="phone img" />
                    </Box>
                    <VStack spacing={4} align={"stretch"}>
                        <AuthForm />
                        <Box textAlign={"center"}> Get the app.</Box>
                        <Flex justifyContent={"center"} gap={5}>
                            <Image
                                src="/playstore.png"
                                h={10}
                                alt="playstore logo"
                            />
                            <Image
                                src="/microsoft.png"
                                h={10}
                                alt="microsoft logo"
                            />
                        </Flex>
                    </VStack>
                </Container>
            </Flex>
        </div>
    );
};

export default AuthPage;
