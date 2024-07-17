import { Box, Flex, Tooltip } from "@chakra-ui/react";
import React from "react";
import { CreatePostLogo } from "../../../assets/Constantes";

const CreatePost = () => {
    return (
        <>
            <Tooltip
                hasArrow
                label={"Home"}
                placement="right"
                ml={1}
                openDelay={500}
                display={{ base: "block", md: "none" }}
            >
                <Flex
                    display={"flex"}
                    alignItems={"center"}
                    gap={4}
                    _hover={{ bg: "whiteAlpha.400" }}
                    borderRadius={6}
                    p={2}
                    w={{ base: 10, md: "full" }}
                    justifyContent={{ base: "center", md: "flex-start" }}
                >
                    <CreatePostLogo />
                    <Box display={{ base: "none", md: "block" }}>Home</Box>
                </Flex>
            </Tooltip>
        </>
    );
};

export default CreatePost;
