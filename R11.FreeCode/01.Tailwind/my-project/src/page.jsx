import React from "react";

const Page = () => {
  return (
    <div className="h-screen p-4">
      <div className="inline-block p-4 text-black bg-white border rounded-lg shadow-md hover:shadow-cyan-500">
        <img
          className=" w-64 object-cover blur-sm hover:blur-none hover:scale-110 overflow-hidden hover:overflow-hidden"
          src="https://images.pexels.com/photos/7723354/pexels-photo-7723354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
        />
        <h1 className="text-2xl">Hello</h1>
        <p className="mb-4">this is my div</p>
        <button className="animate-bounce transition delay-100 duration-500 hover:-translate-y-1  px-3 py-2 rounded-lg  cursor-pointer bg-cyan-500 shadow-md shadow-cyan-500/50 text-white">
          Say Hello
        </button>
      </div>
    </div>
  );
};

export default Page;
