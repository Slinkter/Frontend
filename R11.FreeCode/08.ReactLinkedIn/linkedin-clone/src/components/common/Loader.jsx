import React from "react";
import { Flex, Spin, Space } from "antd";
import "./Loader.scss";

const Loader = () => {
  return (
    <div className="loader">
      <p>Loading ... please wait...</p>
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </div>
  );
};

export default Loader;
