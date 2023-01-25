import Head from "next/head";
import * as cookie from "cookie";
import { auth } from "../../middleware/auth";
import React from "react";
import { MyPosts } from "@/components/my_account/MyPosts";
import { MyFollowing } from "@/components/my_account/MyFollowing";
import { MyFollowers } from "@/components/my_account/MyFollowers";
import { getUserInformation } from "../../redux/slices/userSlice";
import { UserImage } from "@/components/my_account/UserImage";

export default function MyAccount({
  setLogged,
  token,
  user,
  setUserName,
  username,
}) {
  const [information, setInformation] = React.useState(null);
  const [posts, setPosts] = React.useState(true);
  const [following, setFollowing] = React.useState(false);
  const [followers, setFollowers] = React.useState(false);

  React.useEffect(() => {
    setLogged(token);
    setUserName(username);
    const callGetUserInformation = async () => {
      setInformation(await getUserInformation(token));
    };
    callGetUserInformation();
  }, []);

  const showPosts = () => {
    setPosts(true);
    setFollowing(false);
    setFollowers(false);
  };

  const showFollowing = () => {
    setPosts(false);
    setFollowing(true);
    setFollowers(false);
  };

  const showFollowers = () => {
    setPosts(false);
    setFollowing(false);
    setFollowers(true);
  };

  return (
    <>
      <Head>
        <title>Instact | {user.username}</title>
      </Head>
      <div id="myAccount">
        <div className="row">
          <div className="col-4 information">
            <UserImage token={token} />
          </div>
          <div className="col-8">
            <table className="table">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className={
                      posts
                        ? "text-center text-uppercase selected"
                        : "text-center text-uppercase"
                    }
                    onClick={() => showPosts()}
                  >
                    Posts
                  </th>
                  <th
                    scope="col"
                    className={
                      following
                        ? "text-center text-uppercase selected"
                        : "text-center text-uppercase"
                    }
                    onClick={() => showFollowing()}
                  >
                    Following
                  </th>
                  <th
                    scope="col"
                    className={
                      followers
                        ? "text-center text-uppercase selected"
                        : "text-center text-uppercase"
                    }
                    onClick={() => showFollowers()}
                  >
                    Followers
                  </th>
                </tr>
              </thead>
              <tbody>
                {information !== null && (
                  <tr>
                    <td className="text-center text-uppercase">
                      {information.publicationsQ}
                    </td>
                    <td className="text-center text-uppercase">
                      {" "}
                      {information.followingQ}
                    </td>
                    <td className="text-center text-uppercase">
                      {" "}
                      {information.followersQ}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {posts && <MyPosts token={token} setInformation={setInformation} />}
            {following && (
              <MyFollowing token={token} setInformation={setInformation} />
            )}
            {followers && <MyFollowers token={token} />}
          </div>
        </div>
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
  return {
    props: {
      token,
      user,
      username: user.username,
    },
  };
};
