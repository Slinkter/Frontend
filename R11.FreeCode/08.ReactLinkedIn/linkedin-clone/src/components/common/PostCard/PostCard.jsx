import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import LinkButton from "../LikeButtoon/LinkButton";
import {
  deletePost,
  getAllUsers,
  getConnections,
  getCurrentUser,
} from "../../../api/FirestoreAPI";
import "./PostCard.scss";
import { BsPencil, BsTrash } from "react-icons/bs";

const PostCard = ({ post, id, getEditData }) => {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);

  const [isConnected, setIsConnected] = useState(false);

  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);

  useEffect(() => {
    getConnections(currentUser.id, post.userID, setIsConnected);
  }, [currentUser.id, post.userID]);

  return isConnected ? (
    <>
      <div className="posts-card" key={id}>
        <div className="post-image-wrapper">
          {currentUser.id === post.userID ? (
            <>
              <div className="action-container">
                <BsPencil
                  className="action-icon"
                  size={20}
                  onClick={() => getEditData(post)}
                />
                <BsTrash
                  className="action-icon"
                  size={20}
                  onClick={() => deletePost(post.id)}
                />
              </div>
            </>
          ) : (
            <></>
          )}

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
              {allUsers.filter((user) => user.id === post.userID)[0]?.name}
            </p>
            <p className="headline">
              {allUsers.filter((user) => user.id === post.userID)[0]?.headline}{" "}
              headline
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

        <div className="mx-auto">
          <h1>AllUser</h1>
          <pre>{JSON.stringify(allUsers, null, 2)}</pre>
          <hr />
          <h1>Post</h1>
          <pre>{JSON.stringify(post, null, 2)}</pre>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default PostCard;
