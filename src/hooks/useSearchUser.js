import { collection, getDocs, query, where } from "@firebase/firestore";
import { useState } from "react";
import { firestore } from "../firebase/firebase";
import useShowToast from "./useShowToast";

const useSearchUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const showToast = useShowToast();
  //   search user by username
  const getUserProfile = async (username) => {
    setIsLoading(true);
    // while searching, no user is present in the search result, user state should be null.
    setUser(null);
    try {
      //   get all the users with the given username
      const q = query(collection(firestore, "users"), where("username", "==", username));
      const querySnapshot = await getDocs(q);
      //  if no user is found
      if (querySnapshot.empty) return showToast("Error", "User Not Found", "error");
      // if a user is found, update the user's followers if the authUser clicks the follow or unfollow button.
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      showToast("Error", error.message, "error");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, user, setUser, getUserProfile };
};

export default useSearchUser;
