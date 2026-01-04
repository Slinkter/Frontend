import React from "react";

const Categories = ({ children, title }) => (
  <div className="w-full my-8">
    <h3 className="text-white text-xl md:text-2xl font-bold mb-4 pl-[5%] md:pl-8 text-shadow">{title}</h3>
    {children}
  </div>
);

export default Categories;
