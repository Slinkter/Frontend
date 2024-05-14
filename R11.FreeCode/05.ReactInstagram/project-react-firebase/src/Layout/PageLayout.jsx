import { Box, Flex, Spinner } from "@chakra-ui/react";

import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [user, loading] = useAuthState(auth); // firebase hooks
  const canRenderSidebar = pathname !== "/auth" && user;
  const canRenderNavBar = !user && !loading && pathname !== "/auth";
  const checkingUserIsAuth = !user && loading;

  /* PRE - RENDER */
  if (checkingUserIsAuth) {
    return <PageLayoutSpinner />;
  }

  /* RENDER */
  return (
    <Flex flexDir={canRenderNavBar ? "column" : "row"}>
      {/* Sidebar  on the left */}
      {canRenderSidebar ? (
        <Box w={{ base: "70px", md: "240px" }}>
          <Sidebar />
        </Box>
      ) : null}
      {/* the page content on the right */}
      {canRenderNavBar ? <Navbar /> : null}

      <Box
        flex={1}
        w={{ base: "calc(100%-70px)", md: "calc(100%-240px)" }}
        mx={"auto"}
      >
        {children}
      </Box>
    </Flex>
  );
};

export default PageLayout;

const PageLayoutSpinner = () => {
  return (
    <Flex
      flexDir={"column"}
      h="100vh"
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Spinner size="xl" />
    </Flex>
  );
};
