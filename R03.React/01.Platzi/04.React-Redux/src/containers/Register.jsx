import React, { useState } from "react";
// import "../assets/styles/components/Register.scss"; // Migrado
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { registerRequest } from "../tools/actions";
import Header from "../components/Header";

function Register(props) {
    const navigate = useNavigate();
    const [form, setValues] = useState({ email: "", name: "", password: "" });

    const handleInput = (event) => {
        setValues({ ...form, [event.target.name]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.registerRequest(form);
        navigate("/");
    };

    const inputClass = "bg-transparent border-b-2 border-white/40 text-white placeholder-white/70 focus:outline-none focus:border-white font-sans text-base mb-5 p-2 h-12 w-full transition-colors";
    const buttonClass = "bg-white/20 hover:bg-white/30 text-white font-bold py-3 rounded-full w-full mt-8 cursor-pointer shadow-md transition-all border border-white/10";

    return (
        <React.Fragment>
            <Header isRegister />
            <section className="flex items-center justify-center min-h-[calc(100vh-100px)] bg-brand-primary px-4">
                <section className="bg-black/30 backdrop-blur-sm p-12 rounded-[40px] w-full max-w-md border border-white/10 shadow-2xl flex flex-col text-white min-h-[500px] justify-center">
                    <h2 className="text-3xl font-bold mb-8">Regístrate</h2>
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <input name="name" onChange={handleInput} className={inputClass} type="text" placeholder="Nombre" />
                        <input name="email" onChange={handleInput} className={inputClass} type="text" placeholder="Correo" />
                        <input name="password" onChange={handleInput} className={inputClass} type="password" placeholder="Contraseña" />
                        <button className={buttonClass}>Registrarme</button>
                    </form>
                    <div className="mt-8 text-center text-sm">
                        <Link to="/login" className="font-bold hover:underline">Iniciar sesión</Link>
                    </div>
                </section>
            </section>
        </React.Fragment>
    );
}

const mapDispatchToProps = { registerRequest };
export default connect(null, mapDispatchToProps)(Register);
