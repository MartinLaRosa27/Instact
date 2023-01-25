import React from "react";
import Head from "next/head";
import * as cookie from "cookie";
import { auth } from "../../middleware/auth";
import { FormNewPost } from "@/components/new-post/FormNewPost";

export default function newPost({ setLogged, token, setUserName, username }) {
  React.useEffect(() => {
    setLogged(token);
    setUserName(username);
  }, []);

  return (
    <div id="newPost" className="container">
      <Head>
        <title>Instact | New Post</title>
      </Head>
      <h1 className="text-center pt-5">New Instact Post</h1>
      <FormNewPost token={token} />
    </div>
  );
}

export const getServerSideProps = async (context) => {
  let token;
  if (typeof context.req.headers.cookie !== "string") {
    token = "Invalid token";
  } else {
    const parsedCookies = cookie.parse(context.req.headers.cookie);
    token = parsedCookies.token;
  }
  const user = await auth(token);
  if (!user) {
    return {
      redirect: {
        destination: "/welcome",
        permanent: false,
      },
    };
  }
  return {
    props: {
      token,
      username: user.username,
    },
  };
};
