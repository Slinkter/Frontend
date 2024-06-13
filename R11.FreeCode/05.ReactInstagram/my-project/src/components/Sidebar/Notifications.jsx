import { Box, Flex, Tooltip } from "@chakra-ui/react";
import React from "react";
import { NotificationsLogo } from "../../assets/contains";

const Notifications = () => {
    return (
        <Tooltip
            hasArrow
            label={"Notifications"}
            placement="right"
            ml={1}
            openDelay={500}
            display={{ base: "block", md: "none" }}
        >
            <Flex
                justifyContent={{ base: "none", md: "flex-start" }}
                alignItems={"center"}
                gap={4}
                p={2}
                w={{ base: 10, md: "full" }}
                borderRadius={6}
                _hover={{ bg: "whiteAlpha.400" }}
            >
                <NotificationsLogo />
                <Box display={{ base: "none", md: "block" }}>Notifications</Box>
            </Flex>
        </Tooltip>
    );
};

export default Notifications;
