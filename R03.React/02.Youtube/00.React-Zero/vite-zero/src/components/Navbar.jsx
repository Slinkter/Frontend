import React from "react";
import { links } from "./data";

/* 
sm:640px
md:768px
*/

const Navbar = () => {
  return (
    <nav className="bg-emerald-100">
      <div className="align-element py-4 flex flex-col md:gap-0  sm:gap-x-16 sm:items-center sm:py-8">
        <h2>
          web <span>dev</span>
        </h2>
        <div className="flex gap-x-3">
          {links.map((link) => {
            const { id, href, text } = link;
            return (
              <a
                key={id}
                className="capitalize  text-lg tracking-wide hover:text-emerald-600 duration-300"
                href={href}
              >
                {text}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
