import React, { useEffect, useMemo, useState } from "react";
import ModalContainer from "../Modal/Modal";
import {
  getConnections,
  getStatus,
  postStatus,
  updatePost,
} from "../../../api/FirestoreAPI";
import PostCard from "../PostCard/PostCard";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import { getUniqueId } from "../../../helpers/getUniqueId";
import "./PostUpdate.scss";

const PostUpdate = ({ currentUser }) => {
  /*   let userEmail = localStorage.getItem("userEmail"); */
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatuses, setAllStatuses] = useState([]);
  const [currentPost, setCurrentPost] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const sendStatus = async () => {
    let object = {
      status: status,
      timeStamp: getCurrentTimeStamp("LLL"),
      userEmail: currentUser.email,
      userName: currentUser.name,
      postID: getUniqueId(),
      userID: currentUser.id,
    };
    await postStatus(object);
    await setModalOpen(false);
    await setStatus("");
    setIsEdit(false);
  };

  const getEditData = (posts) => {
    setModalOpen(true);
    setStatus(posts?.status);
    setCurrentPost(posts);
    setIsEdit(true);
  };

  const updateStatus = () => {
    console.log(status);
    updatePost(currentPost.id, status);
    setModalOpen(false);
  };

  useMemo(() => {
    getStatus(setAllStatuses);
  }, []);

  return (
    <div className="post-status-main">
      <div className="user-details">
        <img src={currentUser?.imageLink} alt="imageLink" />
        <p className="name">{currentUser?.name}</p>
        <p className="headline">{currentUser?.headline}</p>
      </div>

      <div className="post-status">
        <img
          className="post-image"
          src={currentUser?.imageLink}
          alt="imageLink"
        />
        <button
          className="open-post-modal"
          onClick={() => {
            setModalOpen(true);
            setIsEdit(false);
          }}
        >
          Start a Post
        </button>
        <ModalContainer
          setStatus={setStatus}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          status={status}
          sendStatus={sendStatus}
          isEdit={isEdit}
          updateStatus={updateStatus}
        />
      </div>

      <>
        {allStatuses.map((post) => {
          return (
            <div key={post.id}>
              <PostCard post={post} getEditData={getEditData} />
            </div>
          );
        })}
      </>
    </div>
  );
};

export default PostUpdate;
