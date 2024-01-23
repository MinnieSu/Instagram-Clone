// create useUserProfileStore to store the user profile that we are checking as a global state,
// so that this user profile can be shared to all components with just 1 hook
import { create } from "zustand";

const useUserProfileStore = create((set) => ({
  userProfile: null,
  setUserProfile: (userProfile) => set({ userProfile }),
}));

export default useUserProfileStore;
