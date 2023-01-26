import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserFollowers } from "../../../redux/slices/tracingSlice";
import { useRouter } from "next/router";

export const MyFollowers = ({ token }) => {
  const { followersList } = useSelector((state) => state.tracingSlice);
  const dispatch = useDispatch();

  const router = useRouter();

  React.useEffect(() => {
    dispatch(getUserFollowers(token));
  }, []);

  const handleClickNavigate = (username) => {
    router.push(`/user/${username}`);
  };

  return (
    <div id="MyFollowing">
      {followersList && followersList.length > 0 && (
        <div className="container following-search">
          {followersList.map((follow) => {
            return (
              <ul className="list-group list" key={follow._id}>
                <li className="list-group-item d-flex justify-content-between align-items-center items mt-3">
                  <div
                    className="username"
                    onClick={() => handleClickNavigate(follow.username)}
                  >
                    <span className="badge rounded-pill user-img">
                      <img
                        src={
                          follow.image || process.env.NEXT_PUBLIC_USER_IMG_URL
                        }
                      />
                    </span>
                    {follow.username}
                  </div>
                </li>
              </ul>
            );
          })}
        </div>
      )}
    </div>
  );
};
