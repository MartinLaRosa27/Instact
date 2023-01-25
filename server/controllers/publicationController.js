const Publication = require("../models/Publication");
const shortid = require("shortid");
const { QueryTypes } = require("sequelize");

module.exports.postPublication = async (input, user) => {
  if (user !== null) {
    try {
      await Publication.create({
        _id: shortid.generate(),
        description: input.description,
        image: input.image,
        userId: user._id,
      });
      return "Post published correctly";
    } catch (e) {
      console.log(e);
      throw new Error(e.errors[0].message);
    }
  }
  throw new Error("session expired");
};

module.exports.getMyPublications = async (user) => {
  if (user !== null) {
    try {
      const publications = await Publication.sequelize.query(
        `SELECT p._id, u.username, p.createdAt, p.description, p.image
        FROM publications AS p
       INNER JOIN users AS u ON u._id = p.userId
        WHERE p.userId = "${user._id}"
        ORDER BY p.createdAt DESC;`,
        {
          type: QueryTypes.SELECT,
        }
      );
      return publications;
    } catch (e) {
      console.log(e);
      throw new Error(e.errors[0].message);
    }
  }
  throw new Error("session expired");
};

module.exports.deletePublication = async (id, user) => {
  if (user !== null) {
    try {
      Publication.destroy({
        where: {
          userId: user._id,
          _id: id,
        },
      });
      return "The post was successfully removed";
    } catch (e) {
      console.log(e);
      throw new Error(e.errors[0].message);
    }
  }
  throw new Error("session expired");
};

module.exports.getPublicationByName = async (username, user) => {
  if (user !== null) {
    try {
      const publications = await Publication.sequelize.query(
        `SELECT p._id, u.username, p.createdAt, p.description, p.image
        FROM publications AS p
        INNER JOIN users AS u ON u._id = p.userId
        WHERE u.username = "${username}"
        ORDER BY p.createdAt DESC;`,
        {
          type: QueryTypes.SELECT,
        }
      );
      return publications;
    } catch (e) {
      console.log(e);
      throw new Error(e.errors[0].message);
    }
  }
  throw new Error("session expired");
};