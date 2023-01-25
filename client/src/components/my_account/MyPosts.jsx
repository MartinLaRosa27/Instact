import React from "react";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { getUserInformation } from "../../../redux/slices/userSlice";
import {
  getMyPublications,
  deletePublication,
} from "../../../redux/slices/publicationSlice";
import { AiOutlineHeart } from "react-icons/ai";
import { useRouter } from "next/router";

export const MyPosts = ({ token, setInformation }) => {
  const router = useRouter();

  const { myPublications } = useSelector((state) => state.publicationSlice);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getMyPublications(token));
  }, []);

  const handleClick = () => {
    router.push("/new-post");
  };

  const handleClickDeletePost = async (id) => {
    Swal.fire({
      title: "Are you sure you want to delete the post?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deletePublication(id, token);
        setInformation(getUserInformation(token));
        dispatch(getMyPublications(token));
      }
    });
  };

  return (
    <div id="MyPosts">
      {!myPublications && (
        <button className="btn btn-primary mt-5" type="button" disabled>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          {"  "}Loading...
        </button>
      )}

      {myPublications && myPublications.length > 0 && (
        <>
          {myPublications.map((myPublication) => {
            return (
              <div className="card mb-3" key={myPublication._id}>
                <img
                  className="card-img-top"
                  src={
                    myPublication.image || process.env.NEXT_PUBLIC_USER_IMG_URL
                  }
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {myPublication.username}
                    {" | "}
                    <span>
                      <AiOutlineHeart />
                    </span>{" "}
                    10
                  </h5>
                  <p className="card-text">{myPublication.description}</p>
                  <small className="fst-italic">
                    Published: {myPublication.createdAt}
                  </small>
                </div>
                <button
                  type="button"
                  className="btn btn-danger m-3 text-uppercase fst-italic"
                  onClick={() => handleClickDeletePost(myPublication._id)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </>
      )}

      {myPublications && myPublications.length === 0 && (
        <div
          className="alert alert-info mt-3"
          role="alert"
          onClick={() => handleClick()}
        >
          What are you waiting for to make your first publication?
        </div>
      )}
    </div>
  );
};
