import React, { useEffect, useState } from "react";

const RandomColor = () => {
  const [typeOfColor, setTypeOfColor] = useState("hex");
  const [color, setColor] = useState("#000000");

  function randomColorUtility(length) {
    return Math.floor(Math.random() * length);
  }
  function handleCreateRandomHEXColor() {
    const hexArray = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
    ];

    let hexColor = "#";
    let longHex = 6;
    let longHexArray = hexArray.length;

    for (let i = 0; i < longHex; i++) {
      let stringHex = hexArray[randomColorUtility(longHexArray)];
      hexColor += stringHex;
      console.log("stringHex ", stringHex);
    }
    console.log("hexColor ", hexColor);
    setColor(hexColor);
  }
  function handleCreateRandomRGBColor() {
    const r = randomColorUtility(256);
    const g = randomColorUtility(256);
    const b = randomColorUtility(256);
    const rgb = `rgb(${r},${g},${b})`;
    setColor(rgb);
  }

  useEffect(() => {
    if (typeOfColor === "rgb") {
      handleCreateRandomRGBColor();
    } else {
      handleCreateRandomHEXColor();
    }
  }, [typeOfColor]);

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
  const styleDivButton = { textAlign: "center" };

  return (
    <div style={styleDivContainer}>
      <div style={styleDivTextColor}>
        <h2>{typeOfColor === "rgb" ? "RGB COLOR" : "HEX COLOR"}</h2>
        <h3>{color}</h3>
      </div>
      <div style={styleDivButton}>
        <button onClick={() => setTypeOfColor("hex")}>Create HEX color</button>
        <button onClick={() => setTypeOfColor("rgb")}>Create RGB color</button>
        <button
          onClick={
            typeOfColor === "hex"
              ? handleCreateRandomHEXColor
              : handleCreateRandomRGBColor
          }
        >
          Generate Random Color
        </button>
      </div>
    </div>
  );
};

export default RandomColor;
