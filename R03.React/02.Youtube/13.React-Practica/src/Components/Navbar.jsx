import React from "react";
import logOut from "../functions/logout";

const Navbar = (user) => {
    const handleLogOut = () => {
        logOut();
    };
    console.log(user);

    return (
        <div className="w-screen h-16 bg-red-500 flex justify-between items-center px-4 mb-4">
            <button
                className="w-92 bg-red-600 px-3 py-2 rounded-md text-white"
                onClick={handleLogOut}
            >
                log out
            </button>
        </div>
    );
};

export default Navbar;
