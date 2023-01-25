const shortid = require("shortid");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createToken } = require("../helpers/jwt");
const { QueryTypes } = require("sequelize");

module.exports.postUser = async (input) => {
  try {
    const user = await User.create({
      _id: shortid.generate(),
      email: input.email,
      fullName: input.fullName,
      username: input.username,
      password: input.password,
    });
    const token = createToken(user);
    return token;
  } catch (e) {
    throw new Error(e.errors[0].message);
  }
};

module.exports.userAuthentication = async (input) => {
  const { email, password } = input;
  const userExists = await User.findOne({
    where: {
      email,
    },
  });
  if (!userExists) {
    throw new Error("The enter email is not registered");
  }
  if (!bcrypt.compareSync(password, userExists.password)) {
    throw new Error("Incorrect password");
  }
  const token = createToken(userExists);
  return token;
};

module.exports.getUserByName = async (username, user) => {
  if (user !== null) {
    try {
      const users = await User.sequelize.query(
        `SELECT u._id, u.image, u.username, t.following
        FROM users AS u 
        LEFT OUTER JOIN tracings AS t 
        ON t.userId =  "${user._id}" AND t.following = u._id
        WHERE u.username LIKE "%${username}%" AND u._id <> "${user._id}"
        LIMIT  5;`,
        {
          type: QueryTypes.SELECT,
        }
      );
      return users;
    } catch (e) {
      console.log(e);
      throw new Error(
        `Could not get the results for the name search ${username}`
      );
    }
  }
  throw new Error("session expired");
};

module.exports.getUserByNameStrict = async (username, user) => {
  if (user !== null) {
    try {
      const users = await User.sequelize.query(
        `SELECT u._id, u.image, u.username, t.following
        FROM users AS u 
        LEFT OUTER JOIN tracings AS t 
        ON t.userId =  "${user._id}" AND t.following = u._id
        WHERE u.username = "${username}";`,
        {
          type: QueryTypes.SELECT,
        }
      );
      return users[0];
    } catch (e) {
      console.log(e);
      throw new Error(`Could not get the results for the user ${username}`);
    }
  }
  throw new Error("session expired");
};

module.exports.getUserInformation = async (user) => {
  if (user !== null) {
    try {
      const userInformation = await User.sequelize.query(
        `SELECT COUNT(DISTINCT P._id) AS publicationsQ, COUNT(DISTINCT t.following) AS followingQ, COUNT(DISTINCT tt.following) AS followersQ
        FROM users AS u 
        LEFT OUTER JOIN publications AS p ON p.userId = "${user._id}"
        LEFT OUTER JOIN tracings AS t ON t.userId = "${user._id}"
        LEFT OUTER JOIN tracings AS tt ON tt.following ="${user._id}"
        WHERE u._id = "${user._id}";`,
        {
          type: QueryTypes.SELECT,
        }
      );
      return userInformation[0];
    } catch (e) {
      console.log(e);
      throw new Error(`Could not get the information of the user`);
    }
  }
  throw new Error("session expired");
};

module.exports.pathUserImg = async (img, user) => {
  if (user !== null) {
    try {
      await User.sequelize.query(
        `UPDATE users SET image = "${img}" WHERE _id = "${user._id}";`,
        {
          type: QueryTypes.UPDATE,
        }
      );
      return "successfully modified image";
    } catch (e) {
      console.log(e);
      throw new Error(`Could not get the information of the user`);
    }
  }
  throw new Error("session expired");
};

module.exports.getUserPersonalImg = async (user) => {
  if (user !== null) {
    try {
      const userImage = await User.sequelize.query(
        `SELECT u.image
        FROM users AS u 
        WHERE u._id = "${user._id}";`,
        {
          type: QueryTypes.SELECT,
        }
      );
      return userImage[0];
    } catch (e) {
      console.log(e);
      throw new Error(`Could not get the image of the user`);
    }
  }
  throw new Error("session expired");
};
