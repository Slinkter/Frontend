import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <Box border={"1px solid gray"} borderRadius={4} padding={5}>
            <h1>Authform</h1>
            <VStack spacing={4}>
                <Image src="/logo.png" alt="logo" h={24} cursor={"pointer"} />
                {isLogin ? <p>Login</p> : <p>Signup</p>}
                <Flex
                    w={"full"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={4}
                    my={4}
                >
                    <Box h={"1px"} flex={2} bg={"gray.400"} />

                    <Text mx={1} color={"white"}>
                        OR
                    </Text>
                    <Box h={"1px"} flex={2} bg={"gray.400"} />
                </Flex>
            </VStack>
        </Box>
    );
};

export default AuthForm;
