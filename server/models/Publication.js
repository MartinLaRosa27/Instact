const Sequelize = require("sequelize");
const { DBConfiguration } = require("../config/DBConfiguration");

const Publication = DBConfiguration.define("publication", {
  _id: {
    type: Sequelize.STRING(16),
    primaryKey: true,
    allowNull: false,
  },

  description: {
    type: Sequelize.STRING(144),
    allowNull: false,
    validate: {
      len: [1, 144],
      notEmpty: true,
    },
  },

  image: {
    type: Sequelize.STRING(500),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Publication;
