import axios from "axios";
import gql from "graphql-tag";
import { print } from "graphql";
import { createSlice } from "@reduxjs/toolkit";

export const likeSlice = createSlice({
  name: "likeSlice",
  initialState: {},
  reducers: {},
});
export default likeSlice.reducer;

export const generateLike = async (likedPost, token) => {
  const GENERATE_LIKE = gql`
    mutation GenereteLike($likedPost: String) {
      genereteLike(likedPost: $likedPost)
    }
  `;
  await axios
    .post(
      `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
      {
        query: print(GENERATE_LIKE),
        variables: {
          likedPost,
        },
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then()
    .catch((e) => {
      console.log(e);
    });
};
