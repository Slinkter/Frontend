import React, { useState } from "react";
import { Button, Modal } from "antd";

import "./Modal.scss";

const ModalContainer = ({
  modalOpen,
  setModalOpen,
  status,
  setStatus,
  sendStatus,
}) => {
  return (
    <>
      <Modal
        title="Create a post "
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button
            onClick={sendStatus}
            key="submit"
            type="primary"
            disabled={status.length > 0 ? false : true}
          >
            Post
          </Button>,
        ]}
      >
        <input
          type="text"
          placeholder="what do you want to talk about?"
          className="modal-input"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </Modal>
    </>
  );
};
export default ModalContainer;
