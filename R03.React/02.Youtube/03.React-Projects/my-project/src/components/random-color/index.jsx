import { useEffect, useState } from "react";

const RandomColor = () => {
    // hex or rgb
    const [typeOfColor, setTypeOfColor] = useState("hex");
    // #000000 or rgb(0,0,0)
    const [color, setColor] = useState("#000");

    const styleDivContainer = {
        height: "100vh",
        width: "100vw",
        padding: "0",
        margin: "0",
        backgroundColor: color,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "50px solid black",
    };
    const styleDivTextColor = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontSize: "30px",
        gap: "10px",
    };

    const styleDivButton = {
        textAlign: "center",
        marginTop: "20px",
    };

    const buttonStyle = {
        padding: "10px 20px",
        margin: "5px",
        fontSize: "16px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "all 0.3s ease",
    };

    const buttonRGBStyle = {
        ...buttonStyle,
        backgroundColor: "#f39c12",
        color: "#fff",
        width: "200px",
    };

    const buttonHEXStyle = {
        ...buttonStyle,
        backgroundColor: "#3498db",
        color: "#fff",
        width: "200px",
    };

    const buttonGenerateStyle = {
        ...buttonStyle,
        backgroundColor: "#2ecc71",
        color: "#fff",
        width: "400px",
    };

    // if (hex) -->  1-6  if else (rgb) -->  1-255
    function randomNum(length) {
        return Math.floor(Math.random() * length);
    }
    // button RGB
    function handleRGBColor() {
        const len = 256;
        const r = randomNum(len);
        const g = randomNum(len);
        const b = randomNum(len);
        const rgb = `rgb(${r},${g},${b})`;
        setColor(rgb);
    }
    //
    function handleHEXColor() {
        const hexNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const hexStri = ["A", "B", "C", "D", "E", "F"];
        const hexArray = [...hexNum, ...hexStri];
        //
        let stringHex = null;
        let hexColor = "#";
        //
        for (let i = 0; i < 6; i++) {
            const position = randomNum(hexArray.length); //16
            stringHex = hexArray[position];
            hexColor += stringHex;
        }
        //
        setColor(hexColor);
    }

    useEffect(() => {
        typeOfColor === "RGB" ? handleRGBColor() : handleHEXColor();
    }, [typeOfColor]);

    return (
        <div style={styleDivContainer}>
            <div style={styleDivTextColor}>
                <h1> Color </h1>
                <h2>{typeOfColor === "RGB" ? "RGB" : "HEX"}</h2>
                <h3>{color}</h3>
            </div>
            <br />
            <div style={styleDivButton}>
                <button
                    style={buttonRGBStyle}
                    onClick={() => setTypeOfColor("RGB")}
                >
                    RGB color
                </button>
                <button
                    style={buttonHEXStyle}
                    onClick={() => setTypeOfColor("HEX")}
                >
                    HEX color
                </button>
                <br />
                <button
                    style={buttonGenerateStyle}
                    onClick={
                        typeOfColor === "HEX" ? handleHEXColor : handleRGBColor
                    }
                >
                    Generate Random Color
                </button>
            </div>
        </div>
    );
};

export default RandomColor;
