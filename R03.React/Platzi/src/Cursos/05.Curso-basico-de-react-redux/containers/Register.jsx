import React, { useState } from "react";

import "../assets/styles/components/Register.scss";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { registerRequest } from "../tools/actions";
import Header from "../components/Header";

function Register(props) {
  const navigate = useNavigate();
  const [form, setValues] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form", form);
    props.registerRequest(form);
    navigate("/");
  };

  return (
    <React.Fragment>
      <Header isRegister />

      <section className="register">
        <section className="register__container">
          <h2>Regístrate</h2>
          <form className="register__container--form" onSubmit={handleSubmit}>
            <input
              name="name"
              onChange={handleInput}
              className="input"
              type="text"
              placeholder="Nombre"
            />
            <input
              name="email"
              onChange={handleInput}
              className="input"
              type="text"
              placeholder="Correo"
            />
            <input
              name="password"
              onChange={handleInput}
              className="input"
              type="password"
              placeholder="Contraseña"
            />
            <button className="button">Registrarme</button>
          </form>
          <Link to="/login">Iniciar sesión</Link>
        </section>
      </section>
    </React.Fragment>
  );
}

const mapDispatchToProps = {
  registerRequest,
};

/* export default Register; */
export default connect(null, mapDispatchToProps)(Register);
