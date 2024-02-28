import { collection, getDocs, query, where } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/postStore";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";

const useGetUserPosts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { posts, setPosts } = usePostStore();
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const showToast = useShowToast();

  useEffect(() => {
    const getPosts = async () => {
      if (!userProfile) return;
      setIsLoading(true);
      setPosts([]);
      try {
        const q = query(collection(firestore, "posts"), where("createdBy", "==", userProfile.uid));
        const posts = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });
        posts.sort((a, b) => b.createdAt - a.createdAt);

        setPosts(posts);
      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };
    getPosts();
  }, [setPosts, userProfile, showToast]);

  return { isLoading, posts };
};

export default useGetUserPosts;
