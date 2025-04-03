import React from "react";
import { Outlet } from "react-router";

const HomeLayout = () => {
    return (
        <>
            <nav>
                <span className="text-4xl text-primary ">comfy</span>
            </nav>

            <section className="align-element py-20 border-red-500 border-2">
                <Outlet />
            </section>
        </>
    );
};

export default HomeLayout;
