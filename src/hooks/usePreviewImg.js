import { useState } from "react";
import useShowToast from "./useShowToast";

// update selected image to userprofile
const usePreviewImg = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const showToast = useShowToast();
  const maxFileSizeInBytes = 2 * 1024 * 1024; //2MB

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // if file exists and file type is image,
    if (file && file.type.startsWith("image/")) {
      if (file.size > maxFileSizeInBytes) {
        showToast("Error", "File size must be less than 2MB", "error");
        return;
      }
      // Use FireReader API uses file object to read the file user has selected
      const reader = new FileReader();
      // when a file read has completed, set the reader result into selected file
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
      //   convert img file to base 64 string
      reader.readAsDataURL(file);
    } else {
      showToast("Error", "Please select an image file", "error");
      setSelectedFile(null);
      return;
    }
  };

  return { selectedFile, setSelectedFile, handleImageChange };
};

export default usePreviewImg;
