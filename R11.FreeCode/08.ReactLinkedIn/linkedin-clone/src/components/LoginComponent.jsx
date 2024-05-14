import React, { useState } from "react";
import { LoginAPI, RegisterAPI } from "../api/AuthAPI";
import "../Sass/LoginComponent.scss";

// user:dasd@dasd.com
// pass : asdas123123123

const LoginComponent = () => {
  const [credentails, setCredentails] = useState({});

  const login = async () => {
    try {
      let res = await LoginAPI(credentails.email, credentails.password);
      console.log(res);
    } catch (error) {
      console.log(error.errors.message);
    }
  };
  return (
    <div className="login-wrapper">
      <h1>LoginComponent</h1>

      <div className="auth-inputss">
        <input
          onChange={(e) =>
            setCredentails({ ...credentails, email: e.target.value })
          }
          type="text"
          className="common-input"
          placeholder="enter your emial"
        />
        <input
          onChange={(e) =>
            setCredentails({ ...credentails, password: e.target.value })
          }
          type="text"
          className="common-input"
          placeholder="enter your password"
        />
      </div>

      <button onClick={login} className="login-btn">
        Log In to Linkedin
      </button>
    </div>
  );
};

export default LoginComponent;
