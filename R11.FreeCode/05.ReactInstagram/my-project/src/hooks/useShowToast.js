import { Toast, useToast } from "@chakra-ui/react";
import React, { useCallback } from "react";

const useShowToast = () => {
  const toast = useToast();

  const showToast = useCallback(
    (title, descripcion, status) => {
      toast({
        title: title,
        description: descripcion,
        status: status,
        duration: 3000,
        isClosable: true,
      });
    },
    [toast]
  );

  return showToast;
};

export default useShowToast;
