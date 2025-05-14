import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const theme = {
  winter: "winter",
  dracula: "dracula",
};

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user") || null);
};

const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem() || theme.winter;
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
};
