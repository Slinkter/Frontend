import React from "react";
import Page from "./page";

const App = () => {
  return (
    <>
      <img
        className="w-16 md:w-32 lg:w-48"
        src="https://images.pexels.com/photos/7723354/pexels-photo-7723354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="img"
      />
      <h1 className="text-bluejs text-3xl bg-[#000] ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, dicta
        a inventore ducimus id veniam quo distinctio harum esse temporibus quod,
        repudiandae corrupti ab iure. Fuga expedita dolorem perferendis quae!
      </h1>
      <h1 className="text-redjs text-2xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, dicta
        a inventore ducimus id veniam quo distinctio harum esse temporibus quod,
        repudiandae corrupti ab iure. Fuga expedita dolorem perferendis quae!
      </h1>
      <h1 className="text-greenjs-200 text-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, dicta
        a inventore ducimus id veniam quo distinctio harum esse temporibus quod,
        repudiandae corrupti ab iure. Fuga expedita dolorem perferendis quae!
      </h1>
      <h1 className="text-[#6d28d9] ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, dicta
        a inventore ducimus id veniam quo distinctio harum esse temporibus quod,
        repudiandae corrupti ab iure. Fuga expedita dolorem perferendis quae!
      </h1>
      <button className="btn"> Iam a button</button>
    </>
  );
};

export default App;
