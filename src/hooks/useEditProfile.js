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

  const editProfile = async (inputs, selectedFile) => {
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
      await setAuthUser(updatedUser);
      //   update userProfile state, so that we have every state in sync
      await setUserProfile(updatedUser);
      showToast("Success", "Profile updated successfully!", "succcess");
      console.log("Profile updated successfully!");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return { editProfile, isUpdating };
};

export default useEditProfile;

// Ensure that the function definition and the function calls match in terms of parameter structure.
// e.g.in useEditProfile.js hook:
// const editProfile = async(inputs,selectedFile)=>{}
// when calling 'editProfile' function in EditProfile.jsx component, it should match the parameter structure
// await editProfile(inputs,selectedFile);
// if put "const editProfile = async({inputs,selectedFile})=>{}" and cal the function"await editProfile(inputs,selectedFile)", it will return error: properties of undefined
// passing an object with 2 properties: const Myfunction= ({a,b})=> {}
// passing 2 separate parameters : const Myfunction= (a,b)=> {}
