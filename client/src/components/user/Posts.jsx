import React, { useEffect, useState } from "react";
import { getPublicationByName } from "../../../redux/slices/publicationSlice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { generateLike } from "../../../redux/slices/likeSlice";

export const Posts = ({ username, token }) => {
  const [posts, setPosts] = useState(null);

  const callGetPublicationByName = async () => {
    setPosts(await getPublicationByName(username, token));
  };

  const handleClickGenerateLike = async (id) => {
    await generateLike(id, token);
    callGetPublicationByName();
  };

  useEffect(() => {
    callGetPublicationByName();
  }, []);

  return (
    <div id="userPosts">
      {!posts && (
        <div className="text-center">
          <div className="spinner-grow mt-5" role="status"></div>
        </div>
      )}
      {posts && posts.length > 0 && (
        <>
          {posts.map((post) => {
            return (
              <div className="card mb-3" key={post._id}>
                <img
                  className="card-img-top"
                  src={post.image || process.env.NEXT_PUBLIC_USER_IMG_URL}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {post.username}
                    {" | "}
                    <span onClick={() => handleClickGenerateLike(post._id)}>
                      {post.liked ? (
                        <span className="full-heart">
                          <AiFillHeart />
                        </span>
                      ) : (
                        <AiOutlineHeart />
                      )}
                    </span>
                  </h5>
                  <p className="card-text">{post.description}</p>
                  <small className="fst-italic">
                    Published: {post.createdAt}
                  </small>
                </div>
              </div>
            );
          })}
        </>
      )}
      {posts && posts.length === 0 && (
        <div
          className="alert alert-info mt-3"
          role="alert"
          onClick={() => handleClick()}
        >
          user has no posts
        </div>
      )}
    </div>
  );
};
