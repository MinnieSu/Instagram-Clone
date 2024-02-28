// create a state to store the posts of a user, so that we can display the latest post first.
import { create } from "zustand";

const usePostStore = create((set) => ({
  posts: [],
  createPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  //  deletePost
  //  addComment
  // update posts state
  setPosts: (posts) => set({ posts }),
}));

export default usePostStore;
