import { create } from "zustand";

const useAuthStore = create((set) => ({
<<<<<<< HEAD
  user: null,
=======
  user: JSON.parse(localStorage.getItem("user-info")),
>>>>>>> 005443a0a62a738b579319a21516f200cea3463c
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  setUser: (user) => set({ user }),
}));

export default useAuthStore;
