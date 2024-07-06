import React from "react";
import { useAuth } from "../Layout/AuthLayout";
import { Typography } from "@material-tailwind/react";
import { Navigate } from "react-router-dom";

const ProfilePage = () => {
    const auth = useAuth();

    if (!auth.user) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <Typography color="gray" className="mt-1 font-normal">
                ProfilePage
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Welcome : {auth?.user?.username}
            </Typography>
            <br />
        </div>
    );
};

export default ProfilePage;
