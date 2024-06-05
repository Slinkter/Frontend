import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import LinkButton from "../LikeButtoon/LinkButton";
import { getAllUsers, getCurrentUser } from "../../../api/FirestoreAPI";
import "./PostCard.scss";

const PostCard = ({ post, id }) => {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);

  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);

  return (
    <div className="posts-card" key={id}>
      <div className="post-image-wrapper">
        <img
          src={
            allUsers
              .filter((item) => item.id === post.userID)
              .map((item) => item.imageLink)[0]
          }
          alt="profile-image"
          className="profile-image "
        />
        <div>
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
        </div>
      </div>
      <p className="status">{post?.status}</p>
      <LinkButton
        userId={currentUser?.id}
        postId={post.id}
        currentUser={currentUser}
      />
    </div>
  );
};

export default PostCard;
