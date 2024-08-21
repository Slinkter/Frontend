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

const PostFooter = ({ post, isProfilePage, creatorProfile }) => {
    const [comment, setComment] = useState("");
    const commentRef = useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    /*  */
    const { user } = useAuthStore();
    const { isCommenting, handlePostComment } = usePostComment();
    const { handleLikePost, isLied, likes } = useLikePost();

    return <div>PostFooter</div>;
};

export default PostFooter;
