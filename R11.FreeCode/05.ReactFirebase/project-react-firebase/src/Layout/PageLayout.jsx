import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [user, loading, error] = useAuthState(auth); // firebase hooks
  const canRenderSidebar = pathname !== "/auth" && user;
  const canRenderNavBar = !user && !loading && pathname !== "/auth";

  return (
    <Flex>
      {/* Sidebar  on the left */}
      {canRenderSidebar ? (
        <Box w={{ base: "70px", md: "240px" }}>
          <Sidebar />
        </Box>
      ) : null}
      {/* the page content on the right */}
      {canRenderNavBar ? <Navbar /> : null}

      <Box flex={1} w={{ base: "calc(100%-70px)", md: "calc(100%-240px)" }}>
        {children}
      </Box>
    </Flex>
  );
};

export default PageLayout;
