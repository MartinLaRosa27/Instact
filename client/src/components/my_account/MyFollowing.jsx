import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserFollowing,
  deleteTracing,
} from "../../../redux/slices/tracingSlice";
import { getUserInformation } from "../../../redux/slices/userSlice";

export const MyFollowing = ({ token, setInformation }) => {
  const { followingList } = useSelector((state) => state.tracingSlice);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUserFollowing(token));
  }, []);

  const handleClickDeleteTracing = async (id) => {
    await deleteTracing(id, token);
    dispatch(getUserFollowing(token));
    setInformation(await getUserInformation(token));
  };
  return (
    <div id="MyFollowing">
      {followingList && followingList.length > 0 && (
        <div className="container following-search">
          {followingList.map((follow) => {
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
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleClickDeleteTracing(follow._id)}
                  >
                    Unfollow
                  </button>
                </li>
              </ul>
            );
          })}
        </div>
      )}
    </div>
  );
};
