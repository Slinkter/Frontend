import { useState } from "react";
import QRCode from "react-qr-code";

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        border: "10px solid gray",
    },
    header: {
        marginBottom: "20px",
    },
    inputContainer: {
        marginBottom: "20px",
    },
    qrCode: {
        border: "1px solid red",
    },
};

const QrGenerator = () => {
    const [input, setInput] = useState("");
    const [qrCode, setQrCode] = useState("");

    const handleGenerateQRCode = () => {
        setQrCode(input);
        setInput("");
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>QR code Generator</h1>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    placeholder="Enter your value here"
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                />
                <button onClick={handleGenerateQRCode} disabled={!input.trim()}>
                    Generate
                </button>
            </div>
            <div>
                <QRCode
                    value={qrCode}
                    size={400}
                    bgColor="#fff"
                    style={styles.qrCode}
                />
            </div>
        </div>
    );
};

export default QrGenerator;
