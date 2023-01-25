import React from "react";
import {
  pathUserImg,
  getUserPersonalImg,
} from "../../../redux/slices/userSlice";
import { uploadImg } from "../../../redux/slices/cloudinarySlice";

export const UserImage = ({ token }) => {
  const [loadingImage, setLoadingImage] = React.useState(false);
  const [userImage, setUserImage] = React.useState(
    process.env.NEXT_PUBLIC_USER_IMG_URL
  );

  React.useEffect(() => {
    const callGetUserPersonalImg = async () => {
      setUserImage(await getUserPersonalImg(token));
    };
    callGetUserPersonalImg();
  }, []);

  const handleChangeImg = async (img) => {
    setLoadingImage(true);
    await uploadImg(img).then(async (res) => {
      await pathUserImg(res, token);
      setUserImage(res);
    });
    setLoadingImage(false);
  };

  return (
    <div id="UserImage">
      {!loadingImage ? (
        <img
          src={userImage || process.env.NEXT_PUBLIC_USER_IMG_URL}
          className="mt-5 my-img"
        />
      ) : (
        <div className="mt-5 my-img loading-img">
          <div className="spinner-grow" role="status"></div>
        </div>
      )}
      <form method="post">
        <input
          className="form-control mt-3"
          type="file"
          required
          onChange={(e) => handleChangeImg(e.target.files[0])}
        />
      </form>
    </div>
  );
};
