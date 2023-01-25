const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const Publication = require("./Publication");
const Tracing = require("./Tracing");
const { DBConfiguration } = require("../config/DBConfiguration");

const User = DBConfiguration.define("user", {
  _id: {
    type: Sequelize.STRING(16),
    primaryKey: true,
    allowNull: false,
  },

  email: {
    type: Sequelize.STRING(255),
    allowNull: false,
    validate: {
      len: [1, 255],
      notContains: " ",
      notEmpty: true,
    },
    unique: { args: true, msg: "The email is already registered" },
  },

  fullName: {
    type: Sequelize.STRING(150),
    allowNull: false,
    validate: {
      len: [1, 255],
      notEmpty: true,
    },
  },

  username: {
    type: Sequelize.STRING(255),
    allowNull: false,
    validate: {
      len: [1, 255],
      notContains: " ",
      notEmpty: true,
    },
    unique: { args: true, msg: "username is not available" },
  },

  image: {
    type: Sequelize.STRING(500),
    allowNull: true,
    validate: {
      len: [1, 255],
      notEmpty: true,
    },
  },

  password: {
    type: Sequelize.STRING(60),
    allowNull: false,
    validate: {
      len: [8, 25],
      notContains: " ",
      notEmpty: true,
    },
  },
});

User.afterValidate(async (user) => {
  const password = await bcrypt.hash(user.password, 10);
  user.password = password;
});
User.hasMany(Tracing);
User.hasMany(Publication);

module.exports = User;
