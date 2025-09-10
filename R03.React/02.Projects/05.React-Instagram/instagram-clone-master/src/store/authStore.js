import { create } from "zustand";

const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem("user-info")),
    setUser: (user) => set({ user }),
    login: (user) => set({ user }),
    logout: () => set({ user: null }),
}));

export default useAuthStore;
