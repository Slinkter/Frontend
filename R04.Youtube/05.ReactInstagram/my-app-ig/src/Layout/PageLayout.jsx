import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { Box, Flex, Spinner } from "@chakra-ui/react";

import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar/Sidebar";

const PageLayout = ({ children }) => {
    const { pathname } = useLocation();
    const [authUser, loading] = useAuthState(auth);
    const canRenderSidebar = authUser && pathname !== "/auth";
    const canRenderNavbar = !authUser && !loading && pathname !== "/auth";
    const checkIsUserIsAuth = !authUser && loading;

    if (checkIsUserIsAuth) {
        return <PageLayoutSpinner />;
    }

    console.log("---".repeat(10));
    console.log("canRenderSidebar :", canRenderSidebar);
    console.log("candRenderNav : ", canRenderNavbar);
    document.title = "PageLayout" + " " + authUser?.email;

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
