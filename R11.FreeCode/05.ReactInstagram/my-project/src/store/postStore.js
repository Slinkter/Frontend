import { create } from "zustand";

const usePostStore = create((set) => ({
    posts: [],
    setPost: (posts) => set({ posts }),
    createPost: (post) =>
        set((state) => ({
            posts: [post, ...state.posts],
        })),
    deletePost: (id) =>
        set((state) => ({
            posts: state.posts.filter((post) => post.id !== id),
        })),
    addComment: (postId, comment) =>
        set((state) => ({
            posts: state.posts.map((post) => {
                if (post.id === postId) {
                    const postUpdated = {
                        ...post,
                        comments: [comment, ...post.comments],
                    };
                    return postUpdated;
                }
                return post;
            }),
        })),
}));

export default usePostStore;
