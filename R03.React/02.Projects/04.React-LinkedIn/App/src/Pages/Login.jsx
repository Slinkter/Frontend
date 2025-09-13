import React, { useEffect, useState } from "react";
import LoginComponent from "../components/LoginComponent";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import Loader from "../components/common/Loader";

export default function Login() {
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();
    useEffect(() => {
        onAuthStateChanged(auth, (res) => {
            if (res?.accessToken) {
                navigate("/home");
            } else {
                setLoading(false);
            }
        });
    }, []);
    return loading ? <Loader /> : <LoginComponent />;
}

/* 
 onAuthStateChanged: Una función de Firebase que monitorea los cambios en el estado de autenticación del usuario.
onAuthStateChanged: Monitorea el estado de autenticación. 
Si el usuario está autenticado (res?.accessToken), redirige a la ruta /home  
No esta autentica , renderiza LoginComponent



*/
