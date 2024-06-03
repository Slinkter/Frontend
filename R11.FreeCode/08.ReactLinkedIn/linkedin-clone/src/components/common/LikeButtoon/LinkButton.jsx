import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import "./LinkButton.scss";

const LinkButton = () => {
  const handleLike = () => {};

  return (
    <div className="like-container" onClick={handleLike}>
      <AiOutlineLike size={30} />
      <p>Like</p>
    </div>
  );
};

export default LinkButton;
