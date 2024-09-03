import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../Layout/AuthLayout";
import { Button, Typography } from "@material-tailwind/react";

const HomePage = () => {
    const auth = useAuth();
    console.log(auth);

    return (
        <div>
            <Typography color="gray" className="mt-1 font-normal">
                Nice to meet you! Enter your details to register.
            </Typography>
            <Outlet />
        </div>
    );
};

export default HomePage;
