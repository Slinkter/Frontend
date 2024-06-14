import { Avatar, Box, Link, Tooltip } from "@chakra-ui/react";

import { Link as RouterLink } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const ProfileLink = () => {
  const authUser = useAuthStore((state) => state.user);

  return (
    <Tooltip
      hasArrow
      label={"create"}
      placement="right"
      ml={1}
      openDelay={500}
      display={{ base: "block" }}
    >
      <Link
        display={"flex"}
        top={`/${authUser?.username}`}
        as={RouterLink}
        alignContent={"center"}
        gap={4}
        _hover={{ bg: "whiteAlpha.400" }}
        borderRadius={6}
        p={2}
        w={{ base: 10, md: "full" }}
        justifyContent={{ base: "center", md: "flex-start" }}
        bgColor={"whiteAlpha.100"}
      >
        <Avatar size={"sm"} src={authUser?.profilePicURL || ""} />
        <Box display={{ base: "none", md: "block" }}> Profile</Box>
      </Link>
    </Tooltip>
  );
};

export default ProfileLink;
