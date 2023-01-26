import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import publicationSlice from "./slices/publicationSlice";
import tracingSlice from "./slices/tracingSlice";
import blockSlice from "./slices/blockSlice";
import likeSlice from "./slices/likeSlice";
import cloudinarySlice from "./slices/cloudinarySlice";

export default configureStore({
  reducer: {
    userSlice,
    publicationSlice,
    cloudinarySlice,
    tracingSlice,
    blockSlice,
    likeSlice,
  },
});
