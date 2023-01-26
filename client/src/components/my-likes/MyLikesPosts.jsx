import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLikedPublications } from "../../../redux/slices/publicationSlice";
import { generateLike } from "../../../redux/slices/likeSlice";
import { AiFillHeart } from "react-icons/ai";

export const MyLikesPosts = ({ token }) => {
  const { likedPosts } = useSelector((state) => state.publicationSlice);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getLikedPublications(token));
  }, []);

  const handleClickGenerateLike = async (followPublication) => {
    await generateLike(followPublication._id, token);
    dispatch(getLikedPublications(token));
  };

  return (
    <div id="HomePosts">
      {!likedPosts && (
        <button className="btn btn-primary mt-5" type="button" disabled>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          {"  "}Loading...
        </button>
      )}

      {likedPosts && likedPosts.length > 0 && (
        <>
          {likedPosts.map((likedPost) => {
            return (
              <div className="card mb-3" key={likedPost._id}>
                <img
                  className="card-img-top"
                  src={likedPost.image || process.env.NEXT_PUBLIC_USER_IMG_URL}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {likedPost.username}
                    {" | "}
                    <span onClick={() => handleClickGenerateLike(likedPost)}>
                      <span className="full-heart">
                        <AiFillHeart />
                      </span>
                    </span>
                  </h5>
                  <p className="card-text">{likedPost.description}</p>
                  <small className="fst-italic">
                    Published: {likedPost.createdAt}
                  </small>
                </div>
              </div>
            );
          })}
        </>
      )}

      {likedPosts && likedPosts.length === 0 && (
        <div className="alert alert-info mt-3 alert-np" role="alert">
          You have not yet indicated that you like a post
        </div>
      )}
    </div>
  );
};
