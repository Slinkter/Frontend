import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen text-white bg-brand-primary p-4 text-center">
            <h1 className="text-9xl font-bold mb-4 animate-pulse">404</h1>
            <h2 className="text-3xl font-semibold mb-8">Página No Encontrada</h2>
            <p className="text-lg mb-8 max-w-md opacity-80">Lo sentimos, la página que buscas no existe o ha sido movida.</p>
            <Link to="/" className="bg-white text-brand-primary font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all shadow-lg">
                Volver al Inicio
            </Link>
        </section>
    );
}

export default NotFound;
