import React from "react";
import { useAuth } from "../Layout/AuthLayout";
import {
    Button,
    Card,
    Checkbox,
    Input,
    Typography,
} from "@material-tailwind/react";

const LogoutPage = () => {
    const auth = useAuth();

    const logout = (e) => {
        e.preventDefault();
        auth.logout();
    };

    return (
        <>
            <div className="flex justify-center items-center flex-col ">
                <Typography variant="h1">Logout</Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    ¿ Desea salir ?
                </Typography>
                <form className="mt-1 mb-2 w-full sm:w-96 ">
                    <Button className="mt-6" fullWidth onClick={logout}>
                        Salir
                    </Button>
                </form>
            </div>
        </>
    );
};

export default LogoutPage;
