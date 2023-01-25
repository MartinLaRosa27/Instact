import React from "react";
import { uploadImg } from "../../../redux/slices/cloudinarySlice";
import { postPublication } from "../../../redux/slices/publicationSlice";

export const FormNewPost = ({ token }) => {
  const [loading, setLoading] = React.useState(false);
  const [imgSelected, setImgSelected] = React.useState(null);
  const [description, setDescription] = React.useState(null);

  const savePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    const urlImg = await uploadImg(imgSelected);
    const form = {
      description: description,
      image: urlImg,
    };
    await postPublication(form, token);
    setLoading(false);
  };

  return (
    <div id="FormNewPost">
      {loading ? (
        <div className="text-center mt-5 mb-5">
          <button
            className="btn btn-primary text-center"
            type="button"
            disabled
          >
            <span
              className="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>{" "}
            Loading...
          </button>
        </div>
      ) : (
        <form method="POST" onSubmit={(e) => savePost(e)}>
          <div className="form-floating mt-5">
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              id="FormNewPost-floatingTextarea2"
              minLength={1}
              maxLength={144}
              required
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label htmlFor="FormNewPost-floatingTextarea2">
              Description (144 characters)
            </label>
          </div>
          <div className="mb-3 mt-5">
            <input
              className="form-control"
              type="file"
              required
              onChange={(e) => setImgSelected(e.target.files[0])}
            />
          </div>
          <div className="d-grid gap-2 mt-5 mb-5">
            <button className="btn btn-primary" type="submit">
              Create Post
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
