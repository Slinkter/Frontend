import React, { useState } from "react";
import { Button, Modal } from "antd";

import "./Modal.scss";

const ModalContainer = ({
  modalOpen,
  setModalOpen,
  setStatus,
  sendStatus,
  status,
  isEdit,
  updateStatus,
}) => {
  return (
    <>
      <Modal
        title="Create a post "
        centered
        open={modalOpen}
        onOk={() => {
          setStatus("");
          setModalOpen(false);
        }}
        onCancel={() => {
          setStatus("");
          setModalOpen(false);
        }}
        footer={[
          <Button
            onClick={isEdit ? updateStatus : sendStatus}
            key="submit"
            type="primary"
            disabled={status.length > 0 ? false : true}
          >
            {isEdit ? "Update" : "Post"}
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
