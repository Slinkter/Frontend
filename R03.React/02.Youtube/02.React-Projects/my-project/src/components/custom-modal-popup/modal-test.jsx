import React, { useState } from "react";
import Modal from "./modal";
import "./modal.css";

const ModalTest = () => {
    window.document.title = "Modal Test";
    /* hooks */
    const [showModalPopup, setShowModalPopup] = useState(false);
    /*  */
    function handleSwitchModalPopup() {
        setShowModalPopup(!showModalPopup);
    }
    /*  */
    function onClose() {
        setShowModalPopup(false);
    }
    /*  */
    const stylediv = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    };
    /*  */
    return (
        <div style={stylediv}>
            <div>
                <button onClick={handleSwitchModalPopup}>
                    Open Modal Popup
                </button>

                {showModalPopup && (
                    <Modal
                        id={"custom-id"}
                        header={<h1> Customized Header hola</h1>}
                        onClose={onClose}
                        footer={<h1> Footer </h1>}
                        body={<h2> Custom Body </h2>}
                    />
                )}
            </div>
        </div>
    );
};

export default ModalTest;
