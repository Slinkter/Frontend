import { create } from "zustand";

const userInfo = JSON.parse(localStorage.getItem("user-info"));
const useAuthStore = create((set) => ({
  user: userInfo,
  setUser: (user) => set({ user }),
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

export default useAuthStore;
