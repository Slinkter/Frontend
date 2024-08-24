import { useEffect, useRef } from "react";

import {
    Button,
    Flex,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import Comment from "../Comment/Comment";
import usePostComment from "../../hooks/usePostComment";

const CommentsModal = ({ isOpen, onClose, post }) => {
    const { handlePostComment, isCommenting } = usePostComment();
    const commentRef = useRef(null);
    const commentsContainerRef = useRef(null);
    //
    const handleSubmitComment = async (e) => {
        e.preventDefault();
        await handlePostComment(post.id, commentRef.current.value);
        commentRef.current.value = "";
    };
    //
    useEffect(() => {
        const scrollToBottom = () => {
            commentsContainerRef.current.scrollTop =
                commentsContainerRef.current.scrollHeight;
        };
        if (isOpen) {
            setTimeout(() => {
                scrollToBottom();
            }, 1000);
        }
    }, [isOpen, post.comments.length]);

    return (
        <div>
            CommentsModal
            {/* <Comment /> */}
            <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
                <ModalOverlay />
                <ModalContent
                    bg={"black"}
                    border={"1px solid gray"}
                    maxW={"400px"}
                >
                    <ModalHeader> Comments </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex
                            mb={4}
                            gap={4}
                            maxH={"250px"}
                            flexDir={"column"}
                            overflowY={"auto"}
                            ref={commentsContainerRef}
                        >
                            {post.comments.map((comment, idx) => (
                                <Comment key={idx} comment={comment} />
                            ))}
                        </Flex>
                        <form
                            onSubmit={handleSubmitComment}
                            style={{ marginTop: "2rem" }}
                        >
                            <Input
                                placeholder="comment"
                                size={"sm"}
                                ref={commentRef}
                            />
                            <Flex w={"full"} justifyContent={"flex-end"}>
                                <Button
                                    type="submit"
                                    ml={"auto"}
                                    size={"sm"}
                                    my={4}
                                    isLoading={isCommenting}
                                >
                                    Post
                                </Button>
                            </Flex>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default CommentsModal;
