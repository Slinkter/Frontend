import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../Layout/AuthLayout";
import { Button } from "@material-tailwind/react";

const HomePage = () => {
    const auth = useAuth();
    console.log(auth);

    return (
        <div>
            <h1>Hola</h1>
            <Outlet />
            <h1>Adiós</h1>
            <div className="flex  justify-around">
                <Button
                    variant="outlined"
                    color="blue"
                    size="sm"
                    className="rounded-full w-40"
                    onClick={auth.login}
                >
                    <span>Login</span>
                </Button>
                {!auth.user ? <></> : <></>}{" "}
                <Button
                    variant="outlined"
                    color="red"
                    size="sm"
                    className="rounded-full w-40"
                    onClick={auth.logout}
                >
                    <span>Logout</span>
                </Button>
            </div>
        </div>
    );
};

export default HomePage;
