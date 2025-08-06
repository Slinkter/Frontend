import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./style.css";

const StarRating = ({ num = 10 }) => {
    const [hover, setHover] = useState(0);
    const [rating, setRating] = useState(0);

    const handleClick = (index) => {
        setRating(index);
    };

    const handleMouseEnter = (index) => {
        setHover(index);
    };

    const handleMouseLeave = () => {
        setHover(rating);
    };

    return (
        <div className="star-rating">
            {[...Array(num)].map((_, index) => {
                const i = index + 1;
                return (
                    <FaStar
                        key={i}
                        size={30}
                        className={
                            i <= (hover || rating) ? "active" : "inactive"
                        }
                        onClick={() => handleClick(i)}
                        onMouseMove={() => handleMouseEnter(i)}
                        onMouseLeave={handleMouseLeave}
                    />
                );
            })}
        </div>
    );
};

export default StarRating;
