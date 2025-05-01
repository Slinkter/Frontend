import React from "react";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";
import { FaBarsStaggered } from "react-icons/fa6";
import { BsCart3, BsMoonFill, BsSunFill } from "react-icons/bs";

const Navbar = () => {
    return (
        <nav className="bg-base-200">
            <div className="navbar align-element">
                <div className="navbar-start">
                    <NavLink
                        to={"/"}
                        className={
                            "hidden lg:flex btn btn-primary text-3xl items-center"
                        }
                    >
                        C
                    </NavLink>

                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <FaBarsStaggered className="h-6 w-6" />
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
                        >
                            <NavLinks />
                        </ul>
                    </div>
                </div>
                <div className="navbar-center hiddden lg:flex">
                    <ul className="menu menu-horizontal">
                        <NavLinks />
                    </ul>
                </div>
                <div className="navbar-end">
                    <label htmlFor="">
                        <input type="checkbox" />
                        <BsSunFill className="h-6 w-6" />
                    </label>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
