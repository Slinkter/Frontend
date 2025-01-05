import { useCallback, useEffect, useMemo, useState } from "react";

const initialStatus = {
    type: "hex",
    color: "#000",
};

const RandomColor = () => {
    // hex or rgb
    const [typeOfColor, setTypeOfColor] = useState(initialStatus.type);
    const [color, setColor] = useState(initialStatus.color);

    /* useEffect */
    useEffect(() => {
        typeOfColor === "RGB" ? handleRGBColor() : handleHEXColor();
    }, [typeOfColor]);

    const AuxRandomNum = useCallback((length) => {
        return Math.floor(Math.random() * length); // Math.floor(3.9999999) = 3
    }, []);

    // Only-HEX
    const handleHEXColor = useCallback(() => {
        const hexArray = "0123456789ABCDEF".split(""); //['0', '1', '2', '3', '2', '4', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
        let hexColor = "#";
        for (let i = 0; i < 6; i++) {
            const position = AuxRandomNum(hexArray.length); //16
            hexColor += hexArray[position];
        }
        setColor(hexColor);
    }, [AuxRandomNum]);

    const handleRGBColor = useCallback(() => {
        setColor(generateRGBColor());
    }, []);

    const generateRGBColor = useCallback(() => {
        const len = 256;
        const r = AuxRandomNum(len);
        const g = AuxRandomNum(len);
        const b = AuxRandomNum(len);
        return `rgb(${r},${g},${b})`;
    }, [AuxRandomNum]);

    /* Style */
    const styleDivContainer = useMemo(
        () => ({
            backgroundColor: color,
            height: "100vh",
            width: "100vw",
            padding: "0",
            margin: "0",
            border: "5px solid gray",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }),
        [color]
    );

    const styleDivTextColor = useMemo(
        () => ({
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontSize: "30px",
            gap: "10px",
        }),
        []
    );

    const styleDivButton = useMemo(
        () => ({
            textAlign: "center",
            marginTop: "20px",
        }),
        []
    );

    const buttonStyle = useMemo(
        () => ({
            padding: "10px 20px",
            margin: "5px",
            fontSize: "16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.3s ease",
        }),
        []
    );

    const buttonRGBStyle = useMemo(
        () => ({
            ...buttonStyle,
            backgroundColor: "#f39c12",
            color: "#fff",
            width: "200px",
        }),
        [buttonStyle]
    );

    const buttonHEXStyle = useMemo(
        () => ({
            ...buttonStyle,
            backgroundColor: "#3498db",
            color: "#fff",
            width: "200px",
        }),
        [buttonStyle]
    );

    const buttonGenerateStyle = useMemo(
        () => ({
            ...buttonStyle,
            backgroundColor: "#2ecc71",
            color: "#fff",
            width: "400px",
        }),
        [buttonStyle]
    );

    return (
        <div style={styleDivContainer}>
            <div style={styleDivTextColor}>
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
