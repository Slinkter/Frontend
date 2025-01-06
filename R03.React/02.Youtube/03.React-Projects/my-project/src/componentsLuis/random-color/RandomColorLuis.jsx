import "./index.css";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
const RandomColorLuis = () => {
    const [type, setType] = useState("hex");
    const [color, setColor] = useState("#fff");

    const randomColor = useCallback(() => {
        if ("hex" === type) {
            handleChangeToHEX();
        } else {
            handleChangeToRGB();
        }
    }, [type]);

    useEffect(() => {
        randomColor();
    }, [type, randomColor]);

    function handleChangeToHEX() {
        const hexArray = "0123456789ABCDEF".split("");
        let color = "#";
        for (let i = 1; i <= 6; i++) {
            color += hexArray[Math.floor(Math.random() * 16)];
        }
        setColor(color);
        console.log(color);
    }

    function handleChangeToRGB() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        setColor(`rgb(${r},${g},${b})`);
        console.log(color);
    }

    function toogleType(param) {
        if ("hex" === param) {
            setType("hex");
        } else {
            setType("rgb");
        }
    }

    return (
        <div className="container-bg " style={{ backgroundColor: color }}>
            <div>
                <p>{type}</p>
                <p>{color}</p>
            </div>
            <div>
                <button
                    className="container-btn btn-hex"
                    onClick={() => toogleType("hex")}
                >
                    HEX
                </button>
                <button
                    className="container-btn btn-rgb"
                    onClick={() => toogleType("rgb")}
                >
                    RGB
                </button>
            </div>
            <div>
                <button
                    className="container-btn btn-random"
                    onClick={() => randomColor()}
                >
                    Generar Color
                </button>
            </div>
        </div>
    );
};

export default RandomColorLuis;
