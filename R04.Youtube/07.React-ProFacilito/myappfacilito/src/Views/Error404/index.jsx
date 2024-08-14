import React from "react";
import style from "./Error404.module.css";
import { useRouteError } from "react-router-dom";

const Error404 = () => {
    const error = useRouteError();
    console.log(error);
    return (
        <div className={style.container}>
            <h3 className={style.title}> {error.status} Error </h3>
            <p className={style.description}>
                pagina no encontrada o no existe
                {error.data}
            </p>
        </div>
    );
};

export default Error404;
