import { useState } from "react";
import {
    Avatar,
    Button,
    Divider,
    Flex,
    GridItem,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    VStack,
    useDisclosure,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useShowToast from "../../hooks/useShowToast";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import usePostStore from "../../store/postStore";

const ProfilePost = ({ post }) => {
    //
    const [isDeleting, setIsDeleting] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const userProfile = useUserProfileStore((state) => state.userProfile);
    const deletePost = usePostStore((state) => state.deletePost);
    const showToast = useShowToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const decrementPostsCount = useUserProfileStore(
        (state) => state.deletepost
    );
    //
    const handleDeletePost = async () => {};
    //
    return (
        <>
            <GridItem
                cursor={"pointer"}
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                position={"relative"}
                aspectRatio={1 / 1}
                onClick={onOpen}
            >
                <Flex
                    opacity={1}
                    _hover={{ opacity: 0 }}
                    position={"absolute"}
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bg={"blackAlpha.700"}
                    zIndex={1}
                    justifyContent={"center"}
                >
                    <Flex
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={50}
                    >
                        <Flex>
                            <AiFillHeart size={20} />
                            <Text fontWeight={"bold"} ml={2}>
                                {post.likes.length}
                            </Text>
                        </Flex>
                        <Flex>
                            <FaComment />
                            <Text fontWeight={"bold"} ml={2}>
                                {post.comments.length}
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>

                <Image
                    src={post.imageURL}
                    alt="profile post"
                    w="100%"
                    h={"100%"}
                    objectFit={"cover"}
                />
            </GridItem>
            <Modal
                isOpen={isOpen}
                onClose={onclose}
                isCentered={true}
                size={{ base: "3xl", md: "5xl" }}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody bg={"black"} pb={5}>
                        <Flex
                            gap={4}
                            w={{ base: "90%", sm: "70%", md: "full" }}
                            mx={"auto"}
                            maxH={"90vh"}
                            minH={"50vh"}
                        >
                            <Flex
                                borderRadius={4}
                                overflow={"hidden"}
                                border={"1px solid"}
                                borderColor={"whiteAlpha.300"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                flex={1.5}
                            >
                                <Image src={post.imageURL} />
                            </Flex>
                            <Flex
                                flex={1}
                                flexDir={"column"}
                                px={10}
                                display={{ base: "none", md: "flex" }}
                            >
                                <Flex
                                    alignItems={"center"}
                                    justifyContent={"space-between"}
                                >
                                    <Avatar
                                        src={userProfile.profilePicURL}
                                        size={"sm"}
                                        name="someone"
                                    />
                                    <Text fontWeight={"bold"} fontSize={12}>
                                        {userProfile.username}
                                    </Text>
                                </Flex>

                                {true && (
                                    <Button
                                        size={"sm"}
                                        bg={"transparent"}
                                        borderRadius={4}
                                        p={1}
                                        onClick={handleDeletePost}
                                        isLoading={isDeleting}
                                        _hover={{
                                            bg: "whiteAlpha.300",
                                            color: "red.600",
                                        }}
                                    >
                                        <MdDelete
                                            size={20}
                                            cursor={"pointer"}
                                        />
                                    </Button>
                                )}
                                <Divider my={4} bg={"gray.500"} />
                                <VStack
                                    w={"full"}
                                    alignItems={"start"}
                                    maxH={"350px"}
                                    overflowY={"auto"}
                                >
                                    <span>caption</span>
                                    <span>Comment</span>
                                </VStack>
                                <Divider my={4} bg={"gray.800"} />
                                <span>PostFooter</span>
                            </Flex>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ProfilePost;
