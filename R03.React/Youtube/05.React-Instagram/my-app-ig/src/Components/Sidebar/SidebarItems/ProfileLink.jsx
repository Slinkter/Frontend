import { Avatar, Box, Link, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";
import useCreatePost from "../../../hooks/useCreatePost";

const ProfileLink = () => {
    const [caption, setCaption] = useState();
    const imageRef = useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isLoading } = useCreatePost();
    return (
        <Tooltip
            hasArrow
            label={"Home"}
            placement="right"
            ml={1}
            openDelay={500}
            display={{ base: "block", md: "none" }}
        >
            <Link
                to={"/"}
                as={RouterLink}
                display={"flex"}
                alignItems={"center"}
                gap={4}
                _hover={{ bg: "whiteAlpha.400" }}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
                justifyContent={{ base: "center", md: "flex-start" }}
            >
                <Avatar size={"sm"} src={""} />
                <Box display={{ base: "none", md: "block" }}>Create</Box>
            </Link>
        </Tooltip>
    );
};

export default ProfileLink;
