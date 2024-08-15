import React, { useState } from "react";
import useLogin from "../../hooks/useLogin";
import { Alert, AlertIcon, Button, Input } from "@chakra-ui/react";

const Login = () => {
    const [inputs, setInputs] = useState({ email: "", password: "" });
    const { loading, error, login } = useLogin();

    return (
        <div>
            <Input
                placeholder="Email"
                fontSize={14}
                type="email"
                size={"sm"}
                value={inputs.email}
                onChange={(e) =>
                    setInputs({ ...inputs, email: e.target.value })
                }
            />
            <Input
                placeholder="Password"
                fontSize={14}
                type="password"
                size={"sm"}
                value={inputs.password}
                onChange={(e) =>
                    setInputs({ ...inputs, password: e.target.value })
                }
            />
            {error && (
                <Alert status="error" fontSize={13} p={2} borderRadius={4}>
                    <AlertIcon fontSize={12} />
                    hay un error
                </Alert>
            )}

            <Button
                w={"full"}
                colorScheme={"blue"}
                size={"sm"}
                fontSize={14}
                isLoading={loading}
                onClick={() => login(inputs)}
            >
                Login
            </Button>
        </div>
    );
};

export default Login;
