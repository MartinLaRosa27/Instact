import React, { useState } from "react";
import Head from "next/head";
import store from "../../redux/store";
import { Provider } from "react-redux";
import { Footer } from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { Header } from "@/components/Header";
import "@/styles/app.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App({ Component, pageProps }) {
  const [logged, setLogged] = useState(null);
  const [userName, setUserName] = useState("");

  return (
    <>
      <Provider store={store}>
        <Head>
          <title>Instact</title>
          <meta name="Instact" content="Instact - Post your life" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Toaster />
        {logged && <Header logged={logged} userName={userName} />}
        <Component
          {...pageProps}
          setLogged={setLogged}
          setUserName={setUserName}
        />
        <Footer />
      </Provider>
    </>
  );
}
