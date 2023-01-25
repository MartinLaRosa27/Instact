import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserFollowers } from "../../../redux/slices/tracingSlice";

export const MyFollowers = ({ token }) => {
  const { followersList } = useSelector((state) => state.tracingSlice);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUserFollowers(token));
  }, []);

  return (
    <div id="MyFollowing">
      {followersList && followersList.length > 0 && (
        <div className="container following-search">
          {followersList.map((follow) => {
            return (
              <ul className="list-group list" key={follow._id}>
                <li className="list-group-item d-flex justify-content-between align-items-center items mt-3">
                  <div className="username">
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
