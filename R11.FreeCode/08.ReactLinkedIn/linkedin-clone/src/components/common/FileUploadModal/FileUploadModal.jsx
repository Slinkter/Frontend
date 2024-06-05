import { Button, Modal, Progress, Space } from "antd";
import React from "react";
import "./FileUploadModal.scss";

const FileUploadModal = ({
  modalOpen,
  setModalOpen,
  getImage,
  uploadImage,
  currentImage,
  progress,
}) => {
  console.log("currentImage modal : ", currentImage);
  return (
    <div>
      <Modal
        title="Add new Profile Image"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={uploadImage}
            disabled={currentImage?.name ? false : true}
          >
            Upload Profile Picture
          </Button>,
        ]}
      >
        <div className="image-upload-main">
          <p>{currentImage?.name}</p>
          <label className="upload-btn" htmlFor="image-upload">
            Add a Image
          </label>

          {progress === 0 ? (
            <></>
          ) : (
            <div className="progress-bar">
              <Space wrap>
                <Progress type="circle" percent={progress} />
              </Space>
            </div>
          )}

          <input id="image-upload" type="file" onChange={getImage} />
        </div>
      </Modal>
    </div>
  );
};

export default FileUploadModal;
