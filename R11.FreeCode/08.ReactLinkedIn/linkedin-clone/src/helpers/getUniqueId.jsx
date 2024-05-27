import React from "react";
import uuid from "react-uuid";

export const getUniqueId = () => {
  let id = uuid();
  return id;
};
