import React from "react";

const Footer = () => (
    <footer className="w-full bg-brand-primary flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 py-8 px-4 mt-auto text-white text-sm">
        <a href="/" className="hover:underline">Terminos de uso</a>
        <a href="/" className="hover:underline">Declaración de privacidad</a>
        <a href="/" className="hover:underline">Centro de ayuda</a>
    </footer>
);

export default Footer;
