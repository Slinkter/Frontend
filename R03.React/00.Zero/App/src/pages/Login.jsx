import React from "react";
import { Link } from "react-router-dom";
import { Form } from "react-router-dom";
import FormInput from "../components/FormInput";
import SubmitBtn from "../components/SubmitBtn";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Login = () => {
    const navigate = useNavigate();

    const loginAsGuest = () => {
        try {
            const response = "";
        } catch (error) {}
    };

    return (
        <section className="h-screen grid place-items-center">
            <Form
                method="post"
                className="card w-96  p-8 bg-base-100  shadow-lg flex flex-col gap-y-4"
            >
                <h4 className="text-center text-3xl font-bold">Login</h4>
                <FormInput type="email" label={"email"} name={"identifier"} />
                <FormInput
                    type="password"
                    label={"password"}
                    name={"password"}
                />
                <div className="mt-4">
                    <SubmitBtn />
                </div>
                <button
                    className="btn btn-secondary btn-block"
                    type="button"
                    onClick={() => alert("login as guest")}
                >
                    guest user{" "}
                </button>
                <p className="text-center">
                    not a member yet ?
                    <Link
                        to={"/register"}
                        className="ml-2 link link-hover link-primary capitalize"
                    >
                        register
                    </Link>
                </p>
            </Form>
        </section>
    );
};

export default Login;
