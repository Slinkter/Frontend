import React from "react";
import { Outlet } from "react-router";

const HomeLayout = () => {
  return (
    <>
      <nav>
        <span className="text-4xl text-primary ">comfy</span>
      </nav>
      <Outlet />
    </>
  );
};

export default HomeLayout;
