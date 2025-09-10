//
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Box, Flex, Spinner } from "@chakra-ui/react";
//
import { auth } from "../../firebase/firebase";
//
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

const PageLayout = ({ children }) => {
    const { pathname } = useLocation();
    const [user, loading] = useAuthState(auth);
    //
    const canRenderSidebar = pathname !== "/auth" && user;
    const canRenderNavbar = pathname !== "/auth" && !user && !loading;
    const checkingUserIsAuth = !user && loading;
    //
    if (checkingUserIsAuth) return <PageLayoutSpinner />;

    return (
        <Flex flexDir={canRenderNavbar ? "column" : "row"}>
            {canRenderNavbar ? <Navbar /> : null}
            {canRenderSidebar ? <Sidebar /> : null}
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
