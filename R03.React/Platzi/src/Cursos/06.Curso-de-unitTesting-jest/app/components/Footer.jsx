import React from "react";
import "../styles/Footer.css";

const Footer = () => {
    const style = {
        f: "Footer",
        fTitle: "Footer-title",
        fCopy: "Footer-copy",
    };

    return (
        <div className={style.f}>
            <p className={style.fTitle}>Platzi Store</p>
            <p className={style.fCopy}>Todos los Izquierdos Reservados</p>
        </div>
    );
};

export default Footer;
