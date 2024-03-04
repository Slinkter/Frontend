import React, { useState } from "react";
import "./style.css";

import { FaStar } from "react-icons/fa";

const StarRating = ({ noOfStarts = 1 }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  function handleClick(getCurrentIndex) {
    console.log("handleClick :", getCurrentIndex);
    setRating(getCurrentIndex);
  }

  function handleMouseEnter(getCurrentIndex) {
    console.log("handleMouseEnter : ", getCurrentIndex);
    setHover(getCurrentIndex);
  }

  function handleMouseLeave() {
    console.log("handleMouseLeave : ", rating);
    setHover(rating);
  }

  return (
    <div className="star-rating">
      {[...Array(noOfStarts)].map((_, index) => {
        index += 1;
        return (
          <FaStar
            key={index}
            size={20}
            className={index <= (hover || rating) ? "active" : "inactive"}
            onClick={() => handleClick(index)}
            onMouseMove={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave()}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
