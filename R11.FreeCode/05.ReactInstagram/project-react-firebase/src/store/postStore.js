import { create } from "zustand";

const usePostStore = create((set) => ({
  post: [],
  createPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  deletePost: (id) =>
    set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),

  addComment: (postId, comment) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          return { ...post, comments: [...post.comments, comment] };
        }
        return post;
      }),
    })),

  setPost: (post) => set({ post }),
}));

export default usePostStore;
