import { Box, Flex, Tooltip, useDisclosure } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { CreatePostLogo } from "../../../assets/LogoSVG";
import usePreviewImg from "../../../hooks/usePreviewImg";
import useShowToast from "../../../hooks/useShowToast";
import useCreatePost from "../../../hooks/useCreatePost";

const CreatePost = () => {
    const [caption, setCaption] = useState("");
    const imageRef = useRef(null);
    const { selectedFile, handleImageChange, setSelectedFile } =
        usePreviewImg();
    const {} = useCreatePost();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const showToast = useShowToast();
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
