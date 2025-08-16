import { useState, useTransition, lazy, Suspense } from "react";

// Lazy load para mejorar rendimiento al cargar componentes pesados
const SlowComponent = lazy(() => import("./SlowComponent"));

const LatestReact = () => {
    const [text, setText] = useState("");
    const [items, setItems] = useState([]);
    const [isPending, startTransition] = useTransition(); // transición para evitar bloqueo de render
    const [show, setShow] = useState(false);

    const divStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        marginTop: "2rem",
    };

    // Maneja el cambio en el input y genera 10,000 elementos de forma no bloqueante
    const handleChange = (e) => {
        const value = e.target.value;
        setText(value);

        if (value.length === 0) {
            setItems([]);
            return;
        }

        startTransition(() => {
            const newItems = Array.from({ length: 10000 }, (_, index) => (
                <div key={index}>
                    <img src="/vite.svg" alt={`item-${index}`} />
                </div>
            ));
            setItems(newItems);
        });
    };

    return (
        <Suspense fallback={<h4>Loading...suspense activado</h4>}>
            <section>
                {/* Input controlado */}
                <form className="form">
                    <input
                        type="text"
                        className="form-input"
                        value={text}
                        onChange={handleChange}
                        placeholder="Escribe para generar elementos"
                    />
                </form>

                {/* Render condicional con transición */}
                {isPending ? (
                    "Loading 123..."
                ) : (
                    <div style={divStyle}>{items}</div>
                )}

                <hr />
                <h4>Items Below</h4>

                {/* Toggle para mostrar componente pesado */}
                <button onClick={() => setShow(!show)} className="btn">
                    Toggle SlowComponent
                </button>
                {show && <SlowComponent />}
            </section>
        </Suspense>
    );
};

export default LatestReact;
