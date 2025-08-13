import { useState } from "react";

const UncontrolledInputs = () => {
    // Estado para forzar re-render y demostrar que los inputs no se limpian automáticamente
    const [submitCount, setSubmitCount] = useState(0);

    // Manejador del evento submit del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto (recargar la página)

        const formData = new FormData(e.currentTarget); // Extrae los datos del formulario

        const name = formData.get("name"); // Obtiene el valor del campo "name"
        const newUser = Object.fromEntries(formData); // Convierte todos los campos en un objeto

        // Simula una acción (como enviar datos al servidor)
        console.log("Nombre:", name);
        console.log("Datos del usuario:", newUser);

        // Actualiza el estado para forzar un re-render
        setSubmitCount((prev) => prev + 1);

        // Limpia los campos del formulario manualmente
        e.currentTarget.reset();
    };

    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <h4>Formulario con FormData API</h4>

                {/* Campo: Nombre */}
                <div className="form-row">
                    <label htmlFor="name" className="form-label">
                        Nombre
                    </label>
                    <input
                        type="text"
                        className="form-input"
                        id="name"
                        name="name"
                        placeholder="Ingresa tu nombre"
                    />
                </div>

                {/* Campo: Email */}
                <div className="form-row">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-input"
                        id="email"
                        name="email"
                        placeholder="ejemplo@correo.com"
                    />
                </div>

                {/* Campo: Contraseña */}
                <div className="form-row">
                    <label htmlFor="password" className="form-label">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        className="form-input"
                        id="password"
                        name="password"
                        placeholder="••••••••"
                    />
                </div>

                {/* Botón de envío */}
                <button type="submit" className="btn btn-block">
                    Enviar
                </button>
            </form>

            {/* Mostrar cuántas veces se ha enviado el formulario */}
            <p>Formulario enviado {submitCount} veces</p>
        </div>
    );
};

export default UncontrolledInputs;
