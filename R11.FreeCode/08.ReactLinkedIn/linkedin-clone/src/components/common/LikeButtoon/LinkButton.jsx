import React, { useMemo, useState } from "react";
import {
  AiFillHeart,
  AiFillLike,
  AiOutlineHeart,
  AiOutlineLike,
} from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import "./LinkButton.scss";
import { getLikesByUser, likePost } from "../../../api/FirestoreAPI";

const LinkButton = ({ userId, postId }) => {
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    likePost(userId, postId, liked);
  };

  useMemo(() => {
    getLikesByUser(userId, postId, setLiked, setLikesCount);
  }, [userId, postId]);

  return (
    <div className="like-container" onClick={handleLike}>
      {liked ? (
        <AiFillHeart size={30} color="red" />
      ) : (
        <AiOutlineHeart size={30} />
      )}

      {likesCount}
    </div>
  );
};

export default LinkButton;

// 6:24:45
// https://www.youtube.com/watch?v=HimR8Xtz17U&t=21474s
