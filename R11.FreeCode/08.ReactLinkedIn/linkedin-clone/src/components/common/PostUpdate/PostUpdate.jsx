import React, { useMemo, useState } from "react";
import "./PostUpdate.scss";
import ModalContainer from "../Modal/Modal";
import { getStatus, postStatus } from "../../../api/FirestoreAPI";
import PostCard from "../PostCard/PostCard";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import { getUniqueId } from "../../../helpers/getUniqueId";

const PostUpdate = ({ currentUser }) => {
  let userEmail = localStorage.getItem("userEmail");
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatuses, setAllStatuses] = useState([]);

  const sendStatus = async () => {
    let object = {
      status: status,
      timeStamp: getCurrentTimeStamp("LLL"),
      userEmail: currentUser.email,
      userName: currentUser.name,
      postID: getUniqueId(),
    };

    await postStatus(object);
    await setModalOpen(false);
    await setStatus("");
  };
  console.log(getCurrentTimeStamp("LLL"));
  useMemo(() => {
    getStatus(setAllStatuses);
  }, []);

  console.log(userEmail);

  return (
    <div className="post-status-main">
      <div className="post-status">
        <button className="open-post-modal" onClick={() => setModalOpen(true)}>
          Start a Post
        </button>
        <ModalContainer
          setStatus={setStatus}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          status={status}
          sendStatus={sendStatus}
        />
      </div>

      <>
        {allStatuses.map((post) => {
          return (
            <div key={post.id}>
              <PostCard post={post} />
            </div>
          );
        })}
      </>
    </div>
  );
};

export default PostUpdate;
