const Sequelize = require("sequelize");
const { DBConfiguration } = require("../config/DBConfiguration");

const Like = DBConfiguration.define("like", {
  _id: {
    type: Sequelize.STRING(16),
    primaryKey: true,
    allowNull: false,
  },

  likedPost: {
    type: Sequelize.STRING(16),
    allowNull: false,
  },
});

module.exports = Like;
