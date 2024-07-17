import { Box, Flex, Link } from "@chakra-ui/react";
import React from "react";
import Home from "./SidebarItems/Home";

const Sidebar = () => {
    return (
        <Box>
            <Flex>
                <Link>logo ig</Link>
                <Link>logo ig mobil </Link>
                <Flex>
                    <Home />
                </Flex>
            </Flex>
        </Box>
    );
};

export default Sidebar;
