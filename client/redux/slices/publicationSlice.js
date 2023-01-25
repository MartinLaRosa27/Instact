import axios from "axios";
import gql from "graphql-tag";
import { print } from "graphql";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { formatDate } from "../../src/helpers/formDate";

export const publicationSlice = createSlice({
  name: "publicationSlice",
  initialState: {
    myPublications: null,
  },
  reducers: {
    setMyPublications: (state, action) => {
      state.myPublications = action.payload;
    },
  },
});
export default publicationSlice.reducer;
const { setMyPublications } = publicationSlice.actions;

export const postPublication = async (form, token) => {
  if (!form.image) {
    toast.error("Could not publish the post", {
      style: {
        background: "#333",
        color: "#fff",
      },
    });
  } else {
    const POST_PUBLICATION = gql`
      mutation PostPublication($input: publicationInput) {
        postPublication(input: $input)
      }
    `;
    await axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        {
          query: print(POST_PUBLICATION),
          variables: {
            input: form,
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
          toast.success(res.data.data.postPublication, {
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
  }
};

export const getMyPublications = (token) => {
  const GET_MY_PUBLICATIONS = gql`
    query GetMyPublications {
      getMyPublications {
        _id
        description
        image
        createdAt
        username
      }
    }
  `;
  return async (dispatch) => {
    await axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        {
          query: print(GET_MY_PUBLICATIONS),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(async (res) => {
        if (!res.data.errors) {
          for (let i = 0; i < res.data.data.getMyPublications.length; i++) {
            res.data.data.getMyPublications[i].createdAt = formatDate(
              res.data.data.getMyPublications[i].createdAt
            );
          }
          dispatch(setMyPublications(res.data.data.getMyPublications));
        } else {
          dispatch(setMyPublications([]));
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const getPublicationByName = async (username, token) => {
  let publications = null;
  const GET_PUBLICATION_BY_NAME = gql`
    query GetPublicationByName($username: String!) {
      getPublicationByName(username: $username) {
        _id
        createdAt
        description
        image
        username
      }
    }
  `;
  await axios
    .post(
      `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
      {
        query: print(GET_PUBLICATION_BY_NAME),
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
        for (let i = 0; i < res.data.data.getPublicationByName.length; i++) {
          res.data.data.getPublicationByName[i].createdAt = formatDate(
            res.data.data.getPublicationByName[i].createdAt
          );
        }
        publications = res.data.data.getPublicationByName;
      }
    })
    .catch((e) => {
      console.log(e);
    });
  return publications;
};

export const deletePublication = async (id, token) => {
  const DELETE_PUBLICATION = gql`
    mutation DeletePublication($deletePublicationId: String) {
      deletePublication(id: $deletePublicationId)
    }
  `;
  await axios
    .post(
      `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
      {
        query: print(DELETE_PUBLICATION),
        variables: {
          deletePublicationId: id,
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
        toast.success(res.data.data.deletePublication, {
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
