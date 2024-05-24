import React from "react";
import { Flex, Spin } from "antd";

const Loader = () => {
  return (
    <Flex align="center" gap="middle">
      <Spin size="large" />
      <h1>Loading</h1>
    </Flex>
  );
};

export default Loader;
