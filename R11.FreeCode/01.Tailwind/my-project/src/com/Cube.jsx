import React from "react";

const Cube = () => {
  return (
    <>
      <div className="flex w-full  bg-red-900 h-52  justify-evenly space-x-4 space-y-4">
        <div className="w-2/5 min-h-max bg-blue-600">Sidebar</div>
        <div className="w-3/5 min-h-screen bg-green-600    ">Main Content</div>
      </div>
    </>
  );
};

export default Cube;
