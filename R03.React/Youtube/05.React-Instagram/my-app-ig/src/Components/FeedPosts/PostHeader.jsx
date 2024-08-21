import React from "react";
import {
    Avatar,
    Box,
    Button,
    Flex,
    Skeleton,
    SkeletonCircle,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";
import useFollowUser from "../../hooks/useFollowUser";

const PostHeader = ({ post, creatorProfile }) => {
    const { isUpdating, isFollowing, handleFollowUser } = useFollowUser(
        post.createdBy
    );

    return (
        <>
            <Flex
                w={"full"}
                my={2}
                justifyContent={"space-between"}
                alignItems={"center"}
            >
                <Flex alignItems={"center"} gap={2}>
                    {creatorProfile ? (
                        <>
                            <Link to={`/${creatorProfile.username}`}>
                                <Avatar
                                    src={creatorProfile.profilePicURL}
                                    alt="user profile pic"
                                    size={"sm"}
                                />
                            </Link>
                        </>
                    ) : (
                        <>
                            <SkeletonCircle size={"10"} />
                        </>
                    )}

                    <Flex fontSize={12} fontWeight={"bold"} gap={"2"}>
                        {creatorProfile ? (
                            <>
                                <Link to={`/${creatorProfile.username}`}>
                                    {creatorProfile.username}
                                </Link>
                            </>
                        ) : (
                            <>
                                <Skeleton w={"100px"} h={"10px"} />
                            </>
                        )}

                        <Box color={"gray.500"}>{timeAgo(post.createdAt)}</Box>
                    </Flex>
                </Flex>
                <Box cursor={"pointer"}>
                    <Button
                        size={"xs"}
                        bg={"transparent"}
                        fontSize={12}
                        color={"blue.500"}
                        fontWeight={"bold"}
                        _hover={{
                            color: "white",
                        }}
                        transition={"0.2s ease-in-out"}
                        isLoading={isUpdating}
                        onClick={handleFollowUser}
                    >
                        {isFollowing ? "unfollow" : "follow"}
                    </Button>
                </Box>
            </Flex>
        </>
    );
};

export default PostHeader;
