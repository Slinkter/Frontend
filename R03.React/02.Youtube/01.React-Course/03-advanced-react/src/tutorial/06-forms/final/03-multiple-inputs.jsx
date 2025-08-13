import { useState } from "react";

const initialState = {
    name: "",
    email: "",
    password: "",
};
const MultipleInputs = () => {
    const [user, setUser] = useState(initialState);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const msj = `Datos enviados!\nName: ${user.name}, Email: ${user.email}, Password: ${user.password}`;
        alert(msj); // Muestra una alerta con los datos
        setUser(initialState); // Limpia el formulario después de enviar
    };
    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <h4>Multiple Inputs</h4>
                {/* name */}
                <div className="form-row">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-input"
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                    />
                </div>
                {/* email */}
                <div className="form-row">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-input"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                </div>
                {/* password */}
                <div className="form-row">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-input"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn btn-block">
                    Submit
                </button>
            </form>
            {/* Muestra los datos del usuario debajo del formulario */}
            <div
                style={{
                    marginTop: "20px",
                    border: "1px solid #ccc",
                    padding: "10px",
                    borderRadius: "5px",
                }}
            >
                <p>
                    <strong>Datos Ingresados:</strong>
                </p>
                <pre>{JSON.stringify(user, null, 2)}</pre>
            </div>
        </div>
    );
};
export default MultipleInputs;
