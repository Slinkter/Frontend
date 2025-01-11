import React from "react";
import { useState } from "react";
import Modal from "./Modal";

const ModalCustom = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <h1>show</h1>
            <button onClick={() => setShowModal(!showModal)}>Toogle</button>
            {showModal && <Modal />}
        </div>
    );
};

export default ModalCustom;
