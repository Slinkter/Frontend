import { useState } from "react";

import "./App.css";

function App() {
  const url_img =
    "https://images.pexels.com/photos/730564/pexels-photo-730564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  const [count, setCount] = useState(0);

  return (
    <>
      <div
        className="w-full h-screen  flex flex-wrap justify-center items-center"
        style={{ backgroundImage: `url(${url_img})` }}
      >
        <h1 className="bg-red-200">Hello world!</h1>
      </div>
    </>
  );
}

export default App;
