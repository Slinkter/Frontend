import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { Box, Flex, Spinner } from "@chakra-ui/react";

import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar/Sidebar";

const PageLayout = ({ children }) => {
    // hooks
    const { pathname } = useLocation();
    const [authUser, loading] = useAuthState(auth);
    //
    console.log(
        "authUser ",
        authUser,
        " loading :",
        loading,
        " pathname",
        pathname
    );
    //
    const showSidebar = authUser && pathname !== "/auth";
    const showNavbar = !authUser && !loading && pathname !== "/auth";
    const showLoading = !authUser && loading;

    if (showLoading) {
        return <PageLayoutSpinner />;
    }

    return (
        <Flex flexDir={showNavbar ? "column" : "row"}>
            {showSidebar ? <Sidebar /> : null}
            {showNavbar ? <Navbar /> : null}

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
            h="100vh"
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
        >
            <Spinner size={"xl"} />
        </Flex>
    );
};
