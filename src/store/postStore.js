// create a state to store the posts of a user, so that we can display the latest post first.
import { create } from "https://cdn.skypack.dev/zustand";

const usePostStore = create((set) => ({
  posts: [],
  createPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  deletePost: (id) => set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
  // map throught the posts array, if find the post that matches the give post id, add comment at the first index of array.
  // otherwise, return post and continue until find the target post.
  addComment: (postId, comment) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          return { ...post, comments: [...post.comments, comment] };
        }
        return post;
      }),
    })),

  // update posts state
  setPosts: (posts) => set({ posts }),
}));

export default usePostStore;
