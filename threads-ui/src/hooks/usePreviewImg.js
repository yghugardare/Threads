import { useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewImg = () => {
  const [imgUrl, setImgUrl] = useState(null);
  const showToast = useShowToast();
  // create a function that converts the file[image] to a base64 url
  const handleImageChange = (e) => {
    // get the file selected by user
    const file = e.target.files[0];
    // does file exists? if yes , is it image ?
    if (file && file.type.startsWith("image/")) {
      // object is used to read file contents asynchronously.
      const reader = new FileReader();
      // when file reading ends
      reader.onloadend = () => {
        // result = base 64 url obtained after reading
        setImgUrl(reader.result);
      };
      // till then keep reading file AND ENCODE it as base64 url
      reader.readAsDataURL(file);
    } else {
      // if file DNE or file's not an img
      // then
      showToast("Invalid File Type", "Please Select an Image File", "error");
      setImgUrl(null);
    }
  };
  return { handleImageChange, imgUrl, setImgUrl };
};
export default usePreviewImg;
