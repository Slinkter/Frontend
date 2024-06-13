import React from "react";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { Box } from "@chakra-ui/react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

const FeedPost = ({ post }) => {
    const { isLoading, userProfile, userId } = useGetUserProfileById(
        post.createdBy
    );

    return (
        <>
            <PostHeader />
            <Box></Box>
            <PostFooter />
        </>
    );
};

export default FeedPost;
