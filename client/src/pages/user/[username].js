import React from "react";
import Head from "next/head";
import * as cookie from "cookie";
import { auth } from "../../../middleware/auth";
import { getUserByNameStrict } from "../../../redux/slices/userSlice";
import { useRouter } from "next/router";
import { postTracing, deleteTracing } from "../../../redux/slices/tracingSlice";
import {
  deleteBlock,
  postBlock,
  verifyIsBlock,
} from "../../../redux/slices/blockSlice";
import { Posts } from "@/components/user/Posts";

export default function Username({
  setLogged,
  token,
  setUserName,
  username,
  usernameParam,
}) {
  const router = useRouter();

  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    setLogged(token);
    setUserName(username);
    const callGetUserByNameStrict = async () => {
      await getUserByNameStrict(usernameParam, token).then(async (res) => {
        if (res) {
          const validation = await verifyIsBlock(res._id, token);
          if (validation) {
            router.push("/");
          } else {
            setUser(res);
          }
        }
      });
    };
    callGetUserByNameStrict();
  }, []);

  const handleClickFollow = async (id) => {
    await postTracing(id, token).then(async () => {
      const userAux = await getUserByNameStrict(usernameParam, token);
      setUser(userAux);
    });
  };

  const handleClickUnfollow = async (id) => {
    await deleteTracing(id, token).then(async () => {
      const userAux = await getUserByNameStrict(usernameParam, token);
      setUser(userAux);
    });
  };

  const handleClickBlock = async (id) => {
    await postBlock(id, token).then(async () => {
      const userAux = await getUserByNameStrict(usernameParam, token);
      setUser(userAux);
    });
  };

  const handleClickUnblock = async (id) => {
    await deleteBlock(id, token).then(async () => {
      const userAux = await getUserByNameStrict(usernameParam, token);
      setUser(userAux);
    });
  };

  return (
    <>
      <Head>
        <title>Instact | {usernameParam}</title>
      </Head>
      <div id="User-Username">
        {!user && (
          <div className="text-center">
            <div className="spinner-grow mt-5" role="status"></div>
          </div>
        )}
        {user && (
          <div className="row">
            <h3 className="mt-3 text-center mb-3 username-res">
              {usernameParam}
            </h3>
            <div className="col-4 information">
              <img
                src={user.image || process.env.NEXT_PUBLIC_USER_IMG_URL}
                className="mt-5 user-img"
              />
              <div className="buttons mt-3">
                {user.following ? (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleClickUnfollow(user._id)}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleClickFollow(user._id)}
                  >
                    Follow
                  </button>
                )}
                {user.blocked ? (
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => handleClickUnblock(user._id)}
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => handleClickBlock(user._id)}
                  >
                    Block
                  </button>
                )}
              </div>
            </div>
            <div className="col-8">
              <h3 className="mt-3 text-center mb-3 username-lrg">
                {usernameParam}
              </h3>
              <table className="table">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="text-center text-uppercase selected"
                    >
                      Posts
                    </th>
                  </tr>
                </thead>
              </table>
              <Posts token={token} username={usernameParam} />
            </div>
          </div>
        )}
      </div>
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
  if (user.username === context.params.username) {
    return {
      redirect: {
        destination: "/my-account",
        permanent: false,
      },
    };
  }
  return {
    props: {
      token,
      username: user.username,
      usernameParam: context.params.username,
    },
  };
};
