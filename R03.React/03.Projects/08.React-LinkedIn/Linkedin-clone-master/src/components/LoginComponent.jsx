import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Hook para la navegación
import { toast } from "react-toastify"; // Librería para mostrar notificaciones
//
import { LoginAPI } from "../api/AuthAPI"; // Importa la función de API para iniciar sesión
import LinkedinLogo from "../assets/linkedinLogo.png"; // Importa el logotipo de LinkedIn
import "../Sass/LoginComponent.scss"; // Estilos SCSS para el componente

export default function LoginComponent() {
    // Estado local para almacenar las credenciales de inicio de sesión (email y contraseña)
    const [credentials, setCredentials] = useState({});
    let navigate = useNavigate(); // Hook para la navegación
    // Función asincrónica
    const login = async () => {
        try {
            let res = await LoginAPI(credentials.email, credentials.password); // Llama a la función LoginAPI para autenticar con las credenciales proporcionadas
            toast.success("Signed In to Linkedin!"); // Muestra una notificación de éxito si el inicio de sesión es exitoso
            localStorage.setItem("userEmail", res.user.email); // Almacena el correo electrónico del usuario en el almacenamiento local
            navigate("/home");
        } catch (err) {
            console.log(err);
            toast.error("Please Check your Credentials");
        }
    };

    // Renderiza el componente
    return (
        <div className="login-wrapper">
            <img src={LinkedinLogo} className="linkedinLogo" />
            <div className="login-wrapper-inner">
                <h1 className="heading">Sign in</h1>
                <p className="sub-heading">
                    Stay updated on your professional world
                </p>

                {/* Inputs para el correo electrónico y contraseña */}
                <div className="auth-inputs">
                    <input
                        onChange={(event) =>
                            setCredentials({
                                ...credentials,
                                email: event.target.value,
                            })
                        }
                        type="email"
                        className="common-input"
                        placeholder="Email or Phone"
                    />
                    <input
                        onChange={(event) =>
                            setCredentials({
                                ...credentials,
                                password: event.target.value,
                            })
                        }
                        type="password"
                        className="common-input"
                        placeholder="Password"
                    />
                </div>

                {/* Botón para iniciar sesión */}
                <button onClick={login} className="login-btn">
                    Sign in
                </button>
            </div>

            {/* Separador "or" */}
            <hr className="hr-text" data-content="or" />

            {/* Contenedor para el botón de Google y enlace de registro */}
            <div className="google-btn-container">
                <p className="go-to-signup">
                    New to LinkedIn?{" "}
                    <span
                        className="join-now"
                        onClick={() => navigate("/register")}
                    >
                        Join now
                    </span>
                </p>
            </div>
        </div>
    );
}
