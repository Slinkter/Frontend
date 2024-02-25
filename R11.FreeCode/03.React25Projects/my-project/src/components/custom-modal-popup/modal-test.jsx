import React, { useState } from "react";
import Modal from "./modal";
import "./modal.css";

const ModalTest = () => {
  const [showModalPopup, setShowModalPopup] = useState(false);
  function handleSwitchModalPopup() {
    setShowModalPopup(!showModalPopup);
  }

  function onClose() {
    setShowModalPopup(false);
  }

  return (
    <div>
      <button onClick={handleSwitchModalPopup}>Open Modal Popup</button>
      {showModalPopup && (
        <Modal
          id={"custom-id"}
          header={<h1> Customized Header hola</h1>}
          footer={<h1> Footer </h1>}
          onClose={onClose}
          body={<div> Custom Body </div>}
        />
      )}
    </div>
  );
};

export default ModalTest;
