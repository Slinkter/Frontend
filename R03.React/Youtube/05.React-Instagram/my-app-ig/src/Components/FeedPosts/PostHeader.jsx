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
    const { isUpdating, isFollowing, handleFollowUser } = useFollowUser();
    return <div>PostHeader</div>;
};

export default PostHeader;
