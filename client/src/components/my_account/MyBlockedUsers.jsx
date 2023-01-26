import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserBlocked, deleteBlock } from "../../../redux/slices/blockSlice";
import { getUserInformation } from "../../../redux/slices/userSlice";
import { useRouter } from "next/router";

export const MyBlockedUsers = ({ token, setInformation }) => {
  const { blockedList } = useSelector((state) => state.blockSlice);
  const dispatch = useDispatch();

  const router = useRouter();

  React.useEffect(() => {
    dispatch(getUserBlocked(token));
  }, []);

  const handleClickNavigate = (username) => {
    router.push(`/user/${username}`);
  };

  const handleClickUnlock = async (id) => {
    await deleteBlock(id, token).then(() => {
      dispatch(getUserBlocked(token));
    });
    setInformation(getUserInformation(token));
  };
  return (
    <div id="MyFollowing">
      {blockedList && blockedList.length > 0 && (
        <div className="container following-search">
          {blockedList.map((block) => {
            return (
              <ul className="list-group list" key={block._id}>
                <li className="list-group-item d-flex justify-content-between align-items-center items mt-3">
                  <div
                    className="username"
                    onClick={() => handleClickNavigate(block.username)}
                  >
                    <span className="badge rounded-pill user-img">
                      <img
                        src={
                          block.image || process.env.NEXT_PUBLIC_USER_IMG_URL
                        }
                      />
                    </span>
                    {block.username}
                  </div>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => handleClickUnlock(block._id)}
                  >
                    unlock
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
