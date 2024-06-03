import React from "react";
import "./Button.scss";

const Button = ({ title, onClick }) => {
  return (
    <div className="common-btn" onClick={onClick}>
      {title}
    </div>
  );
};

export default Button;
