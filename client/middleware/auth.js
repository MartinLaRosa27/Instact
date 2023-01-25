import { print } from "graphql";
import gql from "graphql-tag";
import axios from "axios";

module.exports.auth = async (token) => {
  let validation = false;
  const AUTH = gql`
    query Auth($token: String) {
      auth(token: $token) {
        _id
        email
        fullName
        username
        image
      }
    }
  `;
  await axios
    .post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
      query: print(AUTH),
      variables: {
        token,
      },
    })
    .then(async (res) => {
      validation = res.data.data.auth;
    })
    .catch((e) => {
      console.log(e);
    });
  return validation;
};
