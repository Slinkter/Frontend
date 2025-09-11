import { create } from "zustand";

const usePostStore = create((set) => ({
    posts: [],
    setPosts: (posts) => set({ posts }),
    createPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
    deletePost: (id) =>
        set((state) => ({
            posts: state.posts.filter((post) => post.id !== id),
        })),
    addComment: (postId, comment) =>
        set((state) => ({
            posts: state.posts.map((post) => {
                if (post.id === postId) {
                    return {
                        ...post,
                        comments: [...post.comments, comment],
                    };
                }
                return post;
            }),
        })),
}));

export default usePostStore;
