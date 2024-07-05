import React from "react";
import { useAuth } from "../provider/auth";
import { Navigate } from "react-router-dom";

const ProfilePage = () => {
    const auth = useAuth();

    if (!auth.user) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container">
            <h1>Profile</h1>
            <p>welcome {auth.user?.username}</p>
        </div>
    );
};

export default ProfilePage;
