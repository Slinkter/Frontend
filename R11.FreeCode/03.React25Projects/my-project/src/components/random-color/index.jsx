import React, { useEffect, useState } from "react";

const RandomColor = () => {
  const [typeOfColor, setTypeOfColor] = useState("hex");
  const [color, setColor] = useState("#000000");

  function randomColorUtility(length) {
    return Math.floor(Math.random() * length);
  }

  const handleCreateRandomHEXColor = () => {
    const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    console.log("hex :", hex);
    let hexColor = "#";

    for (let i = 0; i < 6; i++) {
      let hexaccc = hex[randomColorUtility(hex.length)];
      hexColor += hexaccc;
      console.log("hexaccc ", hexaccc);
    }

    setColor(hexColor);
  };
  const handleCreateRandomRGBColor = () => {
    const r = randomColorUtility(256);
    const g = randomColorUtility(256);
    const b = randomColorUtility(256);
    setColor(`rgb(${r},${g},${b})`);
  };

  useEffect(() => {
    if (typeOfColor === "rgb") {
      handleCreateRandomRGBColor();
    } else {
      handleCreateRandomHEXColor();
    }
  }, [typeOfColor]);

  return (
    <div
      style={{
        padding: "0",
        backgroundColor: color,
        height: "100vh",
        width: "100vw",
      }}
    >
      <button onClick={() => setTypeOfColor("hex")}>Create HEX color</button>

      <button onClick={() => setTypeOfColor("rgb")}>Create RGB color</button>

      <button
        onClick={
          typeOfColor === "hex"
            ? handleCreateRandomHEXColor
            : handleCreateRandomRGBColor
        }
      >
        Generate Random color
      </button>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontSize: "60px",
          marginTop: "50px",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h3>{typeOfColor === "rgb" ? "RBG COLOR" : "HEX color"}</h3>
        <h1>{color}</h1>
      </div>
    </div>
  );
};

export default RandomColor;
