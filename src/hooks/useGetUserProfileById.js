import { doc, getDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";
import useShowToast from "./useShowToast";

const useGetUserProfileById = (userId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const showToast = useShowToast();

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      setUserProfile(null);
      try {
        // fetch the user with given ID.
        const userRef = await getDoc(doc(firestore, "users", userId));
        if (userRef.exists()) {
          setUserProfile(userRef.data());
        }
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    getUserProfile();
  }, [showToast, setUserProfile, userId]); //including dependecies to ensure the effect re-run whenever any of these values changes.
  return { isLoading, userProfile, setUserProfile };
};

export default useGetUserProfileById;
