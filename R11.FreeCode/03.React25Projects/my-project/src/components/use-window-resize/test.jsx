import React from "react";
import userWindowResize from ".";

const UseWindowsResizeTest = () => {
  const windowSize = userWindowResize();
  const { width, height } = windowSize;

  return (
    <div>
      <h1>Use Winwdow resize Hook</h1>
      <p> width is {width}</p>
      <p> height is {height}</p>
    </div>
  );
};

export default UseWindowsResizeTest;
