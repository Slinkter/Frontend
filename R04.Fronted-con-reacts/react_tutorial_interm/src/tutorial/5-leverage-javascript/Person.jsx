import React from "react";
import avatar from "../../assets/default-image.jpeg";

const Person = ({ name, nickname = "shakeAndBake", images }) => {
  const img = images?.[0]?.small?.url || avatar;

  return (
    <div>
      <img src={img} alt={name} style={{ width: "50px" }} />
      <h4>{name}</h4>
      <p>Nickname:{nickname}</p>
    </div>
  );
};

export default Person;
