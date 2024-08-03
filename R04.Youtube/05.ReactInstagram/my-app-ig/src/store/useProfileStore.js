import { create } from "zustand";

const useUserProfileStore = create((set) => ({
    userProfile: null,
    setUserProfile: "",
    addPost: "",
    deletePost: "",
}));

export default useUserProfileStore;
