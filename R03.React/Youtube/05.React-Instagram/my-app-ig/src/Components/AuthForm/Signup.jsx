import React, { useState } from "react";

const Signup = () => {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        email: "",
        passowrd: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    return <div>Signup456</div>;
};

export default Signup;
