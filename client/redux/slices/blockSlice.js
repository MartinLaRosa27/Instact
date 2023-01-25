import axios from "axios";
import gql from "graphql-tag";
import { print } from "graphql";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

export const blockSlice = createSlice({
  name: "blockSlice",
  initialState: {},
  reducers: {},
});
export default blockSlice.reducer;

export const postBlock = async (blocked, token) => {
  const POST_BLOCK = gql`
    mutation PostBlock($blocked: String) {
      postBlock(blocked: $blocked)
    }
  `;
  await axios
    .post(
      `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
      {
        query: print(POST_BLOCK),
        variables: {
          blocked,
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
        toast.success(res.data.data.postBlock, {
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

export const deleteBlock = async (blocked, token) => {
  const DELETE_BLOCK = gql`
    mutation DeleteBlock($blocked: String) {
      deleteBlock(blocked: $blocked)
    }
  `;
  await axios
    .post(
      `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
      {
        query: print(DELETE_BLOCK),
        variables: {
          blocked,
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
        toast.success(res.data.data.deleteBlock, {
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

export const verifyIsBlock = async (blocked, token) => {
  let validation = true;
  const VERIFY_BLOCK = gql`
    query Query($blocked: String) {
      verifyBlock(blocked: $blocked)
    }
  `;
  await axios
    .post(
      `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
      {
        query: print(VERIFY_BLOCK),
        variables: {
          blocked,
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
        validation = res.data.data.verifyBlock;
      }
    })
    .catch((e) => {
      console.log(e);
    });
  return validation;
};
