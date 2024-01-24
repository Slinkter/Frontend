import React, { useState } from "react";
import Modal from "./Modal";

function ButtonModal(props) {
  const { user } = props;
  const [openModal, setOpenModal] = useState(false);
  0;

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <div>
      <button onClick={() => handleOpenModal()}>more </button>
      {!!openModal && (
        <Modal>
          <div className="modalcard">
            <p>{user.login}</p>
            <button onClick={() => setOpenModal(false)}>Cerrar</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ButtonModal;
