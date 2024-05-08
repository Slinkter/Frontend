import {
  Avatar,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import React from "react";
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername";
import { Link } from "react-router-dom";

const Comment = ({ comment }) => {
  const { userProfile, isLoading } = useGetUserProfileByUsername(
    comment.createdBy
  );

  if (isLoading) return <CommentSkeleton />;

  return (
    <Flex gap={4}>
      <Link to={`/${userProfile.username}`}>
        <Avatar src={userProfile.profilePicURL} size={"sm"} />
      </Link>

      <Flex direction={"column"}>
        <Flex gap={2} alignItems={"center"}>
          <Link to={`/${userProfile.username}`}>
            <Text fontWeight={"bold"} fontSize={12}>
              {userProfile.username}
            </Text>
          </Link>

          <Text fontSize={12} color={"gray"}>
            {/*   {text} */}
            {comment.comment}
          </Text>
        </Flex>
      </Flex>
      <Text fontSize={12} color={"gray"}>
        {userProfile.createdAt}
      </Text>
    </Flex>
  );
};

export default Comment;

const CommentSkeleton = () => {
  return (
    <Flex gap={4} w={"full"} alignContent={"center"}>
      <SkeletonCircle h={10} w={10} />
      <Flex gap={1} flexDir={"column"}>
        <Skeleton height={2} width={100} />
        <Skeleton height={2} width={50} />
      </Flex>
    </Flex>
  );
};
