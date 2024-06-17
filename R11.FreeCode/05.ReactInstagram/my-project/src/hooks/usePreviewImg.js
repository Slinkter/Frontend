import React, { useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewImg = () => {
  const [selectedFiled, setSelectedFiled] = useState(null);
  const showToast = useShowToast();
  const maxFileSizeInBytes = 2 * 1024 * 1024;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > maxFileSizeInBytes) {
        showToast("Error", "File size must be less than 2MB", "error");
        setSelectedFiled(null);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFiled(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      showToast("Error", "please select an image file", "error");
      setSelectedFiled(null);
    }
  };

  return { selectedFiled, handleImageChange, setSelectedFiled };
};

export default usePreviewImg;
