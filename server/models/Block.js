const Sequelize = require("sequelize");
const { DBConfiguration } = require("../config/DBConfiguration");

const Block = DBConfiguration.define("block", {
  _id: {
    type: Sequelize.STRING(16),
    primaryKey: true,
    allowNull: false,
  },
  blocked: {
    type: Sequelize.STRING(16),
    allowNull: false,
  },
});

module.exports = Block;
