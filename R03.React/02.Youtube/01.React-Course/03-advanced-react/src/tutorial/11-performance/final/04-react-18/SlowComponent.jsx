import { useState } from "react";

// Genera 500 elementos iniciales
const initialItems = Array.from({ length: 500 }, (_, index) => (
    <div key={index}>
        <img src="/vite.svg" alt={`slow-item-${index}`} />
    </div>
));

const SlowComponent = () => {
    const [items] = useState(initialItems);

    const divStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        marginTop: "2rem",
    };

    return <div style={divStyle}>{items}</div>;
};

export default SlowComponent;
