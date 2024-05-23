import React, { useState } from "react";
import { GoogleSignInAPI, LoginAPI, RegisterAPI } from "../api/AuthAPI";
import LinkedinLogo from "../assets/linkedinLogo.png";
import GoogleButton from "react-google-button";
import "../Sass/LoginComponent.scss";
import { toast } from "react-toastify";

// user:dasd@dasd.com
// pass : asdas123123123

const LoginComponent = () => {
  const [credentails, setCredentails] = useState({});

  const login = async () => {
    try {
      let res = await LoginAPI(credentails.email, credentails.password);
      toast.success("Signed in to to linkedin");
      console.log({ ...res?.user });
    } catch (error) {
      toast.error("please check  your credentials", error);
      console.log(error.errors.message);
    } finally {
      console.log("Login fin");
    }
  };
  /* render------------> */
  const googleSignIn = () => {
    let res = GoogleSignInAPI();
    console.log(res);
  };
  /* render------------> */
  return (
    <div className="login-wrapper">
      <img src={LinkedinLogo} alt="" className="linkedinLogo" />
      <div className="login-wrapper-inner">
        <h1 className="heading">Sign in </h1>
        <p className="sub-heading">stay updated on your profesional world</p>
        <div className="auth-inputs">
          <input
            onChange={(e) =>
              setCredentails({ ...credentails, email: e.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email or Phone"
          />
          <input
            onChange={(e) =>
              setCredentails({ ...credentails, password: e.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password"
          />
        </div>

        <button onClick={login} className="login-btn">
          Sign in
        </button>
      </div>
      <hr className="hr-text" data-content="AND" />
      <div className="google-btn-container">
        <GoogleButton className="button" onClick={googleSignIn} />
        <p className="go-to-signup">
          New to linkeding ? <span className="join-now">Join now</span>
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
