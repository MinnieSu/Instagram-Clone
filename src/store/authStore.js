import { create } from "https://cdn.skypack.dev/zustand";

// user is not authenticated when first open the app. create functions to login and logout user.
// this function calls create function, which calls the setter function when callback. inside the setting function, the state you have and any functions you use to replace the state
const useAuthStore = create((set) => ({
  //   if only "user:null", user state gets reset to null every time we refresh the page, user can still assess the auth page once they are logged in.
  //   check if user has anything in the local storage, if not, user state will be null.
  user: JSON.parse(localStorage.getItem("user-info")),
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  // update user state for the value that we are getting
  setUser: (user) => set({ user }),
}));

export default useAuthStore;
