import { auth } from "../firebase/credenciales";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default async function loginWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        console.log("Inicio de sesión con Google exitoso");
    } catch (error) {
        console.error("Error al iniciar sesión con Google:", error);
    }
}
