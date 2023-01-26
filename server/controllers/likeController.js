const shortid = require("shortid");
const Like = require("../models/Like");

module.exports.genereteLike = async (likedPost, user) => {
  console.log(likedPost)
  console.log(user._id)
  if (user !== null) {
    try {
      const existingLike = await Like.findAll({
        where: {
          userId: user._id,
          likedPost,
        },
      });
      if (existingLike.length <= 0) {
        await Like.create({
          _id: shortid.generate(),
          userId: user._id,
          likedPost,
        });
        return "Now you like the post";
      } else {
        await Like.destroy({
          where: {
            userId: user._id,
            likedPost,
          },
        });
        return "Now you don't like the post";
      }
    } catch (e) {
      console.log(e);
      throw new Error(e.errors[0].message);
    }
  }
  throw new Error("session expired");
};
