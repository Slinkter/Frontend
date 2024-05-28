import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Flex } from "@chakra-ui/react";

const PageLayout = ({ children }) => {
  return (
    <>
      <Flex>
        PageLayout
        <Sidebar />
        {children}
      </Flex>
    </>
  );
};

export default PageLayout;
