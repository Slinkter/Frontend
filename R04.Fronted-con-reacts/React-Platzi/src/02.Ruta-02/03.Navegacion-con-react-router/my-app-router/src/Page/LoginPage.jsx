import React, { useState } from "react";
import { useAuth } from "../Layout/AuthLayout";
import {
    Button,
    Card,
    Checkbox,
    Input,
    Typography,
} from "@material-tailwind/react";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const auth = useAuth();

    const handleLogin = (e) => {
        e.preventDefault();
        if (!username) {
            return alert("usuario vacio");
        }
        auth.login({ username });
    };

    if (auth.user) {
        return <Navigate to="/profile" />;
    }

    /*  */

    return (
        <div>
            <Card color="transparent" shadow={false}>
                <Typography variant="h1">Login </Typography>

                <Typography color="gray" className="mt-1 font-normal">
                    Nice to meet you! Enter your details to register.
                </Typography>
                <form
                    className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
                    onSubmit={handleLogin}
                >
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3"
                        >
                            Your Name
                        </Typography>
                        <Input
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            size="lg"
                            placeholder="escribe tu nombre"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className:
                                    "before:content-none after:content-none",
                            }}
                        />
                    </div>

                    <Button className="mt-6" fullWidth onClick={handleLogin}>
                        Go
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default LoginPage;
