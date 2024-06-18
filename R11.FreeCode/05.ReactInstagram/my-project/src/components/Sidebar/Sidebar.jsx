import React from "react";
import useLogout from "../../hooks/useLogout";
import {
  Box,
  Button,
  Flex,
  Link,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import SidebarItems from "./SidebarItems";
import { BiLogOut } from "react-icons/bi";
import { InstagramLogo, InstagramMobileLogo } from "../../assets/contains";

const Sidebar = () => {
  const { handleLogout, loading } = useLogout();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      height={"100vh"}
      borderRight={"1px solid "}
      borderColor={"whiteAlpha.300"}
      position={"sticky"}
      py={8}
      top={0}
      left={0}
      px={{ base: 2, md: 4 }}
    >
      <Flex direction={"column"} gap={10} w={"full"}>
        <>
          <Link
            to={"/"}
            as={RouterLink}
            pl={2}
            display={{ base: "none", md: "block" }}
            cursor={"pointer"}
          >
            <InstagramLogo />
          </Link>
          <Link
            to={"/"}
            as={RouterLink}
            pl={2}
            display={{ base: "block", md: "none" }}
            cursor={"pointer"}
            borderRadius={6}
            _hover={{ bg: "whiteAlpha.200" }}
            w={10}
          >
            <InstagramMobileLogo />
          </Link>
        </>
        <Flex direction={"column"} gap={5} cursor={"pointer"}>
          <SidebarItems />
        </Flex>
      </Flex>

      <>
        <Tooltip
          hasArrow
          label={"Logout"}
          placement="right"
          ml={1}
          openDelay={500}
          display={{ base: "block", md: "none" }}
        >
          <Flex
            onClick={toggleColorMode}
            alignItems={"center"}
            gap={4}
            _hover={{ bg: "whiteAlpha.400" }}
            borderRadius={6}
            p={2}
            w={{ base: 10, md: "full" }}
            mt={"auto"}
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            <BiLogOut size={25} />
            <Button
              bg={colorMode === "light" ? "white" : "gray.800"}
              display={{ base: "none", md: "block" }}
              variant={"ghost"}
              _hover={{ bg: "transparent" }}
              isLoading={loading}
            >
              Change Cheme
            </Button>
          </Flex>
        </Tooltip>
      </>

      <>
        <Tooltip
          hasArrow
          label={"Logout"}
          placement="right"
          ml={1}
          mt={"-90px"}
          openDelay={500}
          display={{ base: "block", md: "none" }}
        >
          <Flex
            onClick={handleLogout}
            alignItems={"center"}
            gap={4}
            _hover={{ bg: "whiteAlpha.400" }}
            borderRadius={6}
            p={2}
            w={{ base: 10, md: "full" }}
            mt={"auto"}
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            <BiLogOut size={25} />
            <Button
              display={{ base: "none", md: "block" }}
              variant={"ghost"}
              _hover={{ bg: "transparent" }}
              isLoading={loading}
            >
              Log out
            </Button>
          </Flex>
        </Tooltip>
      </>
    </Box>
  );
};

export default Sidebar;
