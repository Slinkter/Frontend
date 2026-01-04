import React, { useState } from "react";
import { connect } from "react-redux";
import googleIcon from "../assets/static/google-icon.png";
import twitterIcon from "../assets/static/twitter-icon.png";
// import "../assets/styles/components/Login.scss"; // Migrado
import { Link, useNavigate } from "react-router-dom";
import { loginRequest } from "../tools/actions";
import Header from "../components/Header";

const Login = (props) => {
  const { loginRequest } = props;
  const navigate = useNavigate();
  const initUser = { email: "", password: "" };
  const [form, setValues] = useState(initUser);

  const handleInput = (e) => {
    setValues({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginRequest(form);
    navigate("/");
  };

  const inputClass = "bg-transparent border-b-2 border-white/40 text-white placeholder-white/70 focus:outline-none focus:border-white font-sans text-base mb-5 p-2 h-12 w-full transition-colors";
  const buttonClass = "bg-white/20 hover:bg-white/30 text-white font-bold py-3 rounded-full w-full mt-8 cursor-pointer shadow-md transition-all border border-white/10";

  return (
    <React.Fragment>
      <Header isLogin />
      <section className="flex items-center justify-center min-h-[calc(100vh-100px)] bg-brand-primary px-4">
        <section className="bg-black/30 backdrop-blur-sm p-12 rounded-[40px] w-full max-w-md border border-white/10 shadow-2xl flex flex-col text-white min-h-[600px] justify-between">
          <h2 className="text-3xl font-bold mb-8">Inicia sesión</h2>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <input name="email" className={inputClass} type="text" placeholder="Correo electronico" onChange={handleInput} />
            <input name="password" className={inputClass} type="password" placeholder="Contraseña" onChange={handleInput} />
            <button className={buttonClass}>Iniciar sesión</button>
            <div className="flex justify-between items-center mt-4 text-sm text-gray-200">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" id="cbox1" value="first_checkbox" className="accent-brand-primary" />
                Recuérdame
              </label>
              <a href="/" className="hover:underline">Olvidé mi contraseña</a>
            </div>
          </form>
          <section className="mt-12">
            <div className="flex items-center gap-4 mb-4 text-sm cursor-pointer hover:opacity-80">
              <img src={googleIcon} className="w-6" alt="Google" /> Inicia sesión con Google
            </div>
            <div className="flex items-center gap-4 text-sm cursor-pointer hover:opacity-80">
              <img src={twitterIcon} className="w-6" alt="Twitter" /> Inicia sesión con Twitter
            </div>
          </section>
          <div className="mt-8 text-center text-sm">
            No tienes ninguna cuenta? <Link to="/register" className="font-bold hover:underline">Regístrate</Link>
          </div>
        </section>
      </section>
    </React.Fragment>
  );
};

const mapDispatchToProps = { loginRequest };
export default connect(null, mapDispatchToProps)(Login);
