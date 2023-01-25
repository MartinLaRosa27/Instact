import axios from "axios";
import gql from "graphql-tag";
import { print } from "graphql";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

export const tracingSlice = createSlice({
  name: "tracingSlice",
  initialState: {
    followingList: null,
    followersList: null,
  },
  reducers: {
    setFollowingList: (state, action) => {
      state.followingList = action.payload;
    },
    setFollowersList: (state, action) => {
      state.followersList = action.payload;
    },
  },
});
export default tracingSlice.reducer;
const { setFollowingList } = tracingSlice.actions;
const { setFollowersList } = tracingSlice.actions;

export const postTracing = async (following, token) => {
  const POST_TRACING = gql`
    mutation PostTracing($following: String) {
      postTracing(following: $following)
    }
  `;
  await axios
    .post(
      `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
      {
        query: print(POST_TRACING),
        variables: {
          following,
        },
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then(async (res) => {
      if (!res.data.errors) {
        toast.success(res.data.data.postTracing, {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
      } else {
        toast.error(res.data.errors[0].message, {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

export const deleteTracing = async (following, token) => {
  const DELETE_TRACING = gql`
    mutation DeleteTracing($following: String) {
      deleteTracing(following: $following)
    }
  `;
  await axios
    .post(
      `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
      {
        query: print(DELETE_TRACING),
        variables: {
          following,
        },
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then(async (res) => {
      if (!res.data.errors) {
        toast.success(res.data.data.deleteTracing, {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
      } else {
        toast.error(res.data.errors[0].message, {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getUserFollowing = (token) => {
  const GET_MY_FOLLOWING = gql`
    query GetUserFollowing {
      getUserFollowing {
        username
        _id
        image
      }
    }
  `;
  return async (dispatch) => {
    await axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        {
          query: print(GET_MY_FOLLOWING),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(async (res) => {
        if (!res.data.errors) {
          dispatch(setFollowingList(res.data.data.getUserFollowing));
        } else {
          dispatch(setFollowingList([]));
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const getUserFollowers = (token) => {
  const GET_MY_FOLLOWERS = gql`
    query GetUserFollowers {
      getUserFollowers {
        username
        image
        _id
      }
    }
  `;
  return async (dispatch) => {
    await axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        {
          query: print(GET_MY_FOLLOWERS),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(async (res) => {
        if (!res.data.errors) {
          dispatch(setFollowersList(res.data.data.getUserFollowers));
        } else {
          dispatch(setFollowersList([]));
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
};
