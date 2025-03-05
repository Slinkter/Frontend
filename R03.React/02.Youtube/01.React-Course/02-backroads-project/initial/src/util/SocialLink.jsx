import React from "react";

const SocialLink = ({ itemClass, href, icon }) => {
  return (
    <li>
      <a href={href} className={itemClass} target="_blank">
        <i className={icon}></i>
      </a>
    </li>
  );
};

export default SocialLink;
