import { useEffect, useState } from "react";

const RandomColor = () => {
  const [typeOfColor, setTypeOfColor] = useState("hex"); // hex o rbg
  const [color, setColor] = useState("#000"); // #000000 or rbg(0,0,0)

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

  function randomColorUtility(length) {
    // hex : 6
    // rgb : 255
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
    let stringHex = null;
    //
    for (let i = 0; i < longHex; i++) {
      const position = randomColorUtility(longHexArray);
      stringHex = hexArray[position];
      hexColor += stringHex;
      console.log(position);
    }
    //
    setColor(hexColor);
  }
  function handleCreateRandomRGBColor() {
    const r = randomColorUtility(256);
    const g = randomColorUtility(256);
    const b = randomColorUtility(256);
    const rgb = `rgb(${r},${g},${b})`;
    console.log(r, g, b);
    setColor(rgb);
  }

  useEffect(() => {
    typeOfColor === "rgb"
      ? handleCreateRandomRGBColor()
      : handleCreateRandomHEXColor();
  }, [typeOfColor]);

  return (
    <div style={styleDivContainer}>
      <div style={styleDivTextColor}>
        <h2>{typeOfColor === "rgb" ? "RGB COLOR" : "HEX COLOR"}</h2>
        <h3>{color}</h3>
      </div>
      <div style={styleDivButton}>
        <div>
          <button onClick={() => setTypeOfColor("hex")}>HEX color</button>
          <button onClick={() => setTypeOfColor("rgb")}>RGB color</button>
        </div>

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
