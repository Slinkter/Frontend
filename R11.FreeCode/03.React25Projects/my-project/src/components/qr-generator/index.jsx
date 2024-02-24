import React, { useState } from "react";
import QRCode from "react-qr-code";

const QrGenerator = () => {
  // hooks
  const [qrCode, setQrCode] = useState("");
  const [input, setInput] = useState("");

  //

  function handleGenerateQRCode() {
    setQrCode(input);
    setInput("");
  }

  /* render */
  return (
    <div>
      <h1> QR code Generator </h1>
      <div>
        <input
          type="text"
          name="qr-code"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="enter your value here"
        />
        <button
          disabled={input && input.trim() !== "" ? false : true}
          onClick={handleGenerateQRCode}
        >
          Generate
        </button>
      </div>
      <div>
        <QRCode id="qr-code-value" value={qrCode} size={400} bgColor="#fff" />
      </div>
    </div>
  );
};

export default QrGenerator;
