import React, { useState } from "react";
import { RegisterAPI } from "../api/AuthAPI";
import { postUserData } from "../api/FirestoreAPI";

import { useNavigate } from "react-router-dom";
import { getUniqueID } from "../helpers/getUniqueId";
import { toast } from "react-toastify";
import LinkedinLogo from "../assets/linkedinLogo.png";
import "../Sass/LoginComponent.scss";
const img_default =
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80";

export default function RegisterComponent() {
    const [credentails, setCredentials] = useState({});
    let navigate = useNavigate();
    // funcion asicrona
    const register = async () => {
        try {
            let email = credentails.email;
            let password = credentails.password;
            let res = await RegisterAPI(email, password);
            /* todo: validar si ya existe el correo del usuario  */
            const newUser = {
                userID: getUniqueID(),
                name: credentails.name,
                email: credentails.email,
                imageLink: img_default,
            };

            postUserData(newUser);
            toast.success("Account Created!");
            localStorage.setItem("userEmail", res.user.email);
            navigate("/home");
        } catch (err) {
            console.log(err);
            toast.error("Cannot Create your Account");
        }
    };

    return (
        <div className="login-wrapper">
            <img className="linkedinLogo" src={LinkedinLogo} />
            <div className="login-wrapper-inner">
                {/*  */}
                <h1 className="heading">
                    Make the most of your professional life
                </h1>
                {/*  */}
                <div className="auth-inputs">
                    <input
                        type="text"
                        className="common-input"
                        placeholder="Your Name"
                        onChange={(event) =>
                            setCredentials({
                                ...credentails,
                                name: event.target.value,
                            })
                        }
                    />
                    <input
                        type="email"
                        className="common-input"
                        placeholder="Email or phone number"
                        onChange={(event) =>
                            setCredentials({
                                ...credentails,
                                email: event.target.value,
                            })
                        }
                    />
                    <input
                        type="password"
                        className="common-input"
                        placeholder="Password (6 or more characters)"
                        onChange={(event) =>
                            setCredentials({
                                ...credentails,
                                password: event.target.value,
                            })
                        }
                    />
                </div>
                <button onClick={register} className="login-btn">
                    Agree & Join
                </button>
            </div>
            <hr class="hr-text" data-content="or" />
            <div className="google-btn-container">
                <p className="go-to-signup">
                    Already on LinkedIn?
                    <span className="join-now" onClick={() => navigate("/")}>
                        Sign in
                    </span>
                </p>
            </div>
        </div>
    );
}
