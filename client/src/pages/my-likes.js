import React from "react";
import Head from "next/head";
import * as cookie from "cookie";
import { auth } from "../../middleware/auth";
import { MyLikesPosts } from "@/components/my-likes/MyLikesPosts";

export default function MyLikes({ setLogged, token, setUserName, username }) {
  React.useEffect(() => {
    setLogged(token);
    setUserName(username);
  }, []);

  return (
    <main id="Home">
      <Head>
        <title>Instact | My Likes</title>
      </Head>
      <MyLikesPosts token={token} />
    </main>
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
