import React from "react";

import "./PostCard.scss";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post, id }) => {
  let navigate = useNavigate();

  return (
    <div className="posts-card" key={id}>
      <p
        className="name"
        onClick={() =>
          navigate("/profile", {
            state: { id: post?.userID, email: post.userEmail },
          })
        }
      >
        {post.userName}
      </p>
      <p className="timestamp">{post.timeStamp}</p>
      <p className="status">{post.status}</p>
    </div>
  );
};

export default PostCard;
