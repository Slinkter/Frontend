import { useState } from "react";
import { LoginAPI } from "../api/AuthAPI"; // Importa la función de API para iniciar sesión
import { useNavigate } from "react-router-dom"; // Hook para la navegación
import LinkedinLogo from "../assets/linkedinLogo.png"; // Importa el logotipo de LinkedIn
import "../Sass/LoginComponent.scss"; // Estilos SCSS para el componente
import { toast } from "react-toastify"; // Librería para mostrar notificaciones

export default function LoginComponent() {
    let navigate = useNavigate(); // Hook para la navegación
    // Estado local para almacenar las credenciales de inicio de sesión (email y contraseña)
    const [credentials, setCredentials] = useState({});
    // Función asincrónica para manejar el inicio de sesión
    const login = async () => {
        try {
            // Llama a la función LoginAPI para autenticar con las credenciales proporcionadas
            let res = await LoginAPI(credentials.email, credentials.password);

            // Muestra una notificación de éxito si el inicio de sesión es exitoso
            toast.success("Signed In to Linkedin!");

            // Almacena el correo electrónico del usuario en el almacenamiento local
            localStorage.setItem("userEmail", res.user.email);

            // Navega hacia la página de inicio después de iniciar sesión correctamente
            navigate("/home");
        } catch (err) {
            // Captura cualquier error y muestra una notificación de error
            console.log(err);
            toast.error("Please Check your Credentials");
        }
    };

    // Renderiza el componente de inicio de sesión
    return (
        <div className="login-wrapper">
            {/* Logo de LinkedIn */}
            <img src={LinkedinLogo} className="linkedinLogo" />
            <div className="login-wrapper-inner">
                {/* Encabezado y subtítulo */}
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
