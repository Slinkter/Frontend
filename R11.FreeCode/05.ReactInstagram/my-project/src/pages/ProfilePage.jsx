import { Container, Flex, Link, Text } from "@chakra-ui/react";

import React from "react";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileHeaderSkeleton from "../components/Profile/ProfileHeaderSkeleton";
import ProfileTabs from "../components/Profile/ProfileTabs";
import ProfilePosts from "../components/Profile/ProfilePosts";
import { useParams } from "react-router-dom";
import useGetUserProfileByUsername from "../hooks/useGetUserProfileByUsername";
import { Link as RouterLink } from "react-router-dom";
const ProfilePage = () => {
  const { username } = useParams();

  const { isLoading, userProfile } = useGetUserProfileByUsername(username);
  const userNotFound = !isLoading && !userProfile;

  if (userNotFound) return <UserNotFound />;

  return (
    <>
      <Container maxW={"container.lg"} py={5} border={"1px red solid"}>
        <Flex
          px={{ base: 2, sm: 4 }}
          maxW={"full"}
          mx={"auto"}
          borderTop={"1px solid"}
          borderColor={"whiteAlpha.300"}
          direction={"column"}
        >
          {!isLoading && userProfile && <ProfileHeader />}
          {isLoading && <ProfileHeaderSkeleton />}
        </Flex>
        <Flex
          px={{ base: 2, sm: 4 }}
          maxW={"full"}
          mx={"auto"}
          borderTop={"1px solid"}
          borderColor={"wihteAlpha.300"}
          direction={"column"}
        >
          <ProfileTabs />
          <ProfilePosts />
        </Flex>
      </Container>
    </>
  );
};

export default ProfilePage;
//
const UserNotFound = () => {
  return (
    <Flex flexDir={"column"} textAlign={"center"} mx={"auto"}>
      <Text fontSize={"2xl"}>User not found</Text>
      <Link
        as={RouterLink}
        to={"/"}
        color={"blue.500"}
        w={"max-content"}
        mx={"auto"}
      >
        Go home
      </Link>
    </Flex>
  );
};
