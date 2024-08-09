import { create } from "zustand";

const usePostStore = create((set) => ({
    posts: [],
    createPost: "",
    deletePost: "",
    setPosts: "",
    addComment: "",
}));

export default usePostStore;
