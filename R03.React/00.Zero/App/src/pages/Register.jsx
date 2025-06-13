import React from "react";
import { Form } from "react-router-dom";
import FormInput from "../components/FormInput";
import SubmitBtn from "../components/SubmitBtn";
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <section className="h-screen grid  place-items-center">
            <Form
                method="POST"
                className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
            >
                <h4 className="text-center text-3xl font-bold">Register</h4>

                <FormInput type={"text"} label={"username"} name={"username"} />
                <FormInput type={"email"} label={"email"} name={"email"} />
                <FormInput
                    type={"password"}
                    label={"password"}
                    name={"password"}
                />
                <div>
                    <SubmitBtn />
                </div>
                <p className="text-center">
                    Already a member?
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
