// create isUpdating, likes and isLiked state, pass post as a prop,
// if the likes array of the post already has authUser's id, authUser wants to unlike the post, remove if from array.
// otherwise add authUser id to likes array.

import { arrayRemove, arrayUnion, doc, updateDoc } from "@firebase/firestore";
import { useState } from "react";
import { firestore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";

const useLikePost = (post) => {
  const authUser = useAuthStore((state) => state.user);
  const [isUpdating, setIsUpdating] = useState(false);
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes.includes(authUser?.uid));
  const showToast = useShowToast();

  const handleLikePost = async () => {
    if (isUpdating) return;
    if (!authUser) return showToast("Error", "You must be logged in to like a post", "error");
    setIsUpdating(true);

    try {
      const postRef = doc(firestore, "posts", post.id);
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
      });
      setIsLiked(!isLiked);
      isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  return { isLiked, likes, handleLikePost, isUpdating };
};

export default useLikePost;
