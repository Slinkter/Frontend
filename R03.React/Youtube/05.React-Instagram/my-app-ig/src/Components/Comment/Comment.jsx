import React from "react";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";

const Comment = ({ comment }) => {
    const { userProfile, isLoading } = useGetUserProfileById(comment.createdBy);

    console.log(userProfile, isLoading, comment);

    return (
        <Flex gap={4}>
            <Link to={`/${userProfile?.username}`}>
                <Avatar src={userProfile?.profilePicURL} size={"sm"} />
            </Link>
            <Flex direction={"column"}>
                <Flex gap={2} alignItems={"center"}>
                    <Link to={`/${userProfile?.username}`}>
                        <Text fontWeight={"bold"} fontSize={12}>
                            {userProfile?.username}
                        </Text>
                    </Link>
                    <Text fontSize={14}>{comment.comment}</Text>
                </Flex>
                <Text fontSize={12} color={"gray"}>
                    {timeAgo(comment.createdAt)}
                </Text>
            </Flex>
        </Flex>
    );
};

export default Comment;
