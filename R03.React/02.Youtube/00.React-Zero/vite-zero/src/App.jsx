import React from "react";
import { useState } from "react";

const App = () => {
    const [showModal, setShowModal] = useState(false);

    const handleToogle = () => setShowModal(!showModal);
    const closeModal = () => setShowModal(false);

    return (
        <div className="container-1">
            <h1></h1>

            <button
                className="bg-blue-600 rounded-lg p-4 text-white"
                onClick={handleToogle}
            >
                Show Modal
            </button>

            {showModal && <Modal></Modal>}
        </div>
    );
};

export default App;

const Modal = ({ id, header, body, footer, onClose }) => {
    return (
        <div>
            <div>
                <div>
                    <span>x</span>
                    <h2>{header ? header : "no header"}</h2>
                </div>
                <div>{}</div>
            </div>
        </div>
    );
};
