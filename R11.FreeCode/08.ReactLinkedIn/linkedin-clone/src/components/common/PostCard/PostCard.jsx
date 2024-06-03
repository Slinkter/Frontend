import React, { useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";
import LinkButton from "../LikeButtoon/LinkButton";

import "./PostCard.scss";
import { getCurrentUser } from "../../../api/FirestoreAPI";

const PostCard = ({ post, id }) => {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  console.log(currentUser.id);
  return (
    <div className="posts-card" key={id}>
      <p
        className="name"
        onClick={() =>
          navigate("/profile", {
            state: { id: post?.userID, email: post?.userEmail },
          })
        }
      >
        {post?.userName}
      </p>
      <p className="timestamp">{post?.timeStamp}</p>
      <p className="status">{post?.status}</p>
      <LinkButton userId={currentUser?.id} />
    </div>
  );
};

export default PostCard;
