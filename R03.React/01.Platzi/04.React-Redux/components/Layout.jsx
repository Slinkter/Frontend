import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function Layout() {
    return (
        <>
            <Outlet />
            <Footer />;
        </>
    );
}

export default Layout;
