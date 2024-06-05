import { useMemo, useState } from "react";
import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import {
  getComments,
  getLikesByUser,
  likePost,
  postComment,
} from "../../../api/FirestoreAPI";
import "./LinkButton.scss";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";

const LinkButton = ({ userId, postId, currentUser }) => {
  const [likesCount, setLikesCount] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleLike = () => {
    likePost(userId, postId, liked);
  };

  const getComment = (e) => {
    setComment(e.target.value);
  };

  const addComment = () => {
    const timeStamp = getCurrentTimeStamp("LLL");
    postComment(postId, comment, timeStamp, currentUser?.name);
    setComment("");
  };

  useMemo(() => {
    getLikesByUser(userId, postId, setLiked, setLikesCount);
    getComments(postId, setComments);
  }, [userId, postId]);

  return (
    <div className="like-container">
      <p>{likesCount} People like this post </p>
      <div className="hr-line">
        <hr />
      </div>
      <div className="like-comment">
        <div className="likes-comment-inner" onClick={handleLike}>
          {liked ? (
            <AiFillHeart size={30} color="#0a66c2" />
          ) : (
            <AiOutlineHeart size={30} />
          )}
          <p className={liked ? "blue" : "black"}>Like</p>
        </div>
        {/*  */}
        <div
          className="likes-comment-inner"
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          <AiOutlineComment
            size={30}
            color={showCommentBox ? "#0a66c2" : "#212121"}
          />
          <p className={showCommentBox ? "blue" : "black"}>Comment</p>
        </div>
      </div>

      {showCommentBox ? (
        <>
          <input
            type="text"
            placeholder="Add a Comment"
            className="comment-input"
            name="comment"
            value={comment}
            onChange={getComment}
          />
          <button className="add-comment-btn" onClick={addComment}>
            Add Comment
          </button>
        </>
      ) : (
        <></>
      )}

      {comments.length > 0 ? (
        comments.map((comment) => {
          return (
            <div className="all-comments" key={comment.timeStamp}>
              <p className="name">{comment.name}</p>
              <p className="comment">{comment.comment}</p>
              <p>*</p>
              <p className="timestamp">{comment.timeStamp}</p>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default LinkButton;
