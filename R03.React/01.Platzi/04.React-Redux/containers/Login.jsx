import React, { useState } from "react";
import { connect } from "react-redux";
import googleIcon from "../assets/static/google-icon.png";
import twitterIcon from "../assets/static/twitter-icon.png";
import "../assets/styles/components/Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { loginRequest } from "../tools/actions";
import Header from "../components/Header";

const Login = (props) => {
  const { loginRequest, setFavorite, deleteFavorite } = props;
  const navigate = useNavigate();
  const initUser = {
    email: "",
    password: "",
  };
  const [form, setValues] = useState(initUser);

  const handleInput = (e) => {
    const newForm = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setValues(newForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //
    loginRequest(form);
    navigate("/home");
  };

  return (
    <React.Fragment>
      <Header isLogin />
      <section className="login">
        <section className="login__container">
          <h2>Inicia sesión</h2>
          <form className="login__container--form" onSubmit={handleSubmit}>
            <input
              name="email"
              className="input"
              type="text"
              placeholder="Correo electronico"
              onChange={handleInput}
            />
            <input
              name="password"
              className="input"
              type="password"
              placeholder="Contraseña"
              onChange={handleInput}
            />
            <button className="button">Iniciar sesión</button>
            <div className="login__container--remember-me">
              <label>
                <input type="checkbox" id="cbox1" value="first_checkbox" />
                Recuérdame
              </label>
              <a href="/">Olvidé mi contraseña</a>
            </div>
          </form>
          <section className="login__container--social-media">
            <div>
              <img src={googleIcon} /> Inicia sesión con Google
            </div>
            <div>
              <img src={twitterIcon} /> Inicia sesión con Twitter
            </div>
          </section>

          <Link to="/register" rel="canonical">
            <p className=""> Regístrate</p>
          </Link>
        </section>
      </section>
    </React.Fragment>
  );
};

/* export default Login; */
const mapDispatchToProps = {
  loginRequest,
};
export default connect(null, mapDispatchToProps)(Login);
