import {
    Box,
    Button,
    Flex,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import useAuthStore from "../../store/authStore";
import usePostComment from "../../hooks/usePostComment";
import useLikePost from "../../hooks/useLikePost";
import {
    CommentLogo,
    NotificationsLogo,
    UnlikeLogo,
} from "../../assets/LogoSVG";
import { timeAgo } from "../../utils/timeAgo";
import CommentsModal from "../Modals/CommentsModal";

const PostFooter = ({ post, isProfilePage, creatorProfile }) => {
    const [comment, setComment] = useState("");
    const commentRef = useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    /*  */
    const { user } = useAuthStore();
    const { isCommenting, handlePostComment } = usePostComment();
    const { handleLikePost, isLiked, likes } = useLikePost(post);
    /*  */
    const handleSubmitComment = async () => {
        await handlePostComment(post.id, comment);
        setComment("");
    };

    return (
        <Box mb={10} marginTop={"auto"}>
            <Flex w={"full"} alignItems={"center"} pt={0} mb={2} mt={4} gap={4}>
                <Box cursor={"pointer"} fontSize={18} onClick={handleLikePost}>
                    {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
                </Box>
                <Box
                    cursor={"pointer"}
                    fontSize={18}
                    onClick={() => commentRef.current.focus()}
                >
                    <CommentLogo />
                </Box>
            </Flex>
            <Text fontWeight={600} fontSize={"sm"}>
                {likes} likes
            </Text>
            {isProfilePage && (
                <Text color={"gray"} fontSize={12}>
                    Posted {timeAgo(post.createdAt)}
                </Text>
            )}
            {!isProfilePage && (
                <>
                    <Text fontSize={"sm"} fontWeight={700}>
                        {creatorProfile?.username}{" "}
                        <Text as="span" fontWeight={400}>
                            {post.caption}
                        </Text>
                    </Text>
                    {post.comments.length > 0 && (
                        <Text
                            fontSize={"sm"}
                            color={"gray"}
                            cursor={"pointer"}
                            onClick={onOpen}
                        >
                            View all {post.comments.length} comments
                        </Text>
                    )}
                    {isOpen ? (
                        <CommentsModal
                            isOpen={isOpen}
                            onClose={onClose}
                            post={post}
                        />
                    ) : null}
                </>
            )}
            {user && (
                <Flex
                    w={"full"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={2}
                >
                    <InputGroup>
                        <Input
                            variant={"flushed"}
                            placeholder={"Add a comment"}
                            fontSize={14}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            ref={commentRef}
                        />
                        <InputRightElement>
                            <Button
                                fontSize={14}
                                color={"blue.500"}
                                fontWeight={600}
                                cursor={"pointer"}
                                bg={"transparent"}
                                _hover={{ color: "white" }}
                                onClick={handleSubmitComment}
                                isLoading={isCommenting}
                            >
                                Post
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Flex>
            )}
        </Box>
    );
};

export default PostFooter;
