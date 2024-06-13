import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

const PageLayout = ({ children }) => {
    const { pathname } = useLocation();
    const [user, loading] = useAuthState(auth);

    const candRenderNavbar = !user && !loading && pathname !== "/auth";
    const candRenderSidebar = pathname !== "/auth";
    const checkingUserIsAuth = !user && loading;

    if (checkingUserIsAuth) return <PageLayoutSpinner />;

    return (
        <Flex
            flexDir={candRenderNavbar ? "column" : "row"}
            justifyContent={"center"}
            alignItems={"center"}
            border={"px solid red"}
        >
            {candRenderSidebar ? (
                <>
                    <Box w={{ base: "70px", md: "240px" }}>
                        <Sidebar />
                    </Box>
                </>
            ) : null}
            {candRenderNavbar ? (
                <>
                    <Navbar />
                </>
            ) : null}
            <Box
                flex={1}
                w={{ base: "calc(100%-700px)", md: "calc(100%-240px)" }}
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
        <>
            <Flex
                flexDir={"column"}
                h={"100vh"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Spinner size={"xl"} />
            </Flex>
        </>
    );
};
