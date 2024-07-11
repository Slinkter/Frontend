import React, { useMemo } from "react";
import useMousePosition from "./useMousePosition";

export const useBackground = () => {
    const position = useMousePosition();

    const bgchange = position?.x < window.innerWidth / 2 ? "orange" : "pink";

    const background = useMemo(() => bgchange, [bgchange]);

    return { position, background };
};
