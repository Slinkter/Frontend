import React from "react";
import Navbar from "../components/Navbar/Navbar";

type AuthpageProps = {};

const Authpage: React.FC<AuthpageProps> = () => {
  return (
    <div className="bg-gradient-to-b from-gray-600 to-black h-screen relative  ">
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none">
        <img src="/hero.png" alt="hero img" />
      </div>
    </div>
  );
};
export default Authpage;
