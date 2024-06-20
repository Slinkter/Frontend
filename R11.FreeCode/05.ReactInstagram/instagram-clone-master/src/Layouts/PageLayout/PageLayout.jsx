import { Box, Flex, Spinner } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Navbar from "../../components/Navbar/Navbar";

// PageLayout component wraps the entire layout of the application
const PageLayout = ({ children }) => {
  // useLocation hook is used to get the current pathname
  const { pathname } = useLocation();
  // useAuthState hook from react-firebase-hooks is used to get the current user and loading state
  const [user, loading] = useAuthState(auth);
  // La barra lateral se renderiza solo si la ruta no es /auth y hay un usuario autenticado.
  const canRenderSidebar = pathname !== "/auth" && user;
  // Determine if the navbar should be rendered (user is not authenticated, not loading, and not on the /auth page)
  const canRenderNavbar = !user && !loading && pathname !== "/auth";

  // If user is not authenticated and still loading, show the spinner
  const checkingUserIsAuth = !user && loading;
  if (checkingUserIsAuth) return <PageLayoutSpinner />;

  return (
    <Flex flexDir={canRenderNavbar ? "column" : "row"}>
      {/* Sidebar on the left if conditions are met */}
      {canRenderSidebar ? (
        <Box w={{ base: "70px", md: "240px" }}>
          <Sidebar />
        </Box>
      ) : null}
      {/* Navbar if conditions are met */}
      {canRenderNavbar ? <Navbar /> : null}
      {/* The main content of the page */}
      <Box
        flex={1}
        w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }}
        mx={"auto"}
      >
        {children}
      </Box>
    </Flex>
  );
};

export default PageLayout;

// Spinner component shown while checking if user is authenticated
const PageLayoutSpinner = () => {
  return (
    <Flex
      flexDir="column"
      h="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner size="xl" />
    </Flex>
  );
};
