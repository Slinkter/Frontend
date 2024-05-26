import React from "react";
import PostUpdate from "./common/PostUpdate/PostUpdate";

const HomeComponent = ({ currentUser }) => {
  return (
    <div className="home-component">
      <PostUpdate currentUser={currentUser} />
    </div>
  );
};

export default HomeComponent;
