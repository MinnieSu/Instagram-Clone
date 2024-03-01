import { collection, getDocs, query, where } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import usePostStore from "../store/postStore";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";

// fetch all posts from the users that authUser is following, store and sort the feedPosts as a state and
const useGetFeedPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts } = usePostStore();
  const { setUserProfile } = useUserProfileStore();
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();

  useEffect(() => {
    const getFeedPosts = async () => {
      setIsLoading(true);
      if (authUser.following.length === 0) {
        setIsLoading(false);
        setPosts([]);
        return;
      }
      try {
        const q = query(
          collection(firestore, "posts"),
          where("createdBy", "in", authUser.following)
        );
        const querySnapshot = await getDocs(q);

        const feedPosts = [];
        querySnapshot.forEach((doc) => {
          feedPosts.push({ id: doc.id, ...doc.data() }); //spread operator... avoids nested objects and properties.
        });

        feedPosts.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(feedPosts);
      } catch (error) {
        "Error", error.message, "error";
      } finally {
        setIsLoading(false);
      }
    };

    if (authUser) getFeedPosts();
  }, [authUser, setPosts, setUserProfile, showToast]);
  return { isLoading, posts };
};

export default useGetFeedPosts;
