const shortid = require("shortid");
const Tracing = require("../models/Tracing");
const User = require("../models/User");
const { QueryTypes } = require("sequelize");

module.exports.postTracing = async (following, user) => {
  if (user !== null) {
    const existingTracing = await Tracing.findAll({
      where: {
        userId: user._id,
        following,
      },
    });
    if (existingTracing.length > 0) {
      throw new Error("The user already follows him");
    }
    try {
      await Tracing.create({
        _id: shortid.generate(),
        userId: user._id,
        following,
      });
      return "The user is being followed correctly";
    } catch (e) {
      console.log(e);
      throw new Error(e.errors[0].message);
    }
  }
  throw new Error("session expired");
};

module.exports.deleteTracing = async (following, user) => {
  if (user !== null) {
    const existingTracing = await Tracing.findOne({
      where: {
        userId: user._id,
        following,
      },
    });
    if (!existingTracing) {
      throw new Error("The user don't follow him");
    }
    try {
      await Tracing.destroy({
        where: {
          userId: user._id,
          following,
        },
      });
      return "The user has been unfollowed";
    } catch (e) {
      console.log(e);
      throw new Error(e.errors[0].message);
    }
  }
  throw new Error("session expired");
};

module.exports.getUserFollowing = async (user) => {
  if (user !== null) {
    try {
      const userFollowing = await User.sequelize.query(
        `SELECT u._id, u.username, u.image
        FROM tracings AS t
        INNER JOIN users AS u ON t.following = u._id
        WHERE t.userId = "${user._id}";`,
        {
          type: QueryTypes.SELECT,
        }
      );
      return userFollowing;
    } catch (e) {
      console.log(e);
      throw new Error("Could not get the accounts that the user follows.");
    }
  }
  throw new Error("session expired");
};

module.exports.getUserFollowers = async (user) => {
  if (user !== null) {
    try {
      const userFollowing = await User.sequelize.query(
        `SELECT u._id, u.username, u.image
        FROM tracings AS t
        INNER JOIN users AS u ON t.userId = u._id
        WHERE t.following = "${user._id}";`,
        {
          type: QueryTypes.SELECT,
        }
      );
      return userFollowing;
    } catch (e) {
      console.log(e);
      throw new Error("Could not get the accounts that follow the user.");
    }
  }
  throw new Error("session expired");
};
