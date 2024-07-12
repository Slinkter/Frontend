import React, { useState } from "react";
import QRCode from "react-qr-code";

const QrGenerator = () => {
  // hooks

  const [input, setInput] = useState("");
  const [qrCode, setQrCode] = useState("");

  function handleGenerateQRCode() {
    setQrCode(input);
    setInput("");
  }

  /* render */

  console.log(" --> ", !!input, "--> ", input.trim() !== "");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "98vh",
        border: "1px solid red",
      }}
    >
      <h1> QR code Generator </h1>
      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="enter your value here"
          name="qr-code"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {/* false : se deactiva */}
        <button
          disabled={input && input.trim() !== "" ? false : true}
          onClick={handleGenerateQRCode}
        >
          Generate
        </button>
      </div>
      <div>
        <QRCode
          id="qr-code-value"
          value={qrCode}
          size={400}
          bgColor="#fff"
          style={{
            border: "1px solid red",
          }}
        />
      </div>
    </div>
  );
};

export default QrGenerator;
