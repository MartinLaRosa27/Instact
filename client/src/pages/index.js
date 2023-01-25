import Head from "next/head";
import * as cookie from "cookie";
import { auth } from "../../middleware/auth";
import React from "react";

export default function Home({ setLogged, token, setUserName, username }) {
  React.useEffect(() => {
    setLogged(token);
    setUserName(username);
  }, []);

  return (
    <>
      <Head>
        <title>Instact | Home</title>
      </Head>
      <h1>Hola Mundo</h1>
    </>
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
