import axios from "axios";
import Cookies from "universal-cookie";
import gql from "graphql-tag";
import { print } from "graphql";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userSearch: null,
  },
  reducers: {
    setUserSearch: (state, action) => {
      state.userSearch = action.payload;
    },
  },
});
export default userSlice.reducer;
const { setUserSearch } = userSlice.actions;

export const postUser = async (form) => {
  let userConfirmation = false;
  const POST_USER = gql`
    mutation PostUser($input: userInput) {
      postUser(input: $input)
    }
  `;
  await axios
    .post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
      query: print(POST_USER),
      variables: {
        input: {
          email: form.email,
          password: form.password,
          fullName: form.fullName,
          username: form.username,
        },
      },
    })
    .then(async (res) => {
      if (!res.data.errors) {
        toast.success("User successfully registered", {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
        const cookies = new Cookies();
        cookies.set("token", res.data.data.postUser, {
          path: "/",
          maxAge: process.env.NEXT_PUBLIC_COOKIE_EXP,
        });
        userConfirmation = true;
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
  return userConfirmation;
};

export const userAuthentication = async (form) => {
  let userConfirmation = false;
  const AUTHENTICATE_USER = gql`
    mutation UserAuthentication($input: userInput) {
      userAuthentication(input: $input)
    }
  `;
  await axios
    .post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
      query: print(AUTHENTICATE_USER),
      variables: {
        input: {
          email: form.email,
          password: form.password,
        },
      },
    })
    .then(async (res) => {
      if (!res.data.errors) {
        const cookies = new Cookies();
        cookies.set("token", res.data.data.userAuthentication, {
          path: "/",
          maxAge: process.env.NEXT_PUBLIC_COOKIE_EXP,
        });
        userConfirmation = true;
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
  return userConfirmation;
};

export const logout = () => {
  const cookies = new Cookies();
  cookies.remove("token", { path: "/" });
  window.location.reload();
};

export const getUserByName = (username, token) => {
  const GET_USER_BY_NAME = gql`
    query GetUserByName($username: String) {
      getUserByName(username: $username) {
        _id
        username
        image
        following
      }
    }
  `;
  return async (dispatch) => {
    await axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        {
          query: print(GET_USER_BY_NAME),
          variables: {
            username,
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
          dispatch(setUserSearch(res.data.data.getUserByName));
        } else {
          dispatch(setUserSearch(null));
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const getUserByNameStrict = async (username, token) => {
  let user = null;
  const GET_USER_BY_NAME_STRICT = gql`
    query GetUserByNameStrict($username: String) {
      getUserByNameStrict(username: $username) {
        _id
        following
        image
        username
      }
    }
  `;
  await axios
    .post(
      `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
      {
        query: print(GET_USER_BY_NAME_STRICT),
        variables: {
          username,
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
        user = res.data.data.getUserByNameStrict;
      }
    })
    .catch((e) => {
      console.log(e);
    });
  return user;
};

export const getUserInformation = async (token) => {
  let userInformation = null;
  const GET_USER_INFORMATION = gql`
    query GetUserInformation {
      getUserInformation {
        followersQ
        followingQ
        publicationsQ
      }
    }
  `;
  await axios
    .post(
      `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
      {
        query: print(GET_USER_INFORMATION),
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((res) => {
      if (!res.data.errors) {
        userInformation = res.data.data.getUserInformation;
      }
    })
    .catch((e) => {
      console.log(e);
    });
  return userInformation;
};

export const pathUserImg = async (image, token) => {
  const PATCH_USER_IMG = gql`
    mutation PathUserImg($image: String!) {
      pathUserImg(image: $image)
    }
  `;
  await axios
    .post(
      `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
      {
        query: print(PATCH_USER_IMG),
        variables: {
          image,
        },
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((res) => {
      if (!res.data.errors) {
        toast.success(res.data.data.pathUserImg, {
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

export const getUserPersonalImg = async (token) => {
  let userPeronsalImg = null;
  const GET_USER_PERSONAL_IMG = gql`
    query GetUserPersonalImg {
      getUserPersonalImg {
        image
      }
    }
  `;
  await axios
    .post(
      `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
      {
        query: print(GET_USER_PERSONAL_IMG),
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((res) => {
      if (!res.data.errors) {
        userPeronsalImg = res.data.data.getUserPersonalImg.image;
      }
    })
    .catch((e) => {
      console.log(e);
    });
  return userPeronsalImg;
};
