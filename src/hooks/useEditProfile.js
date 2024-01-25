import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import { doc, updateDoc } from "@firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";

// create this hook to upload image to firebase storage
const useEditProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const showToast = useShowToast();
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

  const editProfile = async ({ inputs, selectedFile }) => {
    if (isUpdating || !authUser) return;
    setIsUpdating(true);

    // use backticks for file path
    const storageRef = ref(storage, `profilePics/${authUser.uid}`);
    // update user info: 1)get the user's reference by passing user ID and users collection.
    const userDocRef = doc(firestore, "users", authUser.uid);
    try {
      let URL = "";
      if (selectedFile) {
        // upload user selected file to firebase storage
        await uploadString(storageRef, selectedFile, "data_url");
        console.log("Uploaded a data_url string!");
        //    get the download URL for user selected file
        URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
      }

      const updatedUser = {
        ...authUser,
        fullName: inputs.fullName || authUser.fullName,
        username: inputs.username || authUser.username,
        bio: inputs.bio || authUser.bio,
        profilePicURL: URL || authUser.profilePicURL,
      };
      //update user info: 2)call updateDoc function with the user's reference and the data it should update with
      await updateDoc(userDocRef, updatedUser);
      //   update user info in the local storage
      localStorage.setItem("user-info", JSON.stringify(updatedUser));
      //   update authuser state
      setAuthUser(updatedUser);
      //   update userProfile state, so that we have every state in sync
      setUserProfile(updatedUser);

      showToast("Success", "Profile updated successfully!", "succcess");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return { editProfile, isUpdating };
};

export default useEditProfile;
