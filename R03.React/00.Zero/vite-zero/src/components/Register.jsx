import React from "react";
import { Form, Link } from "react-router";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";

const Register = () => {
    return (
        <section className="h-screen grid place-items-center">
            <Form
                method="POST "
                className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col"
            >
                <h4 className="text-center text-3xl font-bold">Register</h4>
                <FormInput type={"text"} label={"username"} name={"username"} />
                <FormInput type={"text"} label={"username"} name={"username"} />
                <FormInput type={"text"} label={"username"} name={"username"} />
                <div className="mt-4">
                    <SubmitBtn text={"register"} />
                </div>
                <p className="text-center">
                    Already a member ?
                    <Link
                        to={"/login"}
                        className="ml-2 link link-hover link-primary capitalize"
                    >
                        Login
                    </Link>
                </p>
            </Form>
        </section>
    );
};

export default Register;
