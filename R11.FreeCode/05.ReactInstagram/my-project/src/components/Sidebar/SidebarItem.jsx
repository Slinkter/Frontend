import React from "react";
import Home from "./Home";
import Search from "./Search";
import Notifications from "./Notifications";
import CreatePost from "./CreatePost";
import ProfileLink from "./ProfileLink";

const SidebarItem = () => {
  return (
    <div>
      <Home />
      <Search />
      <Notifications />
      <CreatePost />
      <ProfileLink />
    </div>
  );
};

export default SidebarItem;
