import {
    Box,
    Button,
    CloseButton,
    Flex,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
    Tooltip,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { CreatePostLogo } from "../../../assets/LogoSVG";
import usePreviewImg from "../../../hooks/usePreviewImg";
import useShowToast from "../../../hooks/useShowToast";
import useCreatePost from "../../../hooks/useCreatePost";
import { BsFillImageFill } from "react-icons/bs";

const CreatePost = () => {
    const [caption, setCaption] = useState("");
    const imageRef = useRef(null);
    const { selectedFile, handleImageChange, setSelectedFile } =
        usePreviewImg();
    const { isLoading, handleCreatePost } = useCreatePost();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const showToast = useShowToast();

    const handlePostCreation = async () => {
        try {
            await handleCreatePost(selectedFile, caption);
            onClose();
            setCaption("");
            setSelectedFile(null);
        } catch (error) {
            showToast("error", error.message, "error");
        }
    };

    return (
        <>
            <Tooltip
                hasArrow
                label={"create"}
                placement="right"
                ml={1}
                openDelay={500}
                display={{ base: "block", md: "none" }}
            >
                <Flex
                    alignItems={"center"}
                    gap={4}
                    _hover={{ bg: "whiteAlpha.400" }}
                    borderRadius={6}
                    p={2}
                    w={{ base: 10, md: "full" }}
                    justifyContent={{ base: "center", md: "flex-start" }}
                    onClick={onOpen}
                >
                    <CreatePostLogo />
                    <Box display={{ base: "none", md: "block" }}>Create</Box>
                </Flex>
            </Tooltip>
            <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
                <ModalOverlay />
                <ModalContent bg={"black"} border={"1px solid gray"}>
                    <ModalHeader>Create Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Textarea
                            placeholder="post caption ..."
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        />
                        <Input
                            type="file"
                            ref={imageRef}
                            onChange={handleImageChange}
                        />
                        <BsFillImageFill
                            size={16}
                            style={{
                                marginTop: "15px",
                                marginLeft: "5px",
                                cursor: "pointer",
                            }}
                            onClick={() => imageRef.current.click()}
                        />
                        {selectedFile && (
                            <Flex
                                mt={5}
                                w={"full"}
                                position={"relative"}
                                justifyContent={"center"}
                            >
                                <Image src={selectedFile} alt="selected img" />
                                <CloseButton
                                    position={"absolute"}
                                    top={2}
                                    right={2}
                                    onClick={() => setSelectedFile(null)}
                                />
                            </Flex>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            mr={3}
                            onClick={handlePostCreation}
                            isLoading={isLoading}
                        >
                            Post
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreatePost;
