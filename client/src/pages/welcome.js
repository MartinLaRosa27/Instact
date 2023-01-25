import React from "react";
import * as cookie from "cookie";
import Head from "next/head";
import Image from "next/image";
import { EnterForm } from "@/components/welcome/EnterForm";
import { SignIn } from "@/components/welcome/SignIn";
import { auth } from "../../middleware/auth";
const kisspng = require("../../public/img/kisspng.png");

export default function Welcome({ setLogged }) {
  React.useEffect(() => {
    setLogged(null);
  }, []);

  return (
    <>
      <Head>
        <title>Welcome to Instact!</title>
      </Head>
      <main id="welcome">
        <div className="d-flex justify-content-between">
          <div className="col-n1">
            <Image
              src={kisspng}
              alt={"kisspng"}
              className="welcome-img"
              priority
            />
          </div>
          <div className="col-n2">
            <EnterForm />
            <SignIn />
          </div>
        </div>
      </main>
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
  if (await auth(token)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      token,
    },
  };
};
