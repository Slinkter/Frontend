import React, { useState } from "react";
import { GoogleSignInAPI, LoginAPI, RegisterAPI } from "../api/AuthAPI";
import LinkedinLogo from "../assets/linkedinLogo.png";
import GoogleButton from "react-google-button";
import "../Sass/LoginComponent.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { postUserData } from "../api/FirestoreAPI";

const RegisterComponent = () => {
  const [credentails, setCredentails] = useState({});
  let navigate = useNavigate();
  //
  const register = async () => {
    try {
      let res = await RegisterAPI(credentails.email, credentails.password);
      toast.success("Account Created");
      localStorage.setItem("userEmail", res.user.email);
      postUserData({ name: credentails.name, email: credentails.email });
      navigate("/home");
    } catch (error) {
      toast.error("Cannot Create your Account", error);
      console.log(error.errors.message);
    } finally {
      console.log("Login fin");
    }
  };
  /* render------------> */
  const googleSignIn = () => {
    let res = GoogleSignInAPI();
    console.log(res);
    navigate("/home");
  };
  /* render------------> */
  return (
    <div className="login-wrapper">
      <img src={LinkedinLogo} alt="" className="linkedinLogo" />
      <div className="login-wrapper-inner">
        <h1 className="heading">Make the most of your professiona lifee </h1>

        <div className="auth-inputs">
          <input
            onChange={(e) =>
              setCredentails({ ...credentails, name: e.target.value })
            }
            type="text"
            className="common-input"
            placeholder="Your Name"
          />
          <input
            onChange={(e) =>
              setCredentails({ ...credentails, email: e.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email or Phone  number"
          />
          <input
            onChange={(e) =>
              setCredentails({ ...credentails, password: e.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password (6 or more characters)"
          />
        </div>

        <button onClick={register} className="login-btn">
          Agree & Join
        </button>
      </div>
      <hr className="hr-text" data-content="AND" />
      <div className="google-btn-container">
        <GoogleButton className="button" onClick={googleSignIn} />
        <p className="go-to-signup">
          Already on LinkedIn?
          <span className="join-now" onClick={() => navigate("/register")}>
            Join now
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterComponent;
