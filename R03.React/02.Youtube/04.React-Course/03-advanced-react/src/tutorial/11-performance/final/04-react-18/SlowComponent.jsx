import { useState } from "react";

const SlowComponent = () => {
    const [items, setItems] = useState(defaultItems);
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                marginTop: "2rem",
            }}
        >
            {items}
        </div>
    );
};
export default SlowComponent;

const defaultItems = Array.from({ length: 5 }, (_, index) => {
    return (
        <div key={index}>
            <img src="/vite.svg" alt="" />
        </div>
    );
});
