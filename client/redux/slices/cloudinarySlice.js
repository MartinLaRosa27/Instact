import axios from "axios";
import { toast } from "react-hot-toast";
import { createSlice } from "@reduxjs/toolkit";

export const cloudinarySlice = createSlice({
  name: "cloudinarySlice",
  initialState: {},
  reducers: {},
});
export default cloudinarySlice.reducer;

export const uploadImg = async (img) => {
  let urlImg = null;
  const formData = new FormData();
  formData.append("file", img);
  formData.append("folder", process.env.NEXT_PUBLIC_FOLDER_NAME);
  formData.append("upload_preset", process.env.NEXT_PUBLIC_UNSIGNED_PRESET);
  await axios
    .post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
      formData
    )
    .then((res) => {
      urlImg = res.data.secure_url;
    })
    .catch((e) => {
      console.log(e);
      toast.error("invalid image", {
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    });
  return urlImg;
};
