import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getFollowingUserPublications,
  checkFollowingUserPublications,
} from "../../../redux/slices/publicationSlice";
import { AiOutlineHeart, AiOutlineReload } from "react-icons/ai";

export const HomePosts = ({ token }) => {
  const [check, setCheck] = React.useState(null);

  const { followPublications } = useSelector((state) => state.publicationSlice);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getFollowingUserPublications(token));
    const checkPublications = () => {
      setInterval(async () => {
        setCheck(await checkFollowingUserPublications(token));
      }, 2000);
    };
    checkPublications();
  }, []);

  const handleClickPosts = () => {
    dispatch(getFollowingUserPublications(token));
  };

  return (
    <div id="HomePosts">
      {check &&
        followPublications &&
        followPublications.length !== check.length && (
          <div
            className="alert alert-info mt-3 new-post"
            role="alert"
            onClick={() => handleClickPosts()}
          >
            <AiOutlineReload />
          </div>
        )}

      {!followPublications && (
        <button className="btn btn-primary mt-5" type="button" disabled>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          {"  "}Loading...
        </button>
      )}

      {followPublications && followPublications.length > 0 && (
        <>
          {followPublications.map((followPublication) => {
            return (
              <div className="card mb-3" key={followPublication._id}>
                <img
                  className="card-img-top"
                  src={
                    followPublication.image ||
                    process.env.NEXT_PUBLIC_USER_IMG_URL
                  }
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {followPublication.username}
                    {" | "}
                    <span>
                      <AiOutlineHeart />
                    </span>{" "}
                    10
                  </h5>
                  <p className="card-text">{followPublication.description}</p>
                  <small className="fst-italic">
                    Published: {followPublication.createdAt}
                  </small>
                </div>
              </div>
            );
          })}
        </>
      )}

      {followPublications && followPublications.length === 0 && (
        <div className="alert alert-info mt-3 alert-np" role="alert">
          No posts to show
        </div>
      )}
    </div>
  );
};
