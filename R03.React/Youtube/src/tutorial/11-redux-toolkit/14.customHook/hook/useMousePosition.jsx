import React, { useEffect, useState } from "react";

const initPosition = { x: null, y: null };
const useMousePosition = (initPosition) => {
    const [position, setPosition] = useState(initPosition);

    useEffect(() => {
        const hanleMouseMove = (e) => {
            const { clientX, clientY } = e;
            setPosition({ x: clientX, y: clientY });
        };

        window.addEventListener("mousemove", hanleMouseMove);

        return () => {};
    }, []);

    return position;
};

export default useMousePosition;
