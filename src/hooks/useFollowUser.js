import { arrayRemove, arrayUnion, doc, updateDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";

const useFollowUser = (userId) => {
  // check if the status is loading
  const [isUpdating, setIsUpdating] = useState(false);
  // check if authUser is currently following the user
  const [isFollowing, setIsFollowing] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const { userProfile, setUserProfile } = useUserProfileStore();
  const showToast = useShowToast();

  const handleFollowUser = async () => {
    setIsUpdating(true);
    try {
      const currentUserRef = doc(firestore, "users", authUser.uid);
      const userToFollowOrUnfollowRef = doc(firestore, "users", userId);

      //   update DB
      await updateDoc(currentUserRef, {
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
      });
      await updateDoc(userToFollowOrUnfollowRef, {
        followers: isFollowing ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
      });

      if (isFollowing) {
        // unfollow
        setAuthUser({ ...authUser, following: authUser.following.filter((uid) => uid !== userId) });
        if (userProfile)
          setUserProfile({
            ...userProfile,
            followers: userProfile.followers.filter((uid) => uid !== authUser.uid),
          });
        localStorage.setItem(
          "user-info",
          JSON.stringify({
            ...authUser,
            following: authUser.following.filter((uid) => uid !== userId),
          })
        );
        setIsFollowing(false);
      } else {
        // follow
        setAuthUser({ ...authUser, following: [...authUser.following, userId] });
        if (userProfile)
          setUserProfile({ ...userProfile, followers: [...userProfile.followers, authUser.uid] });
        localStorage.setItem(
          "user-info",
          JSON.stringify({ ...authUser, following: [...authUser.following, userId] })
        );
        setIsFollowing(true);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  //   function runs when userId changes
  useEffect(() => {
    // if the user is authenticated and its following array includes userId, then the user is currently that user.
    if (authUser) {
      const isFollowing = authUser.following.includes(userId);
      setIsFollowing(isFollowing);
    }
  }, [authUser, userId]);

  return { isUpdating, isFollowing, handleFollowUser };
};

export default useFollowUser;

// Logics:
// update the [isFollowing] state by checking if current user's following array includes that userId that we want to follow or un follow.
// if we want to unfollow, remove their Id from both following and followers arrays. we need to remove from their user store, DB and local storage.
// if we want to follow, add their Id from both arrays, add into their user store, DB and local storage to keep our app in sync.
