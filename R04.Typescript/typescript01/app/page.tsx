import React from "react";

let title = "hello world ";

function Button() {
  return <button>{title}</button>;
}

const page = () => {
  return (
    <div>
      <Button />
    </div>
  );
};

export default page;
