import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import Navbar from "./Navbar";
import Hero from "./Hero";

const HomeLayout = () => {
    return (
        <>
            <Navbar></Navbar>

            <Header />
            <section className="align-element py-20 border-red-500 border-2">
                <Outlet />
            </section>

            <Hero></Hero>
        </>
    );
};

export default HomeLayout;
