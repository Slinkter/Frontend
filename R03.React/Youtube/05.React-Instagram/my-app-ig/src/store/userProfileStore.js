import { create } from "zustand";
const useUserProfileStore = create((set) => ({
    userProfile: [],
    setUserProfile: [],
    addPost: [],
    deletePost: [],
}));

export default useUserProfileStore;
