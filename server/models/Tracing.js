const Sequelize = require("sequelize");
const { DBConfiguration } = require("../config/DBConfiguration");

const Tracing = DBConfiguration.define("tracing", {
  _id: {
    type: Sequelize.STRING(16),
    primaryKey: true,
    allowNull: false,
  },

  following: {
    type: Sequelize.STRING(16),
    allowNull: false,
  },
});

module.exports = Tracing;
