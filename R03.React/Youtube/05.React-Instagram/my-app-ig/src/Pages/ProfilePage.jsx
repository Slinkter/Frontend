import React from "react";
import { useParams } from "react-router-dom";
import useGetUserProfileByUsername from "../hooks/useGetUserProfileByUsername";
import {
    Container,
    Flex,
    Link,
    Skeleton,
    SkeletonCircle,
    Text,
    VStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import ProfileHeader from "../Components/Profile/ProfileHeader";
import ProfileTabs from "../Components/Profile/ProfileTabs";
import ProfilePosts from "../Components/Profile/ProfilePosts";

const ProfilePage = () => {
    const { username } = useParams();
    const { isLoading, userProfile } = useGetUserProfileByUsername(username);
    console.log(userProfile);
    const userNotFound = !isLoading && !userProfile;
    if (userNotFound) return <UserNotFound />;
    console.log(username);

    return (
        <Container maxW={"container.lg"} py={5} border={"1px solid white"}>
            <Flex
                py={10}
                px={4}
                pl={{ base: 4, md: 10 }}
                w={"full"}
                mx={"auto"}
                flexDirection={"column"}
            >
                {!isLoading && userProfile && <ProfileHeader />}
                {!isLoading && <ProfileHeaderSkeleton />}
            </Flex>
            <Flex
                px={{ base: 2, sm: 4 }}
                maxW={"full"}
                mx={"auto"}
                borderTop={"1px solid"}
                borderColor={"whiteAlpha.300"}
                direction={"column"}
            >
                <ProfileTabs />
                <ProfilePosts />
            </Flex>
        </Container>
    );
};

export default ProfilePage;

const UserNotFound = () => {
    return (
        <Flex flexDir={"column"} mx={"auto"} textAlign={"center"}>
            <Text fontSize={"2xl"}> User not Found</Text>
            <Link
                as={RouterLink}
                to={"/"}
                color={"blue.500"}
                w={"max-content"}
                mx={"auto"}
            >
                Go Home
            </Link>
        </Flex>
    );
};

const ProfileHeaderSkeleton = () => {
    return (
        <Flex
            gap={{ base: 4, sm: 10 }}
            py={10}
            direction={{ base: "column", sm: "row" }}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <SkeletonCircle size={24} />
            <VStack
                alignItems={{ base: "center", sm: "flex-start" }}
                gap={2}
                mx={"auto"}
                flex={1}
            >
                <Skeleton height={"12px"} width={"150px"} />
                <Skeleton height={"12px"} width={"150px"} />
            </VStack>
        </Flex>
    );
};
