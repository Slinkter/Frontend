import { create } from "zustand";

const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem("user-info")),
    login: (user) => set({ user }),
    logout: () => set({ user: null }),
    setUser: (user) => set(user),
}));

export default useAuthStore;
/* 

authStore.js archivo

useAuthStore hooks personalizado
zustand , bibloteca de gestion de estados
create , crear un almacen de estados personalizados
user,login,logout,setuser : son propiedades y funciones 
set , es un actualizador


*/
