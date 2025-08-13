import { useEffect, useRef, useState } from "react";

const UseRefBasics = () => {
    // Estado para demostrar re-render manual
    const [counter, setCounter] = useState(0);

    // Referencia al input de nombre
    const nameInputRef = useRef(null);

    // Referencia para saber si el componente ya se montó
    const hasMounted = useRef(false);

    // Manejador del submit del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        // Accede directamente al DOM del input
        console.log("Elemento input:", nameInputRef.current);

        // Obtiene el valor del input usando la referencia
        const name = nameInputRef.current.value;
        console.log("Nombre ingresado:", name);
    };

    // Enfoca el input al montar el componente
    useEffect(() => {
        nameInputRef.current.focus();
    }, []);

    // Detecta re-renders después del primer montaje
    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true; // Marca como montado
            return;
        }
        console.log("El componente se ha re-renderizado");
    }, [counter]);

    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <label htmlFor="name" className="form-label">
                        Nombre
                    </label>
                    <input
                        ref={nameInputRef}
                        id="name"
                        type="text"
                        className="form-input"
                        placeholder="Escribe tu nombre"
                    />
                </div>
                <button type="submit" className="btn btn-block">
                    Enviar
                </button>
            </form>

            {/* Muestra el valor actual del contador */}
            <h1>Contador: {counter}</h1>

            {/* Botón para incrementar el contador */}
            <button onClick={() => setCounter(counter + 1)} className="btn">
                Incrementar
            </button>
        </div>
    );
};

export default UseRefBasics;
