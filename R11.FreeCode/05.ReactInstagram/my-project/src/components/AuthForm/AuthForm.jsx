import { Box, Container, Flex, Image, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import GoogleAuth from "./GoogleAuth";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <>
            <Box border={"2px solid green"} borderRadius={4} padding={5}>
                <VStack spacing={4}>
                    <Image
                        src="/logo.png"
                        h={24}
                        cursor={"pointer"}
                        alt="Instagram"
                    />
                    {isLogin ? <Login /> : <Signup />}
                    <Flex
                        justify={"center"}
                        alignItems={"center"}
                        my={4}
                        gap={1}
                        w={"full"}
                    >
                        <Box flex={2} h={"1px"} bg={"gray.400"} />
                        <Text mx={1} color={"white"}>
                            OR
                        </Text>
                        <Box flex={2} h={"1px"} bg={"gray.400"} />
                    </Flex>
                    <GoogleAuth prefix={isLogin ? "log in" : "sign up"} />
                </VStack>
            </Box>
            <Box border={"1px solid gray"} borderRadius={4} padding={5}>
                <Flex alignItems={"center"} justifyContent={"center"}>
                    <Box mx={2} fontSize={14}>
                        {isLogin
                            ? "Do not have an account?"
                            : "Already have an acount?"}
                    </Box>
                    <Box
                        cursor={"pointer"}
                        color={"blue.500"}
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? "Signup" : "Log in"}
                    </Box>
                </Flex>
            </Box>
        </>
    );
};

export default AuthForm;
